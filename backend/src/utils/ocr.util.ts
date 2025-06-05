import { createWorker, PSM, OEM } from 'tesseract.js';

export async function ocrImage(imagePath: string): Promise<string> {
  console.log("reached the ocrImage extract", imagePath);

  // Create the worker with language, OEM, and logger options
  const worker = await createWorker('eng', OEM.DEFAULT, {
    logger: (m: { status: string; progress: number }) => console.log(m),
  });

  try {
    // Set OCR parameters using type-safe enums
    await worker.setParameters({
      tessedit_ocr_engine_mode: OEM.DEFAULT,
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    });

    // Perform OCR on the image
    const { data: { text } } = await worker.recognize(imagePath);
    console.log("OCR result:", text);
    return text;
  } catch (error) {
    console.error("Error during OCR:", error);
    throw error;
  } finally {
    // Terminate the worker to free resources
    await worker.terminate();
  }
}