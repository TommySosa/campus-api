import { pool } from '../db.js';

export const getExercises = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT e.id_exercise, e.name, e.instruction, e.active, e.id_type, m.name as module_name, c.name as course_name FROM exercise e inner join module m on e.id_module = m.id_module inner join course c on m.id_course = c.id_course where e.active = true');
    res.json(rows);
  } catch (error) {
    console.error('Error en getExercises:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getCorrectExercisesByidUser = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM correctexercise where id_user = ?', [req.params.id_user]);
    res.json(rows);
  } catch (error) {
    console.error('Error en getCorrectExercises:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getIncorrectExercisesByidUser = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM incorrectexercise where id_user = ?', [req.params.id_user]);
    res.json(rows);
  } catch (error) {
    console.error('Error en getIncorrectExercises:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getCorrectExercisesByidCourse = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS correct_exercises_count FROM CorrectExercise ce JOIN Exercise e ON ce.id_exercise = e.id_exercise JOIN Module m ON e.id_module = m.id_module WHERE ce.id_user = ? AND m.id_course = ?; ', 
    [req.body.id_user, req.body.id_course]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error en getCorrectExercisesByidCourse:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getIncorrectExercisesByidCourse = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS incorrect_exercises_count FROM IncorrectExercise ie JOIN Exercise e ON ie.id_exercise = e.id_exercise JOIN Module m ON e.id_module = m.id_module WHERE ie.id_user = ? AND m.id_course = ?; ', [req.body.id_user, req.body.id_course]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error en getIncorrectExercisesByidCourse:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getProgressForInscriptions = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT sc.id_course, c.name AS course_name, COUNT(DISTINCT ce.id_correct) AS correct_count, COUNT(DISTINCT ie.id_incorrect) AS incorrect_count FROM StudentCourse sc JOIN Course c ON sc.id_course = c.id_course LEFT JOIN Module m ON c.id_course = m.id_course LEFT JOIN Exercise e ON m.id_module = e.id_module LEFT JOIN CorrectExercise ce ON sc.id_user = ce.id_user AND e.id_exercise = ce.id_exercise LEFT JOIN IncorrectExercise ie ON sc.id_user = ie.id_user AND e.id_exercise = ie.id_exercise WHERE sc.id_user = ? GROUP BY sc.id_course, c.name;'
    ,[req.params.id_user])
    res.json(rows)
  } catch (error) {
    console.error('Error en getProgressForInscriptions:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

export const getExerciseById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exercise WHERE id_exercise = ? and active = true', [req.params.id_exercise]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'No se encontró el ejercicio' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error en getExerciseById:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getExerciseByIdModule = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exercise WHERE id_module = ? and active = true', [req.params.id_module]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'No se encontró el ejercicio en el módulo' });
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error('Error en getExerciseByIdModule:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const createExercise = async (req, res) => {
  try {
    const [result] = await pool.query('INSERT INTO exercise (name, instruction, id_module, id_type) VALUES (?, ?, ?, ?)', [req.body.name, req.body.instruction, req.body.id_module, req.body.id_type]);
    res.json({
      id_exercise: result.insertId,
      ...req.body,
    });
  } catch (error) {
    console.error('Error en createExercise:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const updateExercise = async (req, res) => {
  try {
    const [result] = await pool.query('UPDATE exercise SET name = IFNULL(?, name), instruction = IFNULL(?, instruction), id_module = IFNULL(?, id_module), id_type = IFNULL(?, id_type) WHERE id_exercise = ?', [req.body.name, req.body.instruction, req.body.id_module, req.body.id_type, req.params.id_exercise]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'No se encontró el ejercicio para actualizar' });
    } else {
      res.json({
        id_exercise: req.params.id_exercise,
        ...req.body,
      });
    }
  } catch (error) {
    console.error('Error en updateExercise:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const deleteExercise = async (req, res) => {
  try {
    const [results, fields] = await pool.execute('CALL DesactivarEjercicio(?)', [req.params.id_exercise]);
    res.json({ message: results[0][0].mensaje });

  } catch (error) {
    console.error(error);
  }
};

export const createCorrect = async (req, res) => {
  try {
    const [result] = await pool.query('insert into correctexercise(id_exercise, id_user) values(?, ?)', [req.body.id_exercise, req.body.id_user])
    res.json({
      id_correct: result.insertId,
      ...req.body,
    });
  } catch (error) {
    console.error('Error en correct:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

export const createIncorrect = async (req, res) => {
  try {
    const [result] = await pool.query('insert into incorrectexercise(id_exercise, id_user) values(?, ?)', [req.body.id_exercise, req.body.id_user])
    res.json({
      id_correct: result.insertId,
      ...req.body,
    });
  } catch (error) {
    console.error('Error en incorrect:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

export const checkExercise = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT SUM(total) as total FROM (SELECT COUNT(*) as total FROM correctexercise WHERE id_user = ? AND id_exercise = ? UNION ALL SELECT COUNT(*) as total FROM incorrectexercise WHERE id_user = ? AND id_exercise = ?) as combined;', [req.body.id_user,req.body.id_exercise, req.body.id_user,req.body.id_exercise]);
    res.json(result);
  } catch (error) {
    console.error('Error en checkExercise:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

export const getExercisesTypes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exercisetype');
    res.json(rows);
  } catch (error) {
    console.error('Error en getExercisesTypes:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}
