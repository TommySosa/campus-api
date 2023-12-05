import { pool } from '../db.js'

export const getDiscussions = async (req, res) => {
    const [rows] = await pool.query('select * from discussion')
    res.json(rows)
}

export const getCommentsByIdDiscussion = async (req, res) => {
    const [rows] = await pool.query('select c.id_comment,c.id_discussion, c.content, c.author, c.created_at, u.surname, u.name, u.profile_url from comment c inner join user u on c.id_user = u.id_user where c.id_discussion = ?', [req.params.id_discussion])
    res.json(rows)
}

export const createDiscussion = async (req, res) => {
    try {
        const [result] = await pool.query('INSERT INTO discussion (title, content, author, user_id) VALUES (?, ?, ?, ?)', [req.body.title, req.body.content, req.body.author, req.body.user_id])
        res.json({
            id_discussion: result.insertId,
            ...req.body
        })
    } catch (error) {
        console.error('Error en createDiscussion:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const createComment = async (req, res) => {
    try {
        const [result] = await pool.query('INSERT INTO comment (content, author, id_user, id_discussion) VALUES (?,?,?,?)', [req.body.content, req.body.author, req.body.id_user, req.params.id_discussion])
        res.json({
            id_comment: result.insertId,
            ...req.body
        })
    } catch (error) {
        console.error('Error en createComment:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const updateStudent = async (req, res) => {
    try {
        const [result] = await pool.query('update studentcourse set id_course = ? where id_user = ? and id_student_course = ?', [req.body.id_course, req.body.id_user, req.params.id_student_course])
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'No se encontró la inscripción para actualizar' });
        } else {
            res.json({
                id_student_course: req.params.id_student_course,
                ...req.body
            })
        }
    } catch (error) {
        console.error('Error en updateStudent:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const deleteStudent = async (req, res) => {
    await pool.query('DELETE FROM studentcourse WHERE id_student_course = ?', [req.params.id_student_course])
    res.sendStatus(204)
}
