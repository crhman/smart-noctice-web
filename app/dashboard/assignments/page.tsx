'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import { Plus, Calendar, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

interface Assignment {
    _id: string;
    title: string;
    subject: string;
    dueDate: string;
    author: { name: string };
}

export default function AssignmentsPage() {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAssignments();
    }, []);

    async function fetchAssignments() {
        try {
            const res = await fetch('/api/assignments');
            const data = await res.json();
            setAssignments(data.assignments || []);
        } catch (error) {
            console.error('Failed to fetch assignments', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments</h1>
                {user?.role !== 'student' && (
                    <Link href="/dashboard/assignments/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-600">
                        <Plus className="h-4 w-4 mr-2" />
                        New Assignment
                    </Link>
                )}
            </div>

            {loading ? (
                <div className="text-center py-10 dark:text-gray-400">Loading assignments...</div>
            ) : assignments.length === 0 ? (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">No assignments found.</div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {assignments.map((assignment) => (
                        <div key={assignment._id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                    {assignment.subject}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Due: {format(new Date(assignment.dueDate), 'MMM d')}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{assignment.title}</h3>
                            <div className="mt-auto pt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    By {assignment.author.name}
                                </div>
                                <Link href={`/dashboard/assignments/${assignment._id}`} className="text-primary hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
