import { injectable } from 'inversify';
import { Aadhaar } from '../models/Aadhaar';
import { IAadhaar } from '../interfaces/IAadhaar';
import { IAadhaarRepository } from '../interfaces/IAadhaarRepository';

@injectable()
export class AadhaarRepository implements IAadhaarRepository {
  async findById(id: string): Promise<IAadhaar | null> {
    return Aadhaar.findById(id);
  }

  async findByAadhaarNumber(aadhaarNumber: string): Promise<IAadhaar | null> {
    return Aadhaar.findOne({ aadhaarNumber });
  }

  async save(aadhaar: IAadhaar): Promise<IAadhaar> {
    const existing = await this.findByAadhaarNumber(aadhaar.aadhaarNumber);
    if (existing) {
      throw new Error('Aadhaar number already exists');
    }
    const newAadhaar = new Aadhaar(aadhaar);
    return newAadhaar.save();
  }
}