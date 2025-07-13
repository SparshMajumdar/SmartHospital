import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import Patient from '@/models/Patient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, age, gender } = body;

    if (!name || !email || !password || !phone || !age || !gender) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    await dbConnect();

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return NextResponse.json({ message: 'Patient already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = await Patient.create({
      name,
      email,
      password: hashedPassword,
      phone,
      age,
      gender,
    });

    return NextResponse.json({
      message: 'Patient registered successfully',
      patient: {
        id: newPatient._id,
        name: newPatient.name,
        email: newPatient.email,
      },
    });
  } catch (error) {
    console.error('[PATIENT_REGISTER_ERROR]', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
