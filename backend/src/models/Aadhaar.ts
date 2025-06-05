import { Schema, model } from 'mongoose';
import { IAadhaar } from '../interfaces/IAadhaar';

const aadhaarSchema = new Schema<IAadhaar>({
  aadhaarNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  fatherName: { type: String },
  pincode: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
});

export const Aadhaar = model<IAadhaar>('Aadhaar', aadhaarSchema);