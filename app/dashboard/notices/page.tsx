'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import { Plus, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface Notice {
    _id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
    author: { name: string; role: string };
    targetDepartments?: string[];
}

export default function NoticesPage() {
    const { user } = useAuth();
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchNotices();
    }, [filter]);

    async function fetchNotices() {
        setLoading(true);
        try {
            const res = await fetch(`/api/notices?category=${filter}`);
            const data = await res.json();
            setNotices(data.notices || []);
        } catch (error) {
            console.error('Failed to fetch notices', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Noticeboard</h1>
                {user?.role !== 'student' && (
                    <Link href="/dashboard/notices/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-600">
                        <Plus className="h-4 w-4 mr-2" />
                        New Notice
                    </Link>
                )}
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2">
                {['All', 'Urgent', 'Academic', 'Exam', 'Event', 'General'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === cat
                            ? 'bg-primary text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-10 dark:text-gray-400">Loading notices...</div>
            ) : notices.length === 0 ? (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">No notices found.</div>
            ) : (
                <div className="grid gap-6">
                    {notices.map((notice) => (
                        <div key={notice._id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${notice.category === 'Urgent' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                        notice.category === 'Exam' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                        }`}>
                                        {notice.category}
                                    </span>
                                    <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">{notice.title}</h3>
                                    {notice.targetDepartments && notice.targetDepartments.length > 0 && (
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {notice.targetDepartments.map(dept => (
                                                <span key={dept} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                    {dept}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col items-end">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {format(new Date(notice.createdAt), 'MMM d, yyyy')}
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <User className="h-4 w-4 mr-1" />
                                        {notice.author.name}
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{notice.content}</p>
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                                <Link href={`/dashboard/notices/${notice._id}`} className="text-primary hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                                    View Details & Comments →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
