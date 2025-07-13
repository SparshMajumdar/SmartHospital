// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import Doctor from '@/models/Doctor';
import Patient from '@/models/Patient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role, phone, age, gender } = body;

    if (!email || !password || !role || !name) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    const existingUser =
      role === 'doctor'
        ? await Doctor.findOne({ email })
        : await Patient.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    if (role === 'doctor') {
      newUser = await Doctor.create({
        name,
        email,
        password: hashedPassword,
      });
    } else if (role === 'patient') {
      if (!phone || !age || !gender) {
        return NextResponse.json({ message: 'Missing patient details' }, { status: 400 });
      }

      newUser = await Patient.create({
        name,
        email,
        password: hashedPassword,
        phone,
        age,
        gender,
      });
    } else {
      return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Registration successful',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role,
      },
    });
  } catch (error) {
    console.error('[REGISTER_ERROR]', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
