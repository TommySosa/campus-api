import { pool } from '../db.js';

export const getMultiples = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM multiple_choise');
    res.json(rows);
  } catch (error) {
    console.error('Error en getMultiples:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getMultipleById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM multiple_choise WHERE id_exercise = ?', [req.params.id_exercise]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'No se encontró el ejercicio' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error en getMultipleById:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const createMultiple = async (req, res) => {
    try {
      // Validación de datos
      const { id_exercise, options } = req.body;
  
      if (!id_exercise || !Array.isArray(options)) {
        return res.status(400).json({ error: 'Datos inválidos' });
      }
  
      // Conversión de options a cadena JSON (si no lo está)
      const optionsJSON = JSON.stringify(options);

      const [result] = await pool.query(
        'INSERT INTO multiple_choise (id_exercise, options) VALUES (?, ?)',
        [id_exercise, optionsJSON]
      );
  
      res.json({
        id_exercise: result.insertId,
        ...req.body,
      });
    } catch (error) {
      console.error('Error en createMultiple:', error);
  
      if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
        return res.status(400).json({ error: 'Valor incorrecto para un campo' });
      }
  
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };
  

export const updateMultiple = async (req, res) => {
  try {
    const [result] = await pool.query('UPDATE multiple_choise SET id_exercise = IFNULL(?, id_exercise), options = IFNULL(?, options) WHERE id_exercise = ?', [req.body.id_exercise, req.body.options, req.params.id_exercise]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'No se encontró el ejercicio para actualizar' });
    } else {
      res.json({
        id_exercise: req.params.id_exercise,
        ...req.body,
      });
    }
  } catch (error) {
    console.error('Error en updateMultiple:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const deleteMultiple = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM multiple_choise WHERE id_exercise = ?', [req.params.id_exercise]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'No se encontró el ejercicio para eliminar' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error('Error en deleteMultiple:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
