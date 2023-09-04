import {pool} from '../db.js'

export const getStudents = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM students')
    res.json(rows)
}

export const getStudentById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM students WHERE id_user = ?', [req.params.id_user])
    res.json(rows[0])
}

export const createStudent = async (req, res) => {
    const [result] = await pool.query('INSERT INTO students (id_user) VALUES (?)', [req.body.id_user])
    res.json({
        id_user: result.insertId,
        ...req.body
    })
}

export const deleteStudent = async (req, res) => {
    await pool.query('DELETE FROM students WHERE id_user = ?', [req.params.id_user])
    res.sendStatus(204)
}