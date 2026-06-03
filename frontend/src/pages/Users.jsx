import { useEffect, useState } from "react"
import api from "../services/api"

function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await api.get('/users')
                // console.log(res.data)
                setUsers(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchUsers()
    }, [])

    return (
        <div className='max-w-6xl mx-auto py-4 px-6'>
            <h2 className='text-4xl p-4 font-semibold text-blue-500 tracking-widest'>
                Users
            </h2>
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