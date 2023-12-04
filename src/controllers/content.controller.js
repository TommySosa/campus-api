import { pool } from '../db.js'

export const getContentsByIdCourse = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM coursecontent where active = true and course_id = ?', req.params.id_course)
        res.json(rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

// export const getCourseById = async (req, res) => {
//     const [rows] = await pool.query('SELECT * FROM course WHERE id_course = ? and active = true', [req.params.id_course])
//     res.json(rows[0])
// }

export const createContent= async (req, res) => {
    try {
        const [result] = await pool.query('INSERT INTO coursecontent (title, description, pdf_url, course_id) VALUES (?, ?, ?, ?)', [req.body.title, req.body.description, req.body.pdf_url, req.body.course_id])
        res.json({
            id_content: result.insertId,
            ...req.body
        })      
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const updateCourse = async (req, res) => {
    await pool.query('UPDATE course SET name = IFNULL(?, name), description = IFNULL(?, description), url_image = IFNULL(?, url_image), id_category = IFNULL(?, id_category), id_user = IFNULL(?, id_user) WHERE id_course = ?', [req.body.name, req.body.description, req.body.url_image, req.body.id_category, req.body.id_user, req.params.id_course])
    res.json({
        id_course: req.params.id,
        ...req.body
    })
}

export const deleteCourse = async (req, res) => {
    try {
        const [result] = await pool.query('UPDATE course SET active = false WHERE id_course = ?', [req.params.id_course])
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'No se encontró el curso para actualizar' });
        } else {
            res.json({
                id_course: req.params.id_course,
                ...req.body,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}
