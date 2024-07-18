import express from 'express';
import getConnection from '../../../db.js';
import { isAdmin, verifyUser } from '../../middleware/authUser.js';

const router = express.Router();

router.get('/criteria', isAdmin, verifyUser, async (req, res) => {
    const conn = await getConnection();
    try {
        const data = await conn.execute(`
        SELECT * FROM criteria ORDER BY criteria_id`);
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

router.put('/criteria/:id', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()
    try {
        const { subStart1, subEnd1, subWeight1, 
            subStart2, subEnd2, subWeight2, 
            subStart3, subEnd3, subWeight3, 
            subStart4, subEnd4, subWeight4, 
            subStart5, subEnd5, subWeight5 } = req.body;
        
        const id = parseInt(req.params.id, 10);
        if(
            subStart1 === undefined || subEnd1 === undefined || subWeight1 === undefined || 
            subStart2 === undefined || subEnd2 === undefined || subWeight2 === undefined || 
            subStart3 === undefined || subEnd3 === undefined || subWeight3 === undefined || 
            subStart4 === undefined || subEnd4 === undefined || subWeight4 === undefined || 
            subStart5 === undefined || subEnd5 === undefined || subWeight5 === undefined
        ) return res.status(204).json({msg: 'field kosong'});
        const data = await conn.execute(`UPDATE criteria SET sub_start_1=?, sub_end_1=?, sub_weight_1=?, 
            sub_start_2=?, sub_end_2=?, sub_weight_2=?, 
            sub_start_3=?, sub_end_3=?, sub_weight_3=?, 
            sub_start_4=?, sub_end_4=?, sub_weight_4=?, 
            sub_start_5=?, sub_end_5=?, sub_weight_5=? WHERE criteria_id=?`,
            [subStart1, subEnd1, subWeight1, 
                subStart2, subEnd2, subWeight2, 
                subStart3, subEnd3, subWeight3, 
                subStart4, subEnd4, subWeight4, 
                subStart5, subEnd5, subWeight5, id]);
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

export default router;

