'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'student';
    studentId?: string;
    department?: string;
    year?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: any) => Promise<void>;
    logout: () => Promise<void>;
    register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => { },
    logout: async () => { },
    register: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (data.user) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function login(credentials: any) {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setUser(data.user);
        router.push('/dashboard');
    }

    async function register(userData: any) {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setUser(data.user);
        router.push('/dashboard');
    }

    async function logout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
        router.push('/login');
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
