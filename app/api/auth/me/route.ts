import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { User } from '@/lib/models';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ user: null });
        }

        await dbConnect();
        const user = await User.findById(session.id).select('-password');

        return NextResponse.json({ user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
