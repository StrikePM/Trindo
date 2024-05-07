import express from 'express';
import getConnection from '../../../db.js';
import multer from 'multer';
import { verifyUser, isAdmin } from '../../middleware/authUser.js';

const upload = multer();
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(upload.array());

router.get('/categories', verifyUser, async (req, res) => {
    const conn = await getConnection();
    try {
        const data = await conn.execute(`
        SELECT * FROM categories ORDER BY category_id`);
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: "There is an error : " + error
        });
    } finally {
        if (conn) {
            conn.release();
        }
    }
})

router.post('/categories', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()

    try {
        const { categoryName, categoryDesc } = req.body;
        if(!categoryName || !categoryDesc) return res.status(204).json({msg: 'field kosong'});
        const data = await conn.execute(`INSERT INTO categories VALUES(DEFAULT,?,?)`, [categoryName, categoryDesc]);

        let statusCode = 200;
        let message = 'success';
        if (data[0] == 0) {
            statusCode = 400;
            message = 'failed';
        }
        res.status(statusCode).json({
            statusCode,
            message,
        });
    } catch (e) {
        res.status(400).json({
            statusCode: 400,
            message: 'Error: ' + e,
        });
    } finally {
        if (conn) {
            conn.release();
        }
    }
});

router.put('/categories/:id', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()
    try {
        const { categoryName, categoryDesc } = req.body;
        const id = parseInt(req.params.id, 10);
        if(!categoryName || !categoryDesc) return res.status(204).json({msg: 'field kosong'});
        const data = await conn.execute(`UPDATE categories SET category_name =?, category_desc=? WHERE category_id = ?`,
            [categoryName, categoryDesc, id]);
        let statusCode = 200 
        let message = 'success'
        if (data[0] == 0) {
            statusCode = 400;
            message = 'failed';
        }
        res.status(statusCode).json({
            statusCode,
            message,
        });
    } catch (e) {
        res.status(400).json({
            statusCode: 400,
            message: 'Have an error ' + e,
        });
    } finally {
        if (conn) {
            conn.release();
        }
    }
})

router.delete('/categories/:id', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()
    try {
        const id = parseInt(req.params.id, 10);
        const data = await conn.execute(`DELETE FROM categories WHERE category_id = ?`, [id])
        let statusCode = 200 
        let message = 'success'
        if (data[0].affectedRows > 0) {
            const tableName = 'categories';
            const columnName = 'category_id';
            const maxIdQuery = `SELECT COALESCE(MAX(${columnName}), 0) + 1 AS max_id FROM ${tableName}`;
            const [maxIdData] = await conn.execute(maxIdQuery);
            const maxId = maxIdData[0].max_id;

            const resetQuery = `ALTER TABLE ${tableName} AUTO_INCREMENT = ${maxId}`;
            await conn.execute(resetQuery);
        } else {
            statusCode = 400;
            message = 'failed';
        }
        res.status(statusCode).json({
            statusCode,
            message
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            statusCode: 409,
            message: 'Have an error ' + e
        });
    } finally {
        if (conn) {
            conn.release();
        }
    }
})

export default router;

