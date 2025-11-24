import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Appointment from '@/models/Appointment';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { message: 'Patient ID is required' },
                { status: 400 }
            );
        }

        // Fetch all appointments for this patient
        const appointments = await Appointment.find({ patientId: id }).sort({ createdAt: -1 });

        return NextResponse.json(appointments, { status: 200 });
    } catch (error: any) {
        console.error('[GET_APPOINTMENTS_ERROR] Full error details:', error);
        return NextResponse.json(
            {
                message: 'Failed to fetch appointments',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
