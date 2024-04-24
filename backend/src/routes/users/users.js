import express from 'express';
import argon2 from 'argon2';
import getConnection from '../../../db.js';
import { isAdmin, verifyUser } from '../../middleware/authUser.js';

const router = express.Router();

router.get('/users', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection();
    try {
        const data = await conn.execute(`
        SELECT * FROM users ORDER BY user_id`);
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

router.post('/users', async (req, res) => {
    const conn = await getConnection();

    try {
        const { userName, userAddress, userEmail, userPassword, userConfirmPassword, userPhone } = req.body;
        if(!userName || !userAddress || !userEmail || !userPassword || !userConfirmPassword || !userPhone) return res.status(204).json({msg: 'field kosong'});
        
        const similarEmail = await conn.execute(`SELECT user_email FROM users WHERE user_email = ?`, [userEmail]);
        if (similarEmail[0][0] && similarEmail[0][0].user_email === userEmail) {
            return res.status(400).json({ msg: "email sudah digunakan" });
        }
        
        if (userPassword !== userConfirmPassword) {
            return res.status(400).json({msg: "password dan confirm password tidak cocok"});
        }
        const hashPassword = await argon2.hash(userPassword);

        const data = await conn.execute(`INSERT INTO users VALUES(DEFAULT,?,?,?,?,?,DEFAULT)`, [userName, userAddress, userEmail, hashPassword, userPhone]);
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

router.patch('/users/:id', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()
    try {
        const { userRole } = req.body;
        const id = parseInt(req.params.id, 10);

        const data = await conn.execute(`UPDATE users SET user_role = ? WHERE user_id = ?`,
            [userRole, id]);
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

router.delete('/users/:id', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()
    try {
        const id = parseInt(req.params.id, 10);
        const data = await conn.execute(`DELETE FROM users WHERE user_id = ?`, [id])
        let statusCode = 200 
        let message = 'success';
        if (data[0].affectedRows > 0) {
            const tableName = 'users';
            const columnName = 'user_id';
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

router.put('/profile', verifyUser, async (req, res) => {
    const conn = await getConnection()
    try {
        const { userName, userAddress, userPhone } = req.body;
        const id = req.session.uId;
        if(!userName || !userAddress || !userPhone) return res.status(204).json({msg: 'field kosong'});

        const data = await conn.execute(`UPDATE users SET user_name =?, user_address = ?, user_phone = ? WHERE user_id = ?`,
            [userName, userAddress, userPhone, id]);
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

export default router;