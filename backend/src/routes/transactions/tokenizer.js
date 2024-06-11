import express from 'express';
import getConnection from '../../../db.js';
import { isAdmin, verifyUser } from '../../middleware/authUser.js';
import midtrans from 'midtrans-client';

const router = express.Router();

router.post('/process-transaction', verifyUser, async (req, res) => {
    const conn = await getConnection();
    try {
        const snap = new midtrans.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
            clientKey: process.env.MIDTRANS_CLIENT_KEY
        })
        const { cartItems, auth, transactionId } = req.body;
        console.log(cartItems);
        console.log(auth);
        console.log(transactionId);
        // console.log(productName);
        // console.log(productPrice.reduce((total, price) => total + price, 0));
        // console.log(priceTotal);
        // console.log(userEmail);
        // console.log(userName);
        // console.log(userPhone);
        // console.log(userAddress);
        // console.log(productId);
        // console.log(productBrand);
        // console.log(productCategory);
        // console.log(transactionQty);
        const parameter = {
            transaction_details: {
                order_id: transactionId.toString(),
                gross_amount: cartItems.cartTotalAmount
            },
            item_details: cartItems.cartItems.map(item => ({
                id: item.product_id.toString(),
                name: item.product_name,
                price: item.product_price,
                quantity: item.cartQuantity,
                brand: item.brand_name,
                category: item.category_name,
                merchant_name: "Trindo Jaya"
            })),
            customer_details: {
                first_name: auth.stateAuth.user_name,
                email: auth.stateAuth.user_email,
                phone: auth.stateAuth.user_phone,
                billing_address: {
                    first_name: auth.stateAuth.user_name,
                    email: auth.stateAuth.user_email,
                    phone: auth.stateAuth.user_phone,
                    address: auth.stateAuth.user_address,
                    country_code: "IDN"
                }
            },
            shipping_address: {
                first_name: auth.stateAuth.user_name,
                email: auth.stateAuth.user_email,
                phone: auth.stateAuth.user_phone,
                address: auth.stateAuth.user_address,
                country_code: "IDN"
            },
            enabled_payments: [
                "bni_va", "bri_va"
            ],
            bni_va: {
                va_number: "123123123123123"
            },
            bri_va: {
                va_number: "123123123123123"
            }
        };

        snap.createTransaction(parameter).then((transaction) => {
            const dataPayment = {
                response: JSON.stringify(transaction)
            };

            const token = transaction.token;
            res.status(200).json({ message: "success", dataPayment, token: token });
        });
    } catch (error) {
        console.log(error);
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

router.get('/transaction', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection();
    try {
        const data = await conn.execute(`
        SELECT
        a.transaction_id,
        b.user_id,
        b.user_name,
        c.product_id,
        c.product_name,
        a.transaction_qty,
        a.transaction_price,
        a.transaction_total,
        a.transaction_date,
        a.transaction_status
        FROM transactions a INNER JOIN users b 
        ON a.user_id = b.user_id INNER JOIN products c
        ON a.product_id = c.product_id
        ORDER BY a.transaction_id`);
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

router.post('/transaction', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()

    try {
        const { transactionUser, transactionProd, transactionQty, transactionPrice, transactionTotal, transactionDate, transactionStatus } = req.body;
        if (!transactionUser || !transactionProd || !transactionQty || !transactionPrice || !transactionTotal || !transactionDate || !transactionStatus) return res.status(204).json({ msg: 'field kosong' });

        const data = await conn.execute(`INSERT INTO transactions VALUES(DEFAULT,?,?,?,?,?,?,?)`, [transactionUser, transactionProd, transactionQty, transactionPrice, transactionTotal, transactionDate, transactionStatus]);
        let statusCode = 200;
        let message = 'success';
        if (data[0] == 0) {
            statusCode = 400;
            message = 'gagal memasukan data transaction';
        }
        res.status(statusCode).json({
            statusCode,
            message,
        });

        // const getStock = await conn.execute(`SELECT product_stock FROM products WHERE product_id = ?`, [transactionName]);
        // const currentStock = getStock[0][0].product_stock;
        // const newStock = parseInt(currentStock, 10) + parseInt(transactionStock, 10);
        // await conn.execute(`UPDATE products SET product_stock = ? WHERE product_id = ?`, [newStock, transactionName]);
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

router.put('/transaction/:id', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()
    try {
        const { transactionUser, transactionProd, transactionQty, transactionPrice, transactionTotal, transactionDate, transactionStatus } = req.body;
        const id = parseInt(req.params.id, 10);

        console.log(transactionUser);
        console.log(transactionProd);
        console.log(transactionQty);
        console.log(transactionPrice);
        console.log(transactionTotal);
        console.log(transactionDate);
        console.log(transactionStatus);

        if (!transactionUser || !transactionProd || !transactionQty || !transactionPrice || !transactionTotal || !transactionDate || !transactionStatus) return res.status(204).json({ msg: 'field kosong' });

        // const getResupplyStock = await conn.execute(`SELECT transaction_stock FROM transaction WHERE transaction_id = ?`, [id]);
        // const currentResupplyStock = getResupplyStock[0][0].transaction_stock;

        // const getProductStock = await conn.execute(`SELECT product_stock FROM products WHERE product_id = ?`, [transactionName]);
        // const currentProductStock = getProductStock[0][0].product_stock;
        // const newCurrentStock = parseInt(currentProductStock, 10) - parseInt(currentResupplyStock, 10);


        const data = await conn.execute(`UPDATE transactions SET user_id =?, product_id=?, transaction_qty=?, transaction_price=?, transaction_total=?, transaction_date=?, transaction_status=? WHERE transaction_id = ?`,
            [transactionUser, transactionProd, transactionQty, transactionPrice, transactionTotal, transactionDate, transactionStatus, id]);
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

        // const newStock = newCurrentStock + parseInt(transactionStock, 10);
        // await conn.execute(`UPDATE products SET product_stock = ? WHERE product_id = ?`, [newStock, transactionName]);
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

router.delete('/transaction/:id', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()
    try {
        const id = parseInt(req.params.id, 10);

        // const getResupply = await conn.execute(`SELECT * FROM transaction WHERE transaction_id = ?`, [id]);
        // const currentResupplyStock = getResupply[0][0].transaction_stock;

        // const getProductStock = await conn.execute(`SELECT product_stock FROM products WHERE product_id = ?`, [getResupply[0][0].product_id]);
        // const currentProductStock = getProductStock[0][0].product_stock;
        // const newStock = parseInt(currentProductStock, 10) - parseInt(currentResupplyStock, 10);

        const data = await conn.execute(`DELETE FROM transactions WHERE transaction_id = ?`, [id])
        var statusCode = 200, message = 'success';
        if (data[0].affectedRows > 0) {
            const tableName = 'transaction';
            const columnName = 'transaction_id';
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

        // await conn.execute(`UPDATE products SET product_stock = ? WHERE product_id = ?`, [newStock, getResupply[0][0].product_id]);
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

