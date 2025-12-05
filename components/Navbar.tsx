'use client';

import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { LogOut, Menu, User as UserIcon, Bell } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import toast from 'react-hot-toast';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        toast((t) => (
            <div className="flex flex-col gap-2">
                <span className="font-medium">Are you sure you want to logout?</span>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            logout();
                            toast.success('Logged out successfully');
                        }}
                        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        ), { duration: 5000, id: 'logout-confirmation' });
    };

    return (
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="bg-primary p-2 rounded-lg">
                                <Bell className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-primary">HU</span>
                        </Link>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        <ThemeToggle />
                        {user ? (
                            <>
                                <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                                    Dashboard
                                </Link>
                                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                    <UserIcon size={16} />
                                    <span>{user.name} ({user.role})</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-primary text-white hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="flex items-center sm:hidden space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="pt-2 pb-3 space-y-1">
                        {user ? (
                            <>
                                <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:text-red-900 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    Login
                                </Link>
                                <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
