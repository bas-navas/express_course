// ไฟล์นี้จะมี 2 route ครับ:
// POST /auth/register — สมัครสมาชิก
// POST /auth/login — เข้าสู่ระบบ

const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// POST /auth/register
router.post('/register', async (req, res, next) => {
    const { name, email, password } = req.body

    // 1. เข้ารหัส password ก่อนเก็บ
    const hashedPassword = await bcrypt.hash(password, 10)

    // 2. บันทึกลง Database
    const sql = 'INSERT INTO users (name,email,password)VALUES (?,?,?)'
    db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
            next(err)
            return
        }
        res.json({ message: 'สมัครสมาชิกสำเร็จ!' })
    })
})

// Route Login
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.json({ message: 'กรุณากรอก email และ password' })
        return
    }

    // 1. หา user จาก email
    const sql = 'SELECT * FROM users WHERE email = ?'
    db.query(sql, [email], async (err, result) => {
        if (err) {
            next(err)
            return
        }

        // 2. เช็กว่าเจอ user ไหม
        const user = result[0]
        if (!user) {
            res.json({ message: 'ไม่พบ email นี้' })
            return
        }

        // 3. เช็ก password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.json({ message: 'password ไม่ถูกต้อง' })
            return
        }

        // 4. สร้าง Token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET
        )

        // 5. ส่ง Token กลับไป
        res.json({ token: token })
    })
})
// ขั้นต่อไปคือสร้าง Middleware ที่ เช็ก Token ก่อนเข้าถึง Route 
module.exports = router