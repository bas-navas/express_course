import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    try {
      //เช็กว่าข้อมูลครบไหม
      if (!email || !password) {
        setError('กรุณากรอก email และ password')
        return
      }

      const response = await api.post('/auth/login', { email, password })
      const token = response.data.token

      //เก็บ token ไว้ใน localStorage
      localStorage.setItem('token', token)
      navigate('/users')
      alert('Login สำเร็จ!')
    } catch (err) {
      setError('Login ไม่สำเร็จ')
    }
  }

  return (
    <div className='max-w-6xl mx-auto py-4 px-6'>

      <h2 className='text-4xl text-center p-4 font-semibold text-blue-500 tracking-widest uppercase'>
        Login
      </h2>
      <form onSubmit={handleLogin} className='my-4 px-4 flex items-center flex-col gap-6'>
        <div className='flex items-center gap-3'>
          <label className='font-semibold w-25'>email: </label>
          <input className='px-2 py-1 outline-2 rounded outline-blue-500'
            type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='flex items-center gap-3'>
          <label className='font-semibold w-25'>password: </label>
          <input className='px-2 py-1 outline-2 rounded outline-blue-500'
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className='w-100 bg-green-500 text-2xl py-1 px-4 rounded 
        text-white font-semibold cursor-pointer'>
          เข้าสู่ระบบ
        </button>
        {/* โชว์ข้อความ error */}
        {error && <p className='text-red-500'>{error}</p>}
      </form>
      <p className='px-4 text-center'>ยังไม่มีบัญชี?{' '}
        <span onClick={() => navigate('/register')}
          className='text-blue-500 cursor-pointer'>สมัครสมาชิก</span></p>
    </div>
  )
}

export default Login