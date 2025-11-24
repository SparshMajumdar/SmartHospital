import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Appointment from '@/models/Appointment';
import Doctor from '@/models/Doctor';

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const { patientId, patientName, healthIssue, customIssue, date, timeSlot } = body;

        // Validate required fields
        if (!patientId || !patientName || !healthIssue || !date || !timeSlot) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Find an available doctor (randomly select one for now)
        const doctors = await Doctor.find({});

        if (doctors.length === 0) {
            return NextResponse.json(
                { message: 'No doctors available at the moment' },
                { status: 404 }
            );
        }

        // Randomly assign a doctor
        const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];

        // Create appointment
        const appointment = await Appointment.create({
            patientId,
            patientName,
            doctorId: randomDoctor._id.toString(),
            doctorName: randomDoctor.name,
            healthIssue,
            customIssue: customIssue || '',
            date,
            timeSlot,
            status: 'Scheduled',
        });

        return NextResponse.json(
            {
                message: 'Appointment booked successfully',
                doctorName: randomDoctor.name,
                appointment,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('[APPOINTMENT_BOOKING_ERROR] Full error details:', error);
        return NextResponse.json(
            {
                message: 'Failed to book appointment',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
