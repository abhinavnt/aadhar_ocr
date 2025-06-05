import { IAadhaar } from './IAadhaar';
import { IBaseRepository } from './IBaseRepository';

export interface IAadhaarRepository extends IBaseRepository<IAadhaar> {
  findByAadhaarNumber(aadhaarNumber: string): Promise<IAadhaar | null>;
}