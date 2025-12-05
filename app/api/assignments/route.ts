import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Assignment } from '@/lib/models';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const assignments = await Assignment.find()
            .populate('author', 'name role')
            .sort({ dueDate: 1 });

        return NextResponse.json({ assignments });
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

        const assignment = await Assignment.create({
            ...body,
            author: session.id
        });

        return NextResponse.json({ assignment });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
