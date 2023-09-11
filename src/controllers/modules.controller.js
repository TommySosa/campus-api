import {pool} from '../db.js'

export const getModules = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM modules')
    res.json(rows)
}

export const createModule = async (req, res) => {
    const [result] = await pool.query('INSERT INTO modules (name, id_course) VALUES (?, ?)', [req.body.name, req.body.id_course])
    res.json({
        id_module: result.insertId,
        ...req.body
    })
}

export const updateModule = async (req, res) => {
    await pool.query('UPDATE modules SET name = IFNULL(?, name), id_course = IFNULL(?, id_course) WHERE id_module = ?', [req.body.name, req.body.id_course, req.params.id_module])
    res.json({
        id_course: req.params.id,
        ...req.body
    })
}

export const deleteModule = async (req, res) => {
    await pool.query('DELETE FROM modules WHERE id_module = ?', [req.params.id_module])
    res.sendStatus(204)
}
