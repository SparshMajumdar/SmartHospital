import mongoose, { Schema, model, models } from 'mongoose';

const patientSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  gender: String,
  phone: String,
});

const Patient = models.Patient || model('Patient', patientSchema);
export default Patient;
