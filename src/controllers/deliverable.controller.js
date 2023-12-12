import { pool } from '../db.js'

export const getDeliverablesByIdCourse = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM deliverable where id_course = ?', req.params.id_course)
        res.json(rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const getDeliverableById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM deliverable where id_deliverable = ?', req.params.id_deliverable)
        res.json(rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const getDeliverables = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM deliverable')
        res.json(rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const createDeliverable = async (req, res) => {
    try {
        const [result] = await pool.query('INSERT INTO deliverable (title, instruction, pdf_url, id_course, deadline) VALUES (?, ?, ?, ?, ?)', [req.body.title, req.body.instruction, req.body.pdf_url, req.body.id_course, req.body.deadline])

        const [students] = await pool.query('SELECT id_user from studentcourse where id_course = ?', [req.body.id_course])
        const idDeliverable = result.insertId
        const asignaciones = students.map(student => [idDeliverable, student.id_user]);
        await pool.query('INSERT INTO assignedtask (id_deliverable, id_user) VALUES ?', [asignaciones]);

        res.status(200).send('Entregable creado y asignado correctamente.');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const getAssignedTaskByIdUser = async (req, res) => {
    try {
        const [rows] = await pool.query('select a.id_assigned, a.id_deliverable, a.id_user, a.approved, a.done, a.document_url, d.title, d.instruction, d.pdf_url, d.id_course, d.created_at, d.deadline from assignedtask a inner join deliverable d on a.id_deliverable = d.id_deliverable where id_user = ? and a.done = 0', req.params.id_user)
        res.json(rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const updateDeliverable = async (req, res) => {
    await pool.query('UPDATE deliverable SET title = IFNULL(?, title), instruction = IFNULL(?, instruction), pdf_url = IFNULL(?, pdf_url), id_course = IFNULL(?, id_course) WHERE id_deliverable = ?', [req.body.title, req.body.instruction, req.body.pdf_url, req.body.id_course, req.params.id_deliverable])
    res.json({
        id_deliverable: req.params.id_deliverable,
        ...req.body
    })
}

export const markCompleted = async (req, res) => {
    try {
        const [result] = await pool.query('update assignedtask set done = IFNULL(?, done), document_url = IFNULL(?, document_url), completed_at = IFNULL(?, completed_at) where id_assigned = ?', [req.body.done,req.body.document_url,req.body.completed_at,req.params.id_assigned])
        if(result.affectedRows === 0){
            res.status(404).json({ error: 'No se encontró ' });
        } else {
          res.json({
            id_assigned: req.params.id_assigned,
            ...req.body,
          });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const markCorrected = async (req, res) => {
    try {
        const [result] = await pool.query('update assignedtask set corrected = IFNULL(?, corrected), approved = IFNULL(?, approved) where id_assigned = ?', [req.body.corrected,req.body.approved, req.params.id_assigned])
        if(result.affectedRows === 0){
            res.status(404).json({ error: 'No se encontró ' });
        } else {
          res.json({
            id_assigned: req.params.id_assigned,
            ...req.body,
          });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const getRealizedTasksByIdCourse = async (req,res) => {
    try {
        const [rows] = await pool.query('select a.id_assigned, a.id_deliverable, a.id_user, a.approved, a.done, a.document_url, a.corrected, a.completed_at, d.title, d.instruction, d.pdf_url, d.id_course, d.created_at, d.deadline, u.name, u.surname, u.profile_url from assignedtask a inner join deliverable d on a.id_deliverable = d.id_deliverable inner join user u on a.id_user = u.id_user where id_course = ? and corrected = false and done = true;', req.params.id_course)
        res.json(rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const deleteDeliverable = async (req, res) => {
    try {
        await pool.query('DELETE FROM deliverable WHERE id_deliverable = ?', [req.params.id_deliverable])
        res.sendStatus(204)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}
