import { pool } from '../db.js';

export const getCategories = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM category where active = true');
        res.json(rows);
    } catch (error) {
        console.error('Error en getCategories:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


export const getCategoryById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM category WHERE id_category = ? and active = true', [req.params.id_category]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'No se encontró la categoria' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('Error en getCategoryById:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const createCategory = async (req, res) => {
    try {
        const [result] = await pool.query('INSERT INTO category (name) VALUES (?)', [req.body.name]);
        res.json({
            id_category: result.insertId,
            ...req.body,
        });
    } catch (error) {
        console.error('Error en createCategory:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const [result] = await pool.query('UPDATE category SET name = IFNULL(?, name) WHERE id_category = ?', [req.body.name, req.params.id_category]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'No se encontró la categoria para actualizar' });
        } else {
            res.json({
                id_category: req.params.id_category,
                ...req.body,
            });
        }
    } catch (error) {
        console.error('Error en updateCategory:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const [result] = await pool.query('UPDATE category SET active = false where id_category = ?', [req.params.id_category])
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'No se pudo eliminar la categoria' });
        }
        else {
            res.json({
                "message" : "Eliminado exitosamente"
            });
        }
    } catch (error) {
        console.error(error);
    }
};

