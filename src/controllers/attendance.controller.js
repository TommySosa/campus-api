import {pool} from '../db.js'


export const getAttendances = async(req, res) => {
    const [rows] = await pool.query('select id, attendance.id_user, date, name, surname, email, profile_url, dni,id_rol from attendance inner join users on attendance.id_user = users.id_user;')
    res.json(rows)
}

export const createAttendance = async (req, res) => {
    try {
        const { dni } = req.body;
    
        const [userRows, userFields] = await pool.execute('SELECT id_user FROM users WHERE dni = ?', [dni]);
    
        if (userRows.length === 0) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    
        const userId = userRows[0].id_user;
    
        const [result, fields] = await pool.execute('INSERT INTO attendance (id_user) VALUES (?)', [userId]);
    
        return res.status(200).json({ message: 'Asistencia registrada exitosamente', attendanceId: result.insertId });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
}
