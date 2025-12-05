'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, ArrowLeft, BookOpen, Upload } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Assignment {
    _id: string;
    title: string;
    subject: string;
    description: string;
    dueDate: string;
    author: { name: string; role: string };
    submissions: { student: string; fileUrl: string; submittedAt: string }[];
}

export default function AssignmentDetailsPage() {
    const { user } = useAuth();
    const params = useParams();
    const router = useRouter();
    const [assignment, setAssignment] = useState<Assignment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submissionLink, setSubmissionLink] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (params.id) {
            fetchAssignment(params.id as string);
        }
    }, [params.id]);

    async function fetchAssignment(id: string) {
        try {
            const res = await fetch(`/api/assignments/${id}`);
            const data = await res.json();
            if (res.ok) {
                setAssignment(data.assignment);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to fetch assignment details');
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmitWork(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`/api/assignments/${assignment?._id}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileUrl: submissionLink }),
            });
            if (res.ok) {
                toast.success('Assignment submitted successfully!');
                fetchAssignment(assignment!._id); // Refresh
            } else {
                toast.error('Failed to submit assignment');
            }
        } catch (err) {
            toast.error('Error submitting assignment');
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
    if (!assignment) return <div className="p-6 text-center">Assignment not found</div>;

    const mySubmission = assignment.submissions.find(sub => sub.student === user?._id);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Assignments
            </button>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                            {assignment.subject}
                        </span>
                        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{assignment.title}</h1>
                    </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8 space-x-6 border-b border-gray-100 dark:border-gray-700 pb-6">
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Due: {format(new Date(assignment.dueDate), 'MMMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {assignment.author.name}
                    </div>
                </div>

                <div className="prose max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-8">
                    {assignment.description}
                </div>

                {user?.role === 'student' && (
                    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Submission</h3>
                        {mySubmission ? (
                            <div className="text-green-600 dark:text-green-400 flex items-center">
                                <BookOpen className="h-5 w-5 mr-2" />
                                Submitted on {format(new Date(mySubmission.submittedAt), 'MMM d, yyyy h:mm a')}
                                <br />
                                Link: <a href={mySubmission.fileUrl} target="_blank" className="underline ml-2">{mySubmission.fileUrl}</a>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitWork} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Submission Link (Google Drive/Dropbox)</label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            type="url"
                                            required
                                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary focus:border-primary sm:text-sm"
                                            placeholder="https://..."
                                            value={submissionLink}
                                            onChange={(e) => setSubmissionLink(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-600 disabled:opacity-50"
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    {submitting ? 'Submitting...' : 'Submit Assignment'}
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
