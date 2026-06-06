import { useEffect, useState } from "react"
import api from "../services/api"

function Users() {
    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState({
        name: '', age: '', email: '', password: ''
    })

    async function fetchUsers() {
        try {
            const res = await api.get('/users')
            // console.log(res.data)
            setUsers(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        setNewUser(prev => ({ ...prev, [name]: value }))
    }

    async function addUser(e) {
        e.preventDefault()
        if (!newUser.name || !newUser.age || !newUser.email || !newUser.password) {
            alert('กรุณากรอกข้อมูลให้ครบ')
            return
        }

        try {
            await api.post('/auth/register', newUser)
            alert('เพิ่ม User สำเร็จ')
            setNewUser({
                name: '', age: '', email: '', password: ''
            })
            fetchUsers()
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className='max-w-6xl mx-auto py-4 px-6'>
            <h2 className='text-4xl p-4 font-semibold text-blue-500 tracking-widest'>
                Users
            </h2>
            {/* From เพิ่ม User */}
            <form onSubmit={addUser} className="my-4 flex gap-3">
                <input className="py-1 px-2 outline-2 outline-blue-500 rounded"
                    type="text" name="name" value={newUser.name}
                    placeholder="Name" onChange={handleChange}
                />
                <input type="number" name="age" value={newUser.age} placeholder="Age"
                    className="py-1 px-2 outline-2 outline-blue-500 rounded"
                    onChange={handleChange}
                />
                <input type="email" name="email" value={newUser.email}
                    placeholder="Email" onChange={handleChange}
                    className="py-1 px-2 outline-2 outline-blue-500 rounded"
                />
                <input type="password" name="password" value={newUser.password}
                    placeholder="password" onChange={handleChange}
                    className="py-1 px-2 outline-2 outline-blue-500 rounded"
                />
                <button type="submit"
                    className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer">เพิ่ม</button>
            </form>


            {/* ตาราง User */}
            <table className='w-full border-collapse'>
                <thead>
                    <tr className='bg-blue-500 text-white'>
                        <th className='p-2'>ID</th>
                        <th className='p-2'>Name</th>
                        <th className='p-2'>Age</th>
                        <th className='p-2'>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b text-center">
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Users