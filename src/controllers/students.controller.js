import { pool } from '../db.js'

export const getStudents = async (req, res) => {
    const [rows] = await pool.query('select * from user where id_rol = 1')
    res.json(rows)
}

export const getStudentById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM user WHERE id_user = ? and id_rol = 1', [req.params.id_user])
    res.json(rows[0])
}

export const createStudent = async (req, res) => {
    try {
        const [result] = await pool.query('INSERT INTO studentcourse (id_user, id_course) VALUES (?, ?)', [req.body.id_user, req.body.id_course])
        res.json({
            id_student_course: result.insertId,
            ...req.body
        })
    } catch (error) {
        console.error('Error en createStudent:', error);
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
