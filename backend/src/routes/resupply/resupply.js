import express from 'express';
import getConnection from '../../../db.js';
import { isAdmin, verifyUser } from '../../middleware/authUser.js';

const router = express.Router();

router.get('/resupply', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection();
    try {
        const data = await conn.execute(`
        SELECT
        a.resupply_id,
        b.product_id,
        b.product_name,
        a.resupply_stock,
        a.resupply_price,
        a.resupply_total,
        a.resupply_date,
        a.resupply_status
        FROM resupply a INNER JOIN products b 
        ON a.product_id = b.product_id 
        ORDER BY a.resupply_id`);
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

router.post('/resupply', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()

    try {
        const { resupplyName, resupplyStock, resupplyPrice, resupplyTotal, resupplyDate, resupplyStatus } = req.body;
        if(!resupplyName || !resupplyStock || !resupplyDate) return res.status(204).json({msg: 'field kosong'});
        
        const data = await conn.execute(`INSERT INTO resupply VALUES(DEFAULT,?,?,?,?,?,?)`, [resupplyName, resupplyStock, resupplyPrice, resupplyTotal, resupplyDate, resupplyStatus]);
        let statusCode = 200;
        let message = 'success';
        if (data[0] == 0) {
            statusCode = 400;
            message = 'gagal memasukan data resupply';
        }
        res.status(statusCode).json({
            statusCode,
            message,
        });

        const getStock = await conn.execute(`SELECT product_stock FROM products WHERE product_id = ?`, [resupplyName]);
        const currentStock = getStock[0][0].product_stock;
        const newStock = parseInt(currentStock, 10) + parseInt(resupplyStock, 10);
        await conn.execute(`UPDATE products SET product_stock = ? WHERE product_id = ?`, [newStock, resupplyName]);
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

router.put('/resupply/:id', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()
    try {
        const { resupplyName, resupplyStock, resupplyPrice, resupplyTotal, resupplyDate, resupplyStatus } = req.body;
        const id = parseInt(req.params.id, 10);

        if(!resupplyName || !resupplyStock || !resupplyPrice || !resupplyTotal || !resupplyDate || !resupplyStatus) return res.status(204).json({msg: 'field kosong'});

        const getResupplyStock = await conn.execute(`SELECT resupply_stock FROM resupply WHERE resupply_id = ?`, [id]);
        const currentResupplyStock = getResupplyStock[0][0].resupply_stock;

        const getProductStock = await conn.execute(`SELECT product_stock FROM products WHERE product_id = ?`, [resupplyName]);
        const currentProductStock = getProductStock[0][0].product_stock;
        const newCurrentStock = parseInt(currentProductStock, 10) - parseInt(currentResupplyStock, 10);
        

        const data = await conn.execute(`UPDATE resupply SET product_id =?, resupply_stock=?, resupply_date=?, resupply_status=? WHERE resupply_id = ?`,
            [resupplyName, resupplyStock, resupplyPrice, resupplyTotal, resupplyDate, resupplyStatus]);
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

        const newStock = newCurrentStock + parseInt(resupplyStock, 10);
        await conn.execute(`UPDATE products SET product_stock = ? WHERE product_id = ?`, [newStock, resupplyName]);
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

router.delete('/resupply/:id', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()
    try {
        const id = parseInt(req.params.id, 10);

        const getResupply = await conn.execute(`SELECT * FROM resupply WHERE resupply_id = ?`, [id]);
        const currentResupplyStock = getResupply[0][0].resupply_stock;
        
        const getProductStock = await conn.execute(`SELECT product_stock FROM products WHERE product_id = ?`, [getResupply[0][0].product_id]);
        const currentProductStock = getProductStock[0][0].product_stock;
        const newStock = parseInt(currentProductStock, 10) - parseInt(currentResupplyStock, 10);

        const data = await conn.execute(`DELETE FROM resupply WHERE resupply_id = ?`, [id])
        var statusCode = 200, message = 'success';
        if (data[0].affectedRows > 0) {
            const tableName = 'resupply';
            const columnName = 'resupply_id';
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

        await conn.execute(`UPDATE products SET product_stock = ? WHERE product_id = ?`, [newStock, getResupply[0][0].product_id]);
    } catch (e) {
        res.status(400).json({
            statusCode: 400,
            message: 'Have an error ' + e
        });
    } finally {
        if (conn) {
            conn.release();
        }
    }
})

export default router;

