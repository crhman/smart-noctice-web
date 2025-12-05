import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Notice } from '@/lib/models';
import { getSession } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const notice = await Notice.findById(id).populate('author', 'name role');
        if (!notice) {
            return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
        }
        return NextResponse.json({ notice });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();
        if (!session || session.role === 'student') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        await dbConnect();
        const { id } = await params;
        const notice = await Notice.findByIdAndDelete(id);
        if (!notice) {
            return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
