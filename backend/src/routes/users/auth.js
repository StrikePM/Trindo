import express from 'express';
import argon2 from'argon2';
import getConnection from '../../../db.js';

const router = express.Router();

router.get('/me', async (req, res) => {
    const conn = await getConnection();
    
    try {
        if (!req.session.uId) {
            return res.status(401).json({msg: 'mohon login ke akun anda'})
        }
        
        const user = await conn.execute(`SELECT user_id, user_name, user_email, user_address, user_phone, user_role FROM users WHERE user_id = ?`, [req.session.uId]);
        
        if (!user[0][0]) {
            return res.status(404).json({msg: 'user tidak ditemukan'});
        }
        res.status(200).json(user[0][0]);
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

router.post('/login', async (req, res) => {
    const conn = await getConnection();

    try {
        const { userEmail, userPassword } = req.body;
        console.log(userEmail);
        console.log(userPassword);
        if(!userEmail || !userPassword) return res.status(204).json({msg: 'field kosong'});

        //cek email
        const user = await conn.execute(`SELECT * FROM users WHERE user_email = ?`, [userEmail]);
        if (!user[0][0]) {
            return res.status(404).json({msg: 'user tidak ditemukan'});
        }
    
        //cek password  
        const match = await argon2.verify(user[0][0].user_password, userPassword);    
        if (!match) {
            return res.status(400).json({msg: 'password salah'});
        }
        console.log("test");
        //buat session
        // req.session.uId = user[0][0].user_id;
        // const idUser = user[0][0].user_id;
        // const nameUser = user[0][0].user_name;
        // const emailUser = user[0][0].user_email;
        // const roleUser = user[0][0].user_role;
        // res.status(200).json({idUser, nameUser, emailUser, roleUser});
        req.session.uId = user[0][0].user_id;
        req.session.save((err) => {
            if (err) {
                return res.status(500).json({msg: 'Failed to save session'});
            }
            res.status(200).json({
                idUser: user[0][0].user_id,
                nameUser: user[0][0].user_name,
                emailUser: user[0][0].user_email,
                roleUser: user[0][0].user_role
            });
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

router.delete('/logout', async (req, res) => {
    const conn = await getConnection();

    try {
        req.session.destroy((error)=>{
            if (error) {
                return res.status(400).json({msg: 'tidak bisa logout'})
            }

            res.status(200).json({msg: 'anda telah logout'});
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

export default router;
