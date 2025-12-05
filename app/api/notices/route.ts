import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Notice } from '@/lib/models';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const session = await getSession();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');

        let query: any = {};
        if (category && category !== 'All') {
            query.category = category;
        }

        // If user is a student, filter by department
        if (session && session.role === 'student') {
            const userDepartment = session.department;

            if (userDepartment) {
                query.$or = [
                    { targetDepartments: { $size: 0 } }, // Public notices (empty array)
                    { targetDepartments: { $exists: false } }, // Legacy notices
                    { targetDepartments: userDepartment } // Notices for their department
                ];
            } else {
                // Student has no department? Only show public notices
                query.$or = [
                    { targetDepartments: { $size: 0 } },
                    { targetDepartments: { $exists: false } }
                ];
            }
        }

        const notices = await Notice.find(query)
            .populate('author', 'name role')
            .sort({ createdAt: -1 });

        return NextResponse.json({ notices });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || session.role === 'student') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        await dbConnect();
        const body = await req.json();

        const notice = await Notice.create({
            ...body,
            author: session.id
        });

        return NextResponse.json({ notice });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
