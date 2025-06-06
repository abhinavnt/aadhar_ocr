import { injectable, inject } from "inversify";
import { IAadhaarRepository } from "../interfaces/IAadhaarRepository";
import { IAadhaarService } from "../interfaces/IAadhaarService";
import { IAadhaar } from "../interfaces/IAadhaar";
import { ocrImage } from "../utils/ocr.util";
import { parseAadhaarText } from "../utils/parser.util";

@injectable()
export class AadhaarService implements IAadhaarService {
  constructor(@inject("IAadhaarRepository") private aadhaarRepository: IAadhaarRepository) {}

  async processOCR(frontImage: Express.Multer.File, backImage: Express.Multer.File): Promise<IAadhaar> {
    console.log("reached the backend service");
    console.log(frontImage.path,"front image ",backImage.path);
    
    const frontText = await ocrImage(frontImage.path);
    const backText = await ocrImage(backImage.path);
    // console.log(frontText,"extracted front end image");
    // console.log("       ");
    // console.log("       ");
    // console.log("nextback side");
    // console.log("       ");
    // console.log("       ");
    // console.log(backText,"extracted backend end image");
    
    const extractedData = parseAadhaarText(frontText, backText);
    console.log(extractedData,"extracted data here");
    
    return this.aadhaarRepository.save(extractedData);
  }

  async getAadhaarDetails(aadhaarNumber: string, dateOfBirth: string): Promise<IAadhaar | null> {
    const aadhaar = await this.aadhaarRepository.findByAadhaarNumber(aadhaarNumber);
    if (aadhaar && aadhaar.dateOfBirth === dateOfBirth) {
      return aadhaar;
    }
    return null;
  }
}
