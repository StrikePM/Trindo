import express from 'express';
import getConnection from '../../../db.js';
import cloudinary from '../../utils/cloudinary.js';
import upload from '../../middleware/multer.js';
import { isAdmin, verifyUser } from '../../middleware/authUser.js';

const router = express.Router();

// router.post('/upload', upload.single('image'), function (req, res) {
//     cloudinary.uploader.upload(req.file.path, { folder: "Trindo" }, function (err, result) {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({
//                 success: false,
//                 message: "Error"
//             })
//         }

//         console.log(result.url);
//         res.status(200).json({
//             success: true,
//             message: "Uploaded!",
//             data: result
//         })
//     })
// });


router.get('/products', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection();
    try {
        const data = await conn.execute(`
        SELECT
        a.product_id,
        a.product_name,
        b.category_id,
        b.category_name,
        a.product_brand,
        a.product_desc,
        a.product_price,
        a.product_image,
        a.product_stock
        FROM products a INNER JOIN categories b 
        ON a.category_id = b.category_id 
        ORDER BY a.product_id`);
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

router.post('/products', verifyUser, isAdmin, upload.single('image'), async (req, res) => {
    const conn = await getConnection()
    try {
        const { productName, productCategory, productBrand, productDesc, productPrice, image } = req.body;
        if(!productName || !productCategory || !productBrand || !productDesc || !productPrice) return res.status(204).json({msg: 'field kosong'});

        console.log(req.file.path);
        // // Upload image ke Cloudinary
        // cloudinary.uploader.upload(req.file.path, { folder: "Trindo" }, async function (err, result) {
        //     if (err) {
        //         console.log(err);
        //         return res.status(500).json({
        //             success: false,
        //             message: "Error uploading image"
        //         });
        //     }

        //     // Insert product ke database menggunakan image URL
        //     const imageUrl = result.url;
        //     const data = await conn.execute(`INSERT INTO products VALUES(DEFAULT,?,?,?,?,?,?,DEFAULT)`, [productName,
        //         productCategory, productBrand, productDesc, productPrice, imageUrl]);

        //     let statusCode = 200;
        //     let message = 'success';
        //     if (data[0] == 0) {
        //         statusCode = 400;
        //         message = 'failed';
        //     }
        //     res.status(statusCode).json({
        //         statusCode,
        //         message,
        //     });
        // });
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


router.put('/products/:id', verifyUser, isAdmin, upload.single('image'), async (req, res) => {
    const conn = await getConnection()
    try {
        const { productName, productCategory, productBrand, productDesc, productPrice } = req.body;
        const id = parseInt(req.params.id, 10);
        if(!productName || !productCategory || !productBrand || !productDesc || !productPrice) return res.status(204).json({msg: 'field kosong'});

        // Get public id dari URL gambar
        const getProd = await conn.execute(`SELECT product_image FROM products WHERE product_id = ?`, [id]);
        const prod = getProd[0];
        const imgPublicId = prod[0].product_image;
        const publicId = imgPublicId.split('/').pop().split('.')[0];

        // Delete image dari Cloudinary
        cloudinary.uploader.destroy('Trindo/'+publicId, { folder: "Trindo" }, async function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Error deleting image"
                });
            }
            console.log(result);
        });

        cloudinary.uploader.upload(req.file.path, { folder: "Trindo" }, async function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Error uploading image"
                });
            }

            const imageUrl = result.url;
            const data = await conn.execute(`UPDATE products SET product_name =?, category_id=?, product_brand=?, product_desc=?, product_price=?, product_image=? WHERE product_id = ?`,
                [productName, productCategory, productBrand, productDesc, productPrice, imageUrl, id]);
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

router.delete('/products/:id', verifyUser, isAdmin, async (req, res) => {
    const conn = await getConnection()
    try {
        const id = parseInt(req.params.id, 10);

        const getProd = await conn.execute(`SELECT product_image FROM products WHERE product_id = ?`, [id]);
        const prod = getProd[0];
        const imgPublicId = prod[0].product_image;
        const publicId = imgPublicId.split('/').pop().split('.')[0];

        // Delete image dari Cloudinary
        cloudinary.uploader.destroy('Trindo/'+publicId, { folder: "Trindo" }, async function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Error deleting image"
                });
            }

            const data = await conn.execute(`DELETE FROM products WHERE product_id = ?`, [id])
            var statusCode = 200, message = 'success';
            if (data[0].affectedRows > 0) {
                const tableName = 'products';
                const columnName = 'product_id';
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
        });
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