// ไฟล์นี้จะมี 2 route ครับ:
// POST /auth/register — สมัครสมาชิก
// POST /auth/login — เข้าสู่ระบบ

const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcryptjs')

// POST /auth/register
router.post('/register', (req, res, next) => {

})