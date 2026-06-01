import { useState } from 'react'
import api from '../services/api'

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')

  return (
    <div className='max-w-6xl mx-auto py-4 px-6'>
      <h2 className='text-4xl font-semibold text-blue-500 tracking-widest uppercase'>
        Login
      </h2>
      <form>
        <label></label>
        <input type="text" />

      </form>

    </div>
  )
}

export default Login