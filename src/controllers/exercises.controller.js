import { pool } from '../db.js';

export const getExercises = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exercises');
    res.json(rows);
  } catch (error) {
    console.error('Error en getExercises:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getCorrectExercisesByidUser = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM correct_exercises where id_user = ?', [req.params.id_user]);
    res.json(rows);
  } catch (error) {
    console.error('Error en getCorrectExercises:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getIncorrectExercisesByidUser = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM incorrect_exercises');
    res.json(rows);
  } catch (error) {
    console.error('Error en getIncorrectExercises:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getExerciseById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exercises WHERE id_exercise = ?', [req.params.id_exercise]);
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
    const [rows] = await pool.query('SELECT * FROM exercises WHERE id_module = ?', [req.params.id_module]);
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
    const [result] = await pool.query('INSERT INTO exercises (name, instruction, id_module, id_type) VALUES (?, ?, ?, ?)', [req.body.name, req.body.instruction, req.body.id_module, req.body.id_type]);
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
    const [result] = await pool.query('UPDATE exercises SET name = IFNULL(?, name), instruction = IFNULL(?, instruction), id_module = IFNULL(?, id_module), id_type = IFNULL(?, id_type) WHERE id_exercise = ?', [req.body.name, req.body.description, req.body.id_module, req.body.id_type, req.params.id_exercise]);
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
    const result = await pool.query('DELETE FROM exercises WHERE id_exercise = ?', [req.params.id_exercise]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'No se encontró el ejercicio para eliminar' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error('Error en deleteExercise:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const createCorrect = async (req, res) => {
  try {
    const [result] = await pool.query('insert into correct_exercises(id_exercise, id_user) values(?, ?)', [req.body.id_exercise, req.body.id_user])
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
    const [result] = await pool.query('insert into incorrect_exercises(id_exercise, id_user) values(?, ?)', [req.body.id_exercise, req.body.id_user])
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
    const [result] = await pool.query('SELECT SUM(total) as total FROM (SELECT COUNT(*) as total FROM correct_exercises WHERE id_user = ? AND id_exercise = ? UNION ALL SELECT COUNT(*) as total FROM incorrect_exercises WHERE id_user = ? AND id_exercise = ?) as combined;', [req.body.id_user,req.body.id_exercise, req.body.id_user,req.body.id_exercise]);
    res.json(result);
  } catch (error) {
    console.error('Error en checkExercise:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

export const getExercisesTypes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exercise_types');
    res.json(rows);
  } catch (error) {
    console.error('Error en getExercisesTypes:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}