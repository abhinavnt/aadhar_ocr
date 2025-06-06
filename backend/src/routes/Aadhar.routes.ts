import express from "express";
import multer from "multer";
import container from "../di/container";
import { AadhaarController } from "../controllers/AadhaarController";

const router = express();
const upload = multer({ dest: "uploads/" });

const aadhaarController = container.get<AadhaarController>("AadhaarController");

router.post(
  "/aadhaar/ocr",
  upload.fields([
    { name: "front", maxCount: 1 },
    { name: "back", maxCount: 1 },
  ]),
  aadhaarController.processOCR.bind(aadhaarController)
);

router.get("/aadhaar/details", aadhaarController.getAadhaarDetails.bind(aadhaarController));

export default router;
