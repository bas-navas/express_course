const express = require('express')
const router = express.Router()  // ทำ เอ็กซ์เพรส เราเตอร์
const db = require('../db')
const checkAuth = require('../middleware/checkAuth')

router.get('/', (req, res, next) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            next(err)
            return
        }
        res.json(result)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.json({ message: 'เกิดข้อผิดพลาด' })
            return
        } else {
            res.json(result[0])
        }
    })
})

router.post('/', (req, res) => {
    const { name, age } = req.body
    db.query('INSERT INTO users (name,age) VALUES (?,?)', [name, age], (err, result) => {
        if (err) {
            res.json({ message: 'เกิดข้อผิดพลาด' })
            return
        } else {
            res.json({
                id: result.insertId,
                name: name,
                age: age
            })
        }
    })
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const { name, age } = req.body

    db.query('UPDATE users SET name = ?, age = ? WHERE id = ?', [name, age, id], (err, result) => {
        if (err) {
            res.json({ message: 'เกิดข้อผิดพลาด' })
            return
        }
        if (result.affectedRows === 0) {
            res.json({ message: 'ไม่พบ user' })
            return
        } else {
            res.json({ id, name, age })
        }
    })
})

router.delete('/:id', checkAuth, (req, res) => {
    const id = Number(req.params.id)

    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.json({ message: 'เกิดข้อผิดพลาด' })
            return
        }
        if (result.affectedRows === 0) {
            res.json({ message: 'ไม่พบ user' })
            return
        }
        res.json({ message: 'ลบสำเร็จ' })
    })
})

module.exports = router;