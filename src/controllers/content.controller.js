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

export const getContentById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM coursecontent where active = true and id_content = ?', req.params.id_content)
        res.json(rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

// export const getCourseById = async (req, res) => {
//     const [rows] = await pool.query('SELECT * FROM course WHERE id_course = ? and active = true', [req.params.id_course])
//     res.json(rows[0])
// }
export const getContents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM coursecontent where active = true')
        res.json(rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const createContent = async (req, res) => {
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

export const updateContent = async (req, res) => {
    await pool.query('UPDATE coursecontent SET title = IFNULL(?, title), description = IFNULL(?, description), pdf_url = IFNULL(?, pdf_url), course_id = IFNULL(?, course_id) WHERE id_content = ?', [req.body.title, req.body.description, req.body.pdf_url, req.body.course_id, req.params.id_content])
    res.json({
        id_content: req.params.id,
        ...req.body
    })
}

export const deleteContent = async (req, res) => {
    try {
        await pool.query('DELETE FROM coursecontent WHERE id_content = ?', [req.params.id_content])
        res.sendStatus(204)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}
