import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { IAadhaarService } from "../interfaces/IAadhaarService";

@injectable()
export class AadhaarController {
  constructor(@inject("IAadhaarService") private aadhaarService: IAadhaarService) {}

  async processOCR(req: Request, res: Response): Promise<void> {
    try {
      console.log("reached the backend controller");
      
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const frontImage = files["front"]?.[0];
      const backImage = files["back"]?.[0];
      if (!frontImage || !backImage) {
        throw new Error("Both front and back images are required");
      }
      const aadhaar = await this.aadhaarService.processOCR(frontImage, backImage);
      res.status(201).json(aadhaar);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAadhaarDetails(req: Request, res: Response): Promise<void> {
    try {
      const { aadhaarNumber, dateOfBirth } = req.query;
      if (!aadhaarNumber || !dateOfBirth) {
        throw new Error("Aadhaar number and date of birth are required");
      }
      const aadhaar = await this.aadhaarService.getAadhaarDetails(aadhaarNumber as string, dateOfBirth as string);
      if (aadhaar) {
        res.json(aadhaar);
      } else {
        res.status(404).json({ message: "Aadhaar details not found" });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
