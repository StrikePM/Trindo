import express from 'express';
import getConnection from '../../../db.js';
import { isAdmin, verifyUser } from '../../middleware/authUser.js';
import midtrans from 'midtrans-client';

const router = express.Router();

router.post('/transaction', verifyUser, async (req, res) => {
    const conn = await getConnection();
    try {
        const snap = new midtrans.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
            clientKey: process.env.MIDTRANS_CLIENT_KEY
        })
        const { transactionId, productName, productPrice, priceTotal, userEmail, userName, userPhone, userAddress, productId, transactionQty } = req.body;
        
        const parameter = {
            item_details: {
                name: productName,
                price: productPrice,
                quantity: transactionQty,
            },
            transaction_details: {
                order_id: transactionId,
                gross_amount: productPrice * transactionQty
            }
        }

        const token = await snap.createTransactionToken(parameter);
        res.status(200).json({token});
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

export default router;

