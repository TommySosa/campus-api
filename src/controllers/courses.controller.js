import {pool} from '../db.js'

export const getCourses = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM courses')
    res.json(rows)
}

export const getCourseById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM courses WHERE id_course = ?', [req.params.id_course])
    res.json(rows[0])
}

export const createCourse = async (req, res) => {
    const [result] = await pool.query('INSERT INTO courses (name, description, url_image, id_category, id_teacher) VALUES (?, ?, ?, ?)', [req.body.name, req.body.description, req.body.url_image, req.body.id_category, req.body.id_teacher])
    res.json({
        id_course: result.insertId,
        ...req.body
    })
}

export const updateCourse = async (req, res) => {
    await pool.query('UPDATE courses SET name = IFNULL(?, name), description = IFNULL(?, description), url_image = IFNULL(?, url_image), id_category = IFNULL(?, id_category), id_teacher = IFNULL(?, id_teacher) WHERE id_course = ?', [req.body.name, req.body.description, req.body.url_image, req.body.id_category,req.body.id_teacher ,req.params.id_course])
    res.json({
        id_course: req.params.id,
        ...req.body
    })
}

export const deleteCourse = async (req, res) => {
    await pool.query('DELETE FROM courses WHERE id_course = ?', [req.params.id_course])
    res.sendStatus(204)
}

export const getCourseTeachers = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM teacher_courses WHERE id_course = ?', [req.params.id_course])
    res.json(rows)
}