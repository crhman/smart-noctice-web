import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/lib/models';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSession();
        if (!session || session.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        await dbConnect();
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        return NextResponse.json({ users });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
