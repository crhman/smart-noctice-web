import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { name, email, password, studentId, department, year } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Force role to be 'student'
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'student',
            studentId,
            department,
            year
        });

        const token = signToken({
            id: user._id,
            role: user.role,
            name: user.name,
            email: user.email,
            department: user.department
        });

        (await cookies()).set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return NextResponse.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                studentId: user.studentId,
                department: user.department,
                year: user.year
            }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
