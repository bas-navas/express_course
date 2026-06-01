import axios from 'axios'

//กำหนด URL หลักของ Backend ครั้งเดียว
const api = axios.create({
    baseURL: 'http://localhost:3000'
})

//แนบ Token อัตโนมัติทุกครั้งที่เรียก API
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.authorization = token
    }
    return config
})

export default api