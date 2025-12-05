'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import { Plus, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
    _id: string;
    title: string;
    date: string;
    description: string;
    category: string;
}

export default function EventsPage() {
    const { user } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        try {
            const res = await fetch('/api/events');
            const data = await res.json();
            setEvents(data.events || []);
        } catch (error) {
            console.error('Failed to fetch events', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events Calendar</h1>
                {user?.role !== 'student' && (
                    <Link href="/dashboard/events/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Event
                    </Link>
                )}
            </div>

            {loading ? (
                <div className="text-center py-10 dark:text-gray-400">Loading events...</div>
            ) : events.length === 0 ? (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">No upcoming events.</div>
            ) : (
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {events.map((event) => (
                            <li key={event._id}>
                                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-medium text-primary dark:text-blue-400 truncate">{event.title}</p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                {event.category}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                                {format(new Date(event.date), 'MMMM d, yyyy')}
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:ml-6">
                                                <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                                {format(new Date(event.date), 'h:mm a')}
                                            </p>
                                        </div>
                                    </div>
                                    {event.description && (
                                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                            {event.description}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
