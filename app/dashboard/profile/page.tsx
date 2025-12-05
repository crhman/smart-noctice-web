'use client';

import { useAuth } from '@/components/AuthProvider';

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Profile</h1>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">User Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Personal details and application role.</p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{user.name}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{user.email}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 capitalize">{user.role}</dd>
                        </div>
                        {user.role === 'student' && (
                            <>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Student ID</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{(user as any).studentId}</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{(user as any).department}</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Year</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{(user as any).year}</dd>
                                </div>
                            </>
                        )}
                    </dl>
                </div>
            </div>
        </div>
    );
}
