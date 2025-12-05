import mongoose, { Schema, Model } from 'mongoose';

// --- User Model ---
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'teacher', 'student'], default: 'student' },
    studentId: { type: String }, // Optional, for students
    department: { type: String },
    year: { type: String }, // For students
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

// --- Notice Model ---
const NoticeSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
        type: String,
        enum: ['Urgent', 'Academic', 'Exam', 'Event', 'General'],
        default: 'General'
    },
    attachments: [{ type: String }], // URLs
    targetDepartments: [{ type: String }], // Array of department names
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scheduledFor: { type: Date },
}, { timestamps: true });

export const Notice = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);

// --- Assignment Model ---
const AssignmentSchema = new Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    attachments: [{ type: String }],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    submissions: [{
        student: { type: Schema.Types.ObjectId, ref: 'User' },
        fileUrl: { type: String },
        submittedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

export const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', AssignmentSchema);

// --- Event Model ---
const EventSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    category: { type: String, default: 'General' },
}, { timestamps: true });

export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

// --- Comment Model ---
const CommentSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    noticeId: { type: Schema.Types.ObjectId, ref: 'Notice', required: true },
}, { timestamps: true });

export const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
