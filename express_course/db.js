const mysql = require('mysql2')
require('dotenv').config()   // ← โหลดค่าจาก .env ก่อนเลย

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) {
        console.log('error', err)
        return
    } else {
        console.log('เชื่อมต่อ MySQL สำเร็จแล้ว! ✅')
    }
})

module.exports = connection
//ได้แล้วครับ