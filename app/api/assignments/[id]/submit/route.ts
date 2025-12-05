import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Assignment } from '@/lib/models';
import { getSession } from '@/lib/auth';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'student') {
            return NextResponse.json({ error: 'Only students can submit assignments' }, { status: 403 });
        }

        await dbConnect();
        const { fileUrl } = await req.json();
        const { id } = await params;

        const assignment = await Assignment.findById(id);
        if (!assignment) {
            return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
        }

        // Check if already submitted
        const existingSubmission = assignment.submissions.find(
            (sub: any) => sub.student.toString() === session.id
        );

        if (existingSubmission) {
            existingSubmission.fileUrl = fileUrl;
            existingSubmission.submittedAt = new Date();
        } else {
            assignment.submissions.push({
                student: session.id,
                fileUrl,
                submittedAt: new Date()
            });
        }

        await assignment.save();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
