require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const myMiddleware = require('./middleware/myMiddleware')

//Middleware ที่แสดงข้อมูลทุกครั้งที่มี Request เข้ามา
app.use(express.json())
app.use(myMiddleware)


const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

// Global Error Handler
app.use((err, req, res, next) => {
    console.log('เกิด Error', err.message)
    res.status(500).json({ message: 'เกิดข้อผิดพลาดบางอย่าง' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})