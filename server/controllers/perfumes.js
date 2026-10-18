import { pool } from '../config/database.js'


// Add your functions to get, create, edit, and delete cars from your custom items table.
const getAllCustomPerfumes = async (req, res) => {
    try {
        const results = await pool.query(`SELECT * FROM perfumes ORDER BY id`)
        res.status(200).json(results.rows)
    } catch(error) {
        res.status(409).json({error: error.message})
    }
}

const getCustomPerfume = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query(
            `SELECT * FROM perfumes where id = $1`,[id]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}


const createCustomPerfume = async (req, res) => {
    try {
        const { perfume_name, top_note, heart_note, base_note, extra_touch = null, price} = req.body
        const results = await pool.query(
        `INSERT INTO perfumes (perfume_name, top_note, heart_note, base_note, extra_touch, price)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING * `,
        [perfume_name, top_note, heart_note, base_note, extra_touch || null, price]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }

}

const updateCustomPerfume = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {perfume_name, top_note, heart_note, base_note, extra_touch = null, price} = req.body
        const results = await pool.query(
            `UPDATE perfumes
            SET perfume_name = $1, top_note = $2, heart_note = $3, base_note = $4, extra_touch = $5, price = $6
            WHERE id = $7`, [perfume_name, top_note, heart_note, base_note, extra_touch || null, price, id]
        )
        res.status(200).json(results.rows)
        
    } catch(error) {
        res.status(409).json({error: error.message})
    }
}
const deleteCustomPerfume = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const results = await pool.query(
            `DELETE FROM perfumes
            WHERE id = $1`, [id]
        )
        res.status(200).json(results.rows)
    } catch(error) {
        res.status(409).json({error: error.message})
    }
}

export default {
    getAllCustomPerfumes,
    getCustomPerfume,
    createCustomPerfume,
    updateCustomPerfume,
    deleteCustomPerfume
}