import mongoose, { Schema, model, models } from 'mongoose';

const doctorSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  specialization: String,
});

const Doctor = models.Doctor || model('Doctor', doctorSchema);
export default Doctor;
