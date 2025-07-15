import mongoose, { Schema, model, models, Document } from 'mongoose';

// Define TypeScript interface for Doctor
export interface IDoctor extends Document {
  name: string;
  email: string;
  password: string;
  specialization?: string;
}

// Define schema
const doctorSchema = new Schema<IDoctor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Use existing model if it exists to avoid OverwriteModelError
const Doctor = models.Doctor || model<IDoctor>('Doctor', doctorSchema);

export default Doctor;
