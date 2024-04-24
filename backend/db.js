import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    user: "root",
    password: "",
    database: "dbtrindo",
    port: "3306",
    host: "localhost"
});

async function getConnection() {
    return pool.getConnection();
}

export default getConnection;