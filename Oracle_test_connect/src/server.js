const express = require("express");
require("dotenv").config();
const { createPool } = require("./configs/database");

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8001;

const app = express();

app.use("/", async (req, res) => {
    try {
        // Lấy pool và sau đó lấy connection từ pool
        const pool = await createPool();
        const connection = await pool.getConnection();
        console.log("Got a connection from the pool");

        // Đừng quên trả kết nối về pool khi đã xong
        await connection.close();
    } catch (err) {
        console.error("Error getting connection from pool", err);
        throw err;
    }
    res.send("Hello World");
})

app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});