import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import Patient from '@/models/Patient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, age, gender } = body;

    // Validate fields
    if (!name || !email || !password || !phone || !age || !gender) {
      return NextResponse.json(
        { message: 'All fields are required' },
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Connect to DB
    await dbConnect();

    // Check if user already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return NextResponse.json(
        { message: 'Patient already exists' },
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new patient
    const newPatient = await Patient.create({
      name,
      email,
      password: hashedPassword,
      phone,
      age: Number(age), // Ensure it's a number
      gender,
    });

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
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('[PATIENT_REGISTER_ERROR]', error?.message || error);

    return NextResponse.json(
      {
        message: 'Server error. Please try again later.',
        error: error?.message || 'Unknown error',
      },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
