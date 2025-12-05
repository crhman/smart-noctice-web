import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Assignment } from '@/lib/models';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const assignment = await Assignment.findById(id).populate('author', 'name role');

        if (!assignment) {
            return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
        }

        return NextResponse.json({ assignment });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
