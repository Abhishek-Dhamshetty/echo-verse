import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminProfile() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            navigate("/"); // 🚫 Redirect non-admins to home
        }

        async function fetchUsers() {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/admin-api/users", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        }

        fetchUsers();
    }, [navigate]);

    const toggleBlock = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:3000/admin-api/toggle-block/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUsers(users.map(user => user._id === userId ? { ...user, isBlocked: !user.isBlocked } : user));
        } catch (err) {
            console.error("Error updating user status:", err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Admin Dashboard</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                            <td>
                                <button className={`btn ${user.isBlocked ? "btn-success" : "btn-danger"}`}
                                    onClick={() => toggleBlock(user._id)}>
                                    {user.isBlocked ? "Unblock" : "Block"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminProfile;
