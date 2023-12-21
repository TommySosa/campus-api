import { pool } from '../db.js'

export const getModules = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT module.*, course.name as course_name 
            FROM module 
            JOIN course ON module.id_course = course.id_course where module.active = true
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getModuleById = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from module where id_module = ? and active = true', req.params.id_module)
        console.log(rows[0]);
        res.json(rows[0])
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getModulesByIdCourse = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT module.*, course.name as course_name 
            FROM module 
            JOIN course ON module.id_course = course.id_course
            WHERE module.id_course = ?
        `, [req.params.id_course]);

        if (rows.length === 0) {
            res.status(404).json({ error: 'No se encontró el módulo' });
        } else {
            res.json(rows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createModule = async (req, res) => {
    const [result] = await pool.query('INSERT INTO module (name, id_course) VALUES (?, ?)', [req.body.name, req.body.id_course])
    res.json({
        id_module: result.insertId,
        ...req.body
    })
}

export const updateModule = async (req, res) => {
    await pool.query('UPDATE module SET name = IFNULL(?, name), id_course = IFNULL(?, id_course) WHERE id_module = ?', [req.body.name, req.body.id_course, req.params.id_module])
    res.json({
        id_course: req.params.id,
        ...req.body
    })
}

export const deleteModule = async (req, res) => {
    try {
        const [result] = await pool.query('UPDATE module SET active = false WHERE id_module = ?', [req.params.id_module])
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'No se encontró el modulo a borrar' });
        } else {
            res.json({
                id_module: req.params.id_module,
                ...req.body,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const checkIsCompleted = async (req, res) => {
    const { id_user, id_module } = req.body;
    try {
        const [rows] = await pool.query(`
        SELECT
        (
            SELECT COUNT(DISTINCT ce.id_exercise) + COUNT(DISTINCT ic.id_exercise)
            FROM exercise e
            LEFT JOIN correctexercise ce ON e.id_exercise = ce.id_exercise AND ce.id_user = ${id_user}
            LEFT JOIN incorrectexercise ic ON e.id_exercise = ic.id_exercise AND ic.id_user = ${id_user}
            WHERE e.id_module = ${id_module} and e.active = true
        ) AS total_realizados,
        (
            SELECT COUNT(id_exercise)
            FROM exercise
            WHERE id_module = ${id_module} and active = true
        ) AS total_modulo;
        `);

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
