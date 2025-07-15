import mongoose, { Schema, model, models, Document } from 'mongoose';

// Define TypeScript interface for Patient
export interface IPatient extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
}

// Define schema
const patientSchema = new Schema<IPatient>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Avoid model overwrite error
const Patient = models.Patient || model<IPatient>('Patient', patientSchema);

export default Patient;
