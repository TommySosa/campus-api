import { pool } from '../db.js';

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user');
    res.json(rows);
  } catch (error) {
    console.error('Error en getuser:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE id_user = ?', [req.params.id_user]);
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

export const getUserByDni = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE dni = ?', [req.params.dni]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'No se encontró al usuario' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error en getUserByDni:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const cambiarRolUsuario = async (req, res) => {
  try {
    const { id_user } = req.params;
    const { id_rol } = req.body; // Nuevo rol que se proporciona desde el frontend
    // Verifica si el nuevo rol es válido (1 para Estudiante, 2 para Profesor)
    if (id_rol !== 1 && id_rol !== 2) {
      return res.status(400).json({ error: 'Rol inválido' });
    }

    // Realiza la actualización del rol del usuario en la base de datos
    const query = 'UPDATE user SET id_rol = ? WHERE id_user = ?';
    await pool.query(query, [id_rol, id_user]);

    res.status(200).json({ mensaje: 'Rol del usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al cambiar el rol del usuario:', error);
    res.status(500).json({ error: 'Error al cambiar el rol del usuario' });
  }
};

export const getRoles = async(req, res) => {
  try {
    const [rows] = await pool.query('SELECT * from role')
    res.json(rows)
  } catch (error) {
    console.error('Error en getRoles:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

