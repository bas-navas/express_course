function CheckAuth(req, res, next) {
    const auth = req.headers.authorization

    if (auth === 'secret123') {
        next()
    } else {
        res.json({ message: 'ไม่มีสิทธิ์เข้าถึง' })
    }
}

module.exports = CheckAuth