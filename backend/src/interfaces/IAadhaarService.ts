import { IAadhaar } from './IAadhaar';

export interface IAadhaarService {
  processOCR(frontImage: Express.Multer.File, backImage: Express.Multer.File): Promise<IAadhaar>;
  getAadhaarDetails(aadhaarNumber: string, dateOfBirth: string): Promise<IAadhaar | null>;
}