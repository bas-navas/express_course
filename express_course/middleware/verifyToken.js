const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    // 1. ดึง Token จาก Header
    const token = req.headers.authorization

    // 2. เช็กว่ามี Token ไหม
    if(!token){
        res.json({message:'ไม่มี Token'})
        return
    }

    // 3. เช็กว่า Token ถูกต้องไหม
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded  // ← เก็บข้อมูล user ไว้ใช้ใน Route
        next()
    } catch (err) {
        res.json({message:'Token ไม่ถูกต้อง'})
    }
}

module.exports = verifyToken