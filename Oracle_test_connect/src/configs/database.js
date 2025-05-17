const oracle = require('oracledb');
require('dotenv').config();

// Sử dụng một hàm bất đồng bộ để đảm bảo pool được tạo trước khi export
async function createPool() {
    try {
        // Set up the Oracle database connection configuration
        const pool = await oracle.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECT_STRING,
            poolMin: 10,
            poolMax: 10,
            poolIncrement: 0,
            poolTimeout: 60,
        });

        console.log('Connection Pool đã được tạo.');
        return pool;
    } catch (err) {
        console.error('Lỗi khi tạo Connection Pool:', err);
        throw err;
    }
}

module.exports = { createPool };