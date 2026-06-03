import { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        age: ''
    })
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [age, setAge] = useState('')
    const [error, setError] = useState('')

    function handleChange(e) {
        const { name, value } = e.target
        setNewUser((prev) => ({ ...prev, [name]: value }))
    }

    async function handleRegister(e) {
        e.preventDefault()
        if (!newUser.name || !newUser.email || !newUser.password || !newUser.age) {
            setError('กรุณากรอกข้อมูลให้ครบ')
            return
        }

        try {
            await api.post('/auth/register', newUser)
            // หลัง Register สำเร็จ
            alert('สมัครสมาชิกสำเร็จ!')
            navigate('/users')

            setNewUser(
                {
                    name: '',
                    email: '',
                    password: '',
                    age: ''
                }
            )
            setError('')
        } catch (err) {
            setError('สมัครสมาชิกไม่สำเร็จ')
        }
    }

    return (
        <div className='max-w-6xl mx-auto py-4 px-6'>
            <h2 className='text-4xl p-4 font-semibold text-blue-500 tracking-widest uppercase text-center'>
                Register
            </h2>
            <form onSubmit={handleRegister} className='my-4 px-4 flex flex-col gap-6 justify-center items-center'>
                <div className='flex gap-3 items-center'>
                    <label className='font-semibold w-25'>Name: </label>
                    <input className='px-2 py-1 outline-2 outline-blue-500 rounded'
                        type="text" value={newUser.name} name='name' onChange={handleChange} />
                </div>
                <div className='flex gap-3 items-center'>
                    <label className='font-semibold w-25'>Email: </label>
                    <input className='px-2 py-1 outline-2 outline-blue-500 rounded'
                        type="email" value={newUser.email} name='email' onChange={handleChange} />
                </div>
                <div className='flex gap-3 items-center'>
                    <label className='font-semibold w-25'>Password: </label>
                    <input className='px-2 py-1 outline-2 outline-blue-500 rounded'
                        type="password" value={newUser.password} name='password' onChange={handleChange} />
                </div>
                <div className='flex gap-3 items-center'>
                    <label className='font-semibold w-25'>Age: </label>
                    <input className='px-2 py-1 outline-2 outline-blue-500 rounded'
                        type="number" value={newUser.age} name='age' onChange={handleChange} />
                </div>

                <button type='submit' className='w-100 bg-blue-500 text-2xl py-1 px-4 rounded
                 text-white font-semibold cursor-pointer'>
                    สมัครสมาชิก
                </button>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
            <p className='px-4 text-center'>มีบัญชีแล้ว? {' '}
                <span onClick={() => navigate('/')}
                    className='text-blue-500 cursor-pointer'>เข้าสู่ระบบ</span>
            </p>
        </div>
    )
}

export default Register