import {pool} from '../db.js'

export const getModules = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT modules.*, courses.name as course_name 
            FROM modules 
            JOIN courses ON modules.id_course = courses.id_course
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getModulesByIdCourse = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT modules.*, courses.name as course_name 
            FROM modules 
            JOIN courses ON modules.id_course = courses.id_course
            WHERE modules.id_course = ?
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
    const [result] = await pool.query('INSERT INTO modules (name, id_course) VALUES (?, ?)', [req.body.name, req.body.id_course])
    res.json({
        id_module: result.insertId,
        ...req.body
    })
}

export const updateModule = async (req, res) => {
    await pool.query('UPDATE modules SET name = IFNULL(?, name), id_course = IFNULL(?, id_course) WHERE id_module = ?', [req.body.name, req.body.id_course, req.params.id_module])
    res.json({
        id_course: req.params.id,
        ...req.body
    })
}

export const deleteModule = async (req, res) => {
    await pool.query('DELETE FROM modules WHERE id_module = ?', [req.params.id_module])
    res.sendStatus(204)
}
