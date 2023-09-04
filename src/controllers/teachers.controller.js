import {pool} from '../db.js'

export const getTeachers = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM teachers')
    res.json(rows)
}

export const getTeacherById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM teachers WHERE id_user = ?', [req.params.id_user])
    res.json(rows[0])
}

export const createTeacher = async (req, res) => {
    const [result] = await pool.query('INSERT INTO teachers (id_user) VALUES (?)', [req.body.id_user])
    res.json({
        id_user: result.insertId,
        ...req.body
    })
}

export const deleteTeacher = async (req, res) => {
    await pool.query('DELETE FROM teachers WHERE id_user = ?', [req.params.id_user])
    res.sendStatus(204)
}