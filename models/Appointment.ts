import mongoose, { Schema, model, models, Document } from 'mongoose';

// Define TypeScript interface for Appointment
export interface IAppointment extends Document {
    patientId: string;
    patientName: string;
    doctorId?: string;
    doctorName?: string;
    healthIssue: string;
    customIssue?: string;
    date: string;
    timeSlot: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
    createdAt?: Date;
    updatedAt?: Date;
}

// Define schema
const appointmentSchema = new Schema<IAppointment>(
    {
        patientId: {
            type: String,
            required: true,
        },
        patientName: {
            type: String,
            required: true,
            trim: true,
        },
        doctorId: {
            type: String,
        },
        doctorName: {
            type: String,
            trim: true,
        },
        healthIssue: {
            type: String,
            required: true,
            trim: true,
        },
        customIssue: {
            type: String,
            trim: true,
        },
        date: {
            type: String,
            required: true,
        },
        timeSlot: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Scheduled', 'Completed', 'Cancelled'],
            default: 'Scheduled',
        },
    },
    {
        timestamps: true,
    }
);

// Use existing model if it exists to avoid OverwriteModelError
const Appointment = models.Appointment || model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;
