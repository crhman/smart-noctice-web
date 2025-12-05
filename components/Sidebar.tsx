'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { LayoutDashboard, Bell, BookOpen, Calendar, User, Users, FileText } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuth();

    const links = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Notices', href: '/dashboard/notices', icon: Bell },
        { name: 'Assignments', href: '/dashboard/assignments', icon: BookOpen },
        { name: 'Events', href: '/dashboard/events', icon: Calendar },
        { name: 'Profile', href: '/dashboard/profile', icon: User },
    ];

    if (user?.role === 'admin') {
        links.push({ name: 'Manage Users', href: '/dashboard/users', icon: Users });
    }

    return (
        <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-[calc(100vh-6rem)] sticky top-24 transition-colors duration-300 rounded-xl shadow-sm ml-0 mt-6">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex-1 px-3 space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    isActive
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200',
                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
                                )}
                            >
                                <Icon
                                    className={clsx(
                                        isActive ? 'text-primary dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                                        'mr-3 flex-shrink-0 h-6 w-6'
                                    )}
                                />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
