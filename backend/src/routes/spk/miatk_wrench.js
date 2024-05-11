import express from 'express';
import getConnection from '../../../db.js';
import { isAdmin, verifyUser } from '../../middleware/authUser.js';

const router = express.Router();

router.get('/miatkWrench', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection();
    try {
        const data = await conn.execute(`
        SELECT * FROM miatk_wrench ORDER BY a.resupply_id`);
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

router.post('/miatkWrench', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()

    try {
        const { productName, productSalePrice, productBuyPrice, productStock, productSaleAmount, productBuyAmount } = req.body;
        if(!productName || !productSalePrice || !productBuyPrice || !productStock || !productSaleAmount || !productBuyAmount) return res.status(204).json({msg: 'field kosong'});
        
        const data = await conn.execute(`INSERT INTO miatk_wrench VALUES(DEFAULT,?,?,?,?,?,?)`, [productName, productSalePrice, productBuyPrice, productStock, productSaleAmount, productBuyAmount]);
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

router.put('/miatkWrench/:id', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()
    try {
        const { resupplyName, resupplyStock, resupplyPrice, resupplyTotal, resupplyDate, resupplyStatus } = req.body;
        const id = parseInt(req.params.id, 10);
        
        if(!resupplyName || !resupplyStock || !resupplyPrice || !resupplyTotal || !resupplyDate || !resupplyStatus) return res.status(204).json({msg: 'field kosong'});
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

router.delete('/miatkWrench/:id', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()
    try {
        const id = parseInt(req.params.id, 10);
        
        const data = await conn.execute(`DELETE FROM miatk_wrench WHERE alternatif_id = ?`, [id])
        var statusCode = 200, message = 'success';
        if (data[0].affectedRows > 0) {
            const tableName = 'miatk_wrench';
            const columnName = 'alternatif_id';
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

