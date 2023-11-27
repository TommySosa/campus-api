import { pool } from '../db.js';

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error en getUsers:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ?', [req.params.id_user]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'No se encontró al usuario' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error en getUserById:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

