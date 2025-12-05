'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, ArrowLeft, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Notice {
    _id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
    author: { name: string; role: string };
}

export default function NoticeDetailsPage() {
    const { user } = useAuth();
    const params = useParams();
    const router = useRouter();
    const [notice, setNotice] = useState<Notice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (params.id) {
            fetchNotice(params.id as string);
        }
    }, [params.id]);

    async function fetchNotice(id: string) {
        try {
            const res = await fetch(`/api/notices/${id}`);
            const data = await res.json();
            if (res.ok) {
                setNotice(data.notice);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to fetch notice details');
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        toast((t) => (
            <div className="flex flex-col gap-2">
                <span className="font-medium">Delete this notice?</span>
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
                                const res = await fetch(`/api/notices/${notice?._id}`, { method: 'DELETE' });
                                if (res.ok) {
                                    toast.success('Notice deleted');
                                    router.push('/dashboard/notices');
                                } else {
                                    toast.error('Failed to delete notice');
                                }
                            } catch (err) {
                                toast.error('Error deleting notice');
                            }
                        }}
                        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), { id: 'delete-notice-toast' });
    }

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
    if (!notice) return <div className="p-6 text-center">Notice not found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Notices
            </button>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${notice.category === 'Urgent' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                            notice.category === 'Exam' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}>
                            {notice.category}
                        </span>
                        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{notice.title}</h1>
                    </div>
                    {user?.role !== 'student' && (
                        <button onClick={handleDelete} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8 space-x-6 border-b border-gray-100 dark:border-gray-700 pb-6">
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {format(new Date(notice.createdAt), 'MMMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {notice.author.name} ({notice.author.role})
                    </div>
                </div>

                <div className="prose max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {notice.content}
                </div>
            </div>
        </div>
    );
}
