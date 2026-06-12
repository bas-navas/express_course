import { useEffect, useState } from "react"
import api from "../services/api"

function Users() {
    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState({
        name: '', age: '', email: '', password: ''
    })
    const [editUser, setEditUser] = useState(null)

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

    // ฟังก์ชัน deleteUser:
    async function deleteUser(id) {
        if (!confirm('ยืนยันการลบ')) return
        try {
            await api.delete(`/users/${id}`)
            fetchUsers()   // ดึงข้อมูลใหม่หลังลบ
        } catch (err) {
            console.log(err)
        }
    }

    // กดปุ่มแก้ไข → เซ็ตข้อมูล user นั้นลง form
    function handleEdit(user) {
        setEditUser(user)
    }

    // กด Save → ส่ง PUT ไป Backend
    async function updateUser(e) {
        e.preventDefault()
        try {
            await api.put(`/users/${editUser.id}`, editUser)
            alert('แก้ไขสำเร็จ!')
            setEditUser(null)
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
                    className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer">
                    เพิ่ม
                </button>
            </form>

            {/* Form แก้ไข User   ← ตรงนี้ (แสดงเฉพาะตอนกดแก้ไข) */}
            {editUser && (
                <div>
                    <h2 className="text-4xl text-blue-500 mt-8 font-semibold">แก้ไข User</h2>
                    <form onSubmit={updateUser} className="my-4 flex gap-3">
                        <input className="py-1 px-2 outline-2 outline-blue-500 rounded"
                            type="text" name="name" value={editUser.name}
                            placeholder="Name" onChange={(e) => setEditUser(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <input type="number" name="age" value={editUser.age} placeholder="Age"
                            className="py-1 px-2 outline-2 outline-blue-500 rounded"
                            onChange={(e) => setEditUser(prev => ({ ...prev, age: e.target.value }))}
                        />
                        <input type="email" name="email" value={editUser.email}
                            placeholder="Email" onChange={(e) => setEditUser(prev => ({ ...prev, email: e.target.value }))}
                            className="py-1 px-2 outline-2 outline-blue-500 rounded"
                        />
                        <input type="password" name="password" value={editUser.password}
                            placeholder="password" onChange={(e) => setEditUser(prev => ({ ...prev, password: e.target.value }))}
                            className="py-1 px-2 outline-2 hidden outline-blue-500 rounded"
                        />
                        <button type="submit"
                            className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer">
                            Save
                        </button>
                        <button type="button" onClick={() => setEditUser(null)}
                            className="bg-gray-400 text-white px-4 py-1 rounded cursor-pointer">
                            ยกเลิก
                        </button>
                    </form>
                </div>
            )}


            {/* ตาราง User */}
            <table className='w-full border-collapse'>
                <thead>
                    <tr className='bg-blue-500 text-white'>
                        <th className='p-2'>ID</th>
                        <th className='p-2'>Name</th>
                        <th className='p-2'>Age</th>
                        <th className='p-2'>Email</th>
                        <th className="p-2">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b text-center">
                            <td className="p-2">{user.id}</td>
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.age}</td>
                            <td className="p-2">{user.email}</td>

                            <td className="p-2 flex gap-2 justify-center">
                                <button onClick={() => handleEdit(user)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
                                >
                                    แก้ไข
                                </button>
                                <button onClick={() => deleteUser(user.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer">
                                    ลบ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Users