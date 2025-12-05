'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { User, Shield, GraduationCap, School, Trash2, Edit2, Check, X } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface UserData {
    _id: string;
    name: string;
    email: string;
    role: string;
    studentId?: string;
    department?: string;
    createdAt: string;
}

export default function ManageUsersPage() {
    const { user } = useAuth();
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<string>('');

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchUsers();
        }
    }, [user]);

    async function fetchUsers() {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            if (res.ok) {
                setUsers(data.users);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        toast((t) => (
            <div className="flex flex-col gap-2">
                <span className="font-medium">Delete this user?</span>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
                                if (res.ok) {
                                    setUsers((prev) => prev.filter(u => u._id !== id));
                                    toast.success('User deleted');
                                } else {
                                    toast.error('Failed to delete user');
                                }
                            } catch (err) {
                                toast.error('Error deleting user');
                            }
                        }}
                        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), { id: `delete-user-${id}` });
    }

    function startEdit(user: UserData) {
        setEditingId(user._id);
        setSelectedRole(user.role);
    }

    function cancelEdit() {
        setEditingId(null);
        setSelectedRole('');
    }

    async function saveRole(id: string) {
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: selectedRole }),
            });

            if (res.ok) {
                const data = await res.json();
                setUsers(users.map(u => u._id === id ? { ...u, role: data.user.role } : u));
                setEditingId(null);
                toast.success('Role updated');
            } else {
                toast.error('Failed to update role');
            }
        } catch (err) {
            toast.error('Error updating role');
        }
    }

    if (loading) return <div className="p-6 text-center">Loading users...</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
    if (user?.role !== 'admin') return <div className="p-6 text-center text-red-600">Access Denied</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Users: {users.length}</div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((userData) => (
                        <li key={userData._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center flex-1">
                                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${userData.role === 'admin' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                                        userData.role === 'teacher' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                                            'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                        }`}>
                                        {userData.role === 'admin' ? <Shield size={20} /> :
                                            userData.role === 'teacher' ? <School size={20} /> :
                                                <GraduationCap size={20} />}
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{userData.name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    {editingId === userData._id ? (
                                        <div className="flex items-center space-x-2">
                                            <select
                                                value={selectedRole}
                                                onChange={(e) => setSelectedRole(e.target.value)}
                                                className="block w-full pl-3 pr-10 py-1 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                            >
                                                <option value="student">Student</option>
                                                <option value="teacher">Teacher</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                            <button onClick={() => saveRole(userData._id)} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                                                <Check size={18} />
                                            </button>
                                            <button onClick={cancelEdit} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-4">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${userData.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                                userData.role === 'teacher' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                }`}>
                                                {userData.role}
                                            </span>
                                            {/* Prevent deleting yourself */}
                                            {user._id !== userData._id && (
                                                <>
                                                    <button onClick={() => startEdit(userData)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(userData._id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {userData.role === 'student' && (
                                <div className="mt-2 ml-14 text-xs text-gray-500 dark:text-gray-400">
                                    ID: {userData.studentId} • Dept: {userData.department}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
