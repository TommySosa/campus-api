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

export const getInscriptosByIdUser = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT c.id_course,c.name, c.url_image FROM Course c JOIN StudentCourse sc ON c.id_course = sc.id_course WHERE sc.id_user = ?', [req.params.id_user])
        res.json(rows)
    } catch (error) {
        console.error('Error en getInscriptosByIdUser:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const getInscriptos = async (req, res) => {
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

export const getInscription = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT s.id_user, u.name, u.surname, u.dni, s.id_student_course, s.id_course, c.name as course_name FROM user u INNER JOIN studentcourse s ON s.id_user = u.id_user INNER JOIN course c ON s.id_course = c.id_course where c.active = true and s.id_student_course = ?;', [req.params.id_student_course])
        res.json(rows[0])
    } catch (error) {
        console.error('error')
        res.status(500).json({ error: "Error en el servidor " })
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

export const addGradeToInscription = async (req, res) => {
    try {
        const [result] = await pool.query('INSERT INTO grade (value, exam_name, id_student_course) VALUES (?, ?, ?)', [req.body.value, req.body.exam_name, req.body.id_student_course])
        res.json({
            id_grade: result.insertId,
            ...req.body
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const getGradesByIdUser = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT sc.id_student_course, c.name AS course_name, g.value AS grade_value, g.exam_name FROM StudentCourse sc INNER JOIN Grade g ON sc.id_student_course = g.id_student_course INNER JOIN Course c ON sc.id_course = c.id_course WHERE sc.id_user = ?;', [req.params.id_user])
        res.json(rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const getGradesByIdInscription = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT sc.id_student_course, c.name AS course_name, g.value AS grade_value, g.exam_name FROM StudentCourse sc INNER JOIN Grade g ON sc.id_student_course = g.id_student_course INNER JOIN Course c ON sc.id_course = c.id_course WHERE sc.id_student_course = ?;', [req.params.id_student_course])
        res.json(rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const getAvgExercises = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT sc.id_course, c.name AS course_name, COUNT(DISTINCT ce.id_correct) AS correct_count, COUNT(DISTINCT ie.id_incorrect) AS incorrect_count, COUNT(DISTINCT e.id_exercise) AS total_exercises, IFNULL(SUM(CASE WHEN ce.id_correct IS NOT NULL THEN 1 WHEN ie.id_incorrect IS NOT NULL THEN 0 ELSE 0 END) / NULLIF(COUNT(DISTINCT e.id_exercise), 0), 0) AS correct_exercises_average FROM StudentCourse sc JOIN Course c ON sc.id_course = c.id_course LEFT JOIN Module m ON c.id_course = m.id_course LEFT JOIN Exercise e ON m.id_module = e.id_module AND e.active = true AND m.active = true LEFT JOIN CorrectExercise ce ON sc.id_user = ce.id_user AND e.id_exercise = ce.id_exercise LEFT JOIN IncorrectExercise ie ON sc.id_user = ie.id_user AND e.id_exercise = ie.id_exercise WHERE sc.id_user = ? GROUP BY sc.id_course, c.name;', req.params.id_user)
        res.json(rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const getAvgExercisesByIdStudentCourse = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT sc.id_course, c.name AS course_name, COUNT(DISTINCT ce.id_correct) AS correct_count, COUNT(DISTINCT ie.id_incorrect) AS incorrect_count, COUNT(DISTINCT e.id_exercise) AS total_exercises, IFNULL(SUM(CASE WHEN ce.id_correct IS NOT NULL THEN 1 WHEN ie.id_incorrect IS NOT NULL THEN 0 ELSE 0 END) / NULLIF(COUNT(DISTINCT e.id_exercise), 0), 0) AS correct_exercises_average FROM StudentCourse sc JOIN Course c ON sc.id_course = c.id_course LEFT JOIN Module m ON c.id_course = m.id_course LEFT JOIN Exercise e ON m.id_module = e.id_module AND e.active = true AND m.active = true LEFT JOIN CorrectExercise ce ON sc.id_user = ce.id_user AND e.id_exercise = ce.id_exercise LEFT JOIN IncorrectExercise ie ON sc.id_user = ie.id_user AND e.id_exercise = ie.id_exercise WHERE sc.id_student_course = ? GROUP BY sc.id_course, c.name;', [req.params.id_student_course])
        res.json(rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}