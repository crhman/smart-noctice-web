'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import toast from 'react-hot-toast';

const DEPARTMENTS = [
    'Computer Science',
    'Software Engineering',
    'Information Technology',
    'Data Science',
    'Electrical Engineering',
    'Business Administration'
];

export default function NewNoticePage() {
    const router = useRouter();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'General',
        targetDepartments: [] as string[]
    });
    const [loading, setLoading] = useState(false);

    if (user && user.role === 'student') {
        router.push('/dashboard/notices');
        return null;
    }

    const handleDepartmentToggle = (dept: string) => {
        setFormData(prev => {
            const current = prev.targetDepartments;
            if (current.includes(dept)) {
                return { ...prev, targetDepartments: current.filter(d => d !== dept) };
            } else {
                return { ...prev, targetDepartments: [...current, dept] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/notices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                toast.success('Notice posted successfully!');
                router.push('/dashboard/notices');
            } else {
                toast.error('Failed to post notice');
            }
        } catch (error) {
            toast.error('Error creating notice');
            console.error('Failed to create notice', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Notice</h1>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option>General</option>
                            <option>Urgent</option>
                            <option>Academic</option>
                            <option>Exam</option>
                            <option>Event</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Departments (Optional - Leave empty for all)</label>
                        <div className="grid grid-cols-2 gap-2">
                            {DEPARTMENTS.map((dept) => (
                                <label key={dept} className="inline-flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.targetDepartments.includes(dept)}
                                        onChange={() => handleDepartmentToggle(dept)}
                                        className="rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{dept}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                        <textarea
                            required
                            rows={6}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mr-3"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                        >
                            {loading ? 'Posting...' : 'Post Notice'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
