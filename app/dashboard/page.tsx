'use client';

import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import { Bell, BookOpen, Calendar } from 'lucide-react';

export default function DashboardPage() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {user.role === 'student'
                        ? `Student ID: ${user.studentId || 'N/A'} | ${user.department || 'N/A'}`
                        : `Role: ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Notices"
                    description="Check for new announcements"
                    icon={<Bell className="h-6 w-6 text-blue-500" />}
                    href="/dashboard/notices"
                    color="bg-blue-50 dark:bg-blue-900/20"
                />
                <DashboardCard
                    title="Assignments"
                    description="View pending tasks"
                    icon={<BookOpen className="h-6 w-6 text-green-500" />}
                    href="/dashboard/assignments"
                    color="bg-green-50 dark:bg-green-900/20"
                />
                <DashboardCard
                    title="Events"
                    description="Upcoming schedule"
                    icon={<Calendar className="h-6 w-6 text-purple-500" />}
                    href="/dashboard/events"
                    color="bg-purple-50 dark:bg-purple-900/20"
                />
            </div>

            {/* Placeholder for recent activity or stats */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    {user.role !== 'student' && (
                        <Link href="/dashboard/notices/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-600">
                            Post Notice
                        </Link>
                    )}
                    <Link href="/dashboard/profile" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

function DashboardCard({ title, description, icon, href, color }: any) {
    return (
        <Link href={href} className="block group">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-md transition-shadow transition-colors duration-300">
                <div className={`inline-flex p-3 rounded-lg ${color} mb-4`}>
                    {icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            </div>
        </Link>
    );
}
