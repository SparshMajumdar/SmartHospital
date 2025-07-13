export interface Doctor {
  id: string;
  name: string;
  email: string;
  password: string;
  specialty: string;
  rfidTag: string;
  isPresent: boolean;
  lastAttendance?: Date;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
  password: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  healthIssue: string;
  customIssue?: string;
  timeSlot: string;
  date: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  createdAt: Date;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'patient';
}