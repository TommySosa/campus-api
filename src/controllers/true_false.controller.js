import { pool } from '../db.js';

export const getTrueFalse = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM true_or_false');
    res.json(rows);
  } catch (error) {
    console.error('Error en getTrueFalse:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getTrueFalseById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM true_or_false WHERE id_exercise = ?', [req.params.id_exercise]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'No se encontró el ejercicio' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error en getTrueFalseById:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const createTrueFalse = async (req, res) => {
    try {
      const { id_exercise, true_option, false_option } = req.body;
  
      if (!id_exercise || !true_option || !false_option) {
        return res.status(400).json({ error: 'Datos inválidos' });
      }

      const [result] = await pool.query(
        'INSERT INTO true_or_false (id_exercise, true_option, false_option) VALUES (?, ?, ?)',
        [id_exercise, true_option, false_option]
      );
  
      res.json({
        id_exercise: result.insertId,
        ...req.body,
      });
    } catch (error) {
      console.error('Error en createTrueFalse:', error);
  
      if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
        return res.status(400).json({ error: 'Valor incorrecto para un campo' });
      }
  
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };
  

export const updateTrueFalse = async (req, res) => {
  try {
    const [result] = await pool.query('UPDATE true_or_false SET id_exercise = IFNULL(?, id_exercise), true_option = IFNULL(?, true_option), false_option = IFNULL(?, false_option) WHERE id_exercise = ?', [req.body.id_exercise, req.body.true_option,req.body.false_option, req.params.id_exercise]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'No se encontró el ejercicio para actualizar' });
    } else {
      res.json({
        id_exercise: req.params.id_exercise,
        ...req.body,
      });
    }
  } catch (error) {
    console.error('Error en updateTrueFalse:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const deleteTrueFalse = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM true_or_false WHERE id_exercise = ?', [req.params.id_exercise]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'No se encontró el ejercicio para eliminar' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error('Error en deleteTrueFalse:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
