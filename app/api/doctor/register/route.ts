import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Doctor from '@/models/Doctor';

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const { name, email, password, doctorId, specialization } = body;

        // Validate required fields
        if (!name || !email || !password || !doctorId) {
            return NextResponse.json(
                { message: 'All fields are required (name, email, password, doctorId)' },
                { status: 400 }
            );
        }

        // Check if doctor with this email already exists
        const existingDoctorByEmail = await Doctor.findOne({ email });
        if (existingDoctorByEmail) {
            return NextResponse.json(
                { message: 'Doctor with this email already exists' },
                { status: 409 }
            );
        }

        // Check if doctor with this doctorId already exists
        const existingDoctorById = await Doctor.findOne({ doctorId });
        if (existingDoctorById) {
            return NextResponse.json(
                { message: 'Doctor ID already registered' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new doctor
        const newDoctor = await Doctor.create({
            name,
            email,
            password: hashedPassword,
            doctorId,
            specialization: specialization || '',
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: newDoctor._id, role: 'doctor' },
            process.env.JWT_SECRET || 'fallback_secret_key_change_in_production',
            { expiresIn: '1d' }
        );

        return NextResponse.json(
            {
                message: 'Doctor registered successfully',
                token,
                user: {
                    id: newDoctor._id,
                    name: newDoctor.name,
                    email: newDoctor.email,
                    role: 'doctor',
                    specialization: newDoctor.specialization,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('[DOCTOR_REGISTER_ERROR] Full error details:', error);

        return NextResponse.json(
            {
                message: 'Registration failed',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
