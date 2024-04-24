import getConnection from "../../db.js";

export const verifyUser = async (req, res, next) => {
    const conn = await getConnection();
    try {
        if (!req.session.uId) {
            return res.status(401).json({ msg: 'mohon login ke akun anda' });
        }
        const user = await conn.execute(`SELECT * FROM users WHERE user_id = ?`, [req.session.uId]);
        if (!user[0][0]) {
            return res.status(404).json({ msg: 'user tidak ditemukan' });
        }
        req.userId = user[0][0].user_id;
        req.userRole = user[0][0].user_role;
        next();
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: 'Have an error ' + e,
        });
    } finally {
        if (conn) {
            conn.release();
        }
    }

}

export const isAdmin = async (req, res, next) => {
    const conn = await getConnection();
    try {
        const user = await conn.execute(`SELECT * FROM users WHERE user_id = ?`, [req.session.uId]);
        if (!user[0][0]) {
            return res.status(404).json({ msg: 'user tidak ditemukan' });
        }
        if (user[0][0].user_role !== 'admin') {
            return res.status(403).json({ msg: 'akses terlarang' })
        }
        next();
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: 'Have an error ' + e,
        });
    } finally {
        if (conn) {
            conn.release();
        }
    }

}