import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Event } from '@/lib/models';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const events = await Event.find().sort({ date: 1 });
        return NextResponse.json({ events });
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

        const event = await Event.create(body);

        return NextResponse.json({ event });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
