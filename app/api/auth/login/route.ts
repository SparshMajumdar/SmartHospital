// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import Doctor from '@/models/Doctor';
import Patient from '@/models/Patient';

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    await dbConnect();

    let user;

    if (role === 'doctor') {
      user = await Doctor.findOne({ email });
    } else if (role === 'patient') {
      user = await Patient.findOne({ email });
    } else {
      return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // You can generate a JWT here if needed
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role
      }
    });
  } catch (error) {
    console.error('[LOGIN_ERROR]', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
