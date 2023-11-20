import {pool} from '../db.js'

export const getStudents = async (req, res) => {
    const [rows] = await pool.query('select * from users where id_rol = 1')
    res.json(rows)
}

export const getStudentById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ? and id_rol = 1', [req.params.id_user])
    res.json(rows[0])
}

export const createStudent = async (req, res) => {
    const [result] = await pool.query('INSERT INTO student_courses (id_user, id_course) VALUES (?, ?)', [req.body.id_user, req.body.id_course])
    res.json({
        id_user: result.insertId,
        ...req.body
    })
}

export const deleteStudent = async (req, res) => {
    await pool.query('DELETE FROM users WHERE id_user = ?', [req.params.id_user])
    res.sendStatus(204)
}