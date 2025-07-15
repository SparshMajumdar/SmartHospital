import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import Patient from '@/models/Patient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, age, gender } = body;

    // Validate all required fields
    if (!name || !email || !password || !phone || !age || !gender) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Connect to DB
    await dbConnect();

    // Check for existing patient
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return NextResponse.json(
        { message: 'Patient already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new patient
    const newPatient = await Patient.create({
      name,
      email,
      password: hashedPassword,
      phone,
      age,
      gender,
    });

    // Respond with success
    return NextResponse.json(
      {
        message: 'Patient registered successfully',
        user: {
          id: newPatient._id,
          name: newPatient.name,
          email: newPatient.email,
          role: 'patient',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[PATIENT_REGISTER_ERROR]', error);
    return NextResponse.json(
      { message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
