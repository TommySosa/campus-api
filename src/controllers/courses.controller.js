import { pool } from '../db.js'

export const getCourses = async (req, res) => {
    const [rows] = await pool.query('SELECT c.id_course, c.name, c.description, c.url_image, ca.name as category_name, concat(u.name, " ", u.surname) as teacher_name, c.id_category FROM course c inner join category ca on c.id_category = ca.id_category inner join user u on c.id_user = u.id_user where c.active = true')
    res.json(rows)
}

export const getCourseById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM course WHERE id_course = ? and active = true', [req.params.id_course])
    res.json(rows[0])
}

export const createCourse = async (req, res) => {
    const [result] = await pool.query('INSERT INTO course (name, description, url_image, id_category, id_user) VALUES (?, ?, ?, ?, ?)', [req.body.name, req.body.description, req.body.url_image, req.body.id_category, req.body.id_user])
    res.json({
        id_course: result.insertId,
        ...req.body
    })
}

export const getInscriptosByIdUser = async(req,res) => {
    try {
        const [rows] = await pool.query('SELECT c.id_course,c.name, c.url_image FROM Course c JOIN StudentCourse sc ON c.id_course = sc.id_course WHERE sc.id_user = ?', [req.params.id_user])
        res.json(rows)
    } catch (error) {
        console.error('Error en getInscriptosByIdUser:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const getInscriptos = async (req,res) => {
    try {
        const [rows] = await pool.query('select * from studentcourse s inner join course c on c.id_course = s.id_course where s.id_user = ? and c.active = true;', [req.params.id_user])
        res.json(rows)
    } catch (error) {
        console.error('Error en getInscriptos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const getInscriptions = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT s.id_user, u.name, u.surname, u.dni, s.id_student_course, s.id_course, c.name as course_name FROM user u INNER JOIN studentcourse s ON s.id_user = u.id_user INNER JOIN course c ON s.id_course = c.id_course where c.active = true;')
        res.json(rows)
    } catch (error) {
        console.error('Error en getInscriptions:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const getInscription = async (req,res) => {
    try {
        const [rows] = await pool.query('SELECT s.id_user, u.name, u.surname, u.dni, s.id_student_course, s.id_course, c.name as course_name FROM user u INNER JOIN studentcourse s ON s.id_user = u.id_user INNER JOIN course c ON s.id_course = c.id_course where c.active = true and s.id_student_course = ?;', [req.params.id_student_course])
        res.json(rows[0])
    } catch (error) {
        console.error('error')
        res.status(500).json({error: "Error en el servidor "})
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

export const getCourseTeachers = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM teacher_courses WHERE id_course = ?', [req.params.id_course])
    res.json(rows)
}