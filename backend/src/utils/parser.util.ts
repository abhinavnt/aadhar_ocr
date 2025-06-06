import { IAadhaar } from '../interfaces/IAadhaar';

export function parseAadhaarText(frontText: string, backText: string): IAadhaar {
  const extractedData: IAadhaar = {
    aadhaarNumber: '',
    name: '',
    dateOfBirth: '',
    gender: 'MALE',
    address: '',
    fatherName: '',
    pincode: '',
    phoneNumber: 'Not Available', // Default value
    email: 'Not Available',       // Default value
  };

  // Extract Aadhaar Number: 12-digit number in format "XXXX XXXX XXXX"
  const aadhaarMatch = frontText.match(/\b\d{4}\s\d{4}\s\d{4}\b/);
  if (aadhaarMatch) {
    extractedData.aadhaarNumber = aadhaarMatch[0].replace(/\s/g, ''); // e.g., "344126576882"
  }

  // Extract Name: First occurrence of two capitalized words
  const nameMatch = frontText.match(/[A-Z][a-z]+\s[A-Z][a-z]+/);
  if (nameMatch) {
    extractedData.name = nameMatch[0]; // e.g., "Anogh Vinod"
  }

  // Extract Date of Birth: "Year of Birth: " followed by a 4-digit year
  const dobMatch = frontText.match(/(Year of Birth:)\s*(\d{4})/i);
  if (dobMatch) {
    extractedData.dateOfBirth = dobMatch[2]; // e.g., "2007"
  }

  // Extract Gender: "Male" or "Female"
  const genderMatch = frontText.match(/\b(Male|Female)\b/i);
  if (genderMatch) {
    extractedData.gender = genderMatch[0]; // e.g., "Male"
  }

  // Extract Father Name: "Father: " followed by a name
  const fatherNameMatch = frontText.match(/Father:\s*([A-Z][a-z]+)/i);
  if (fatherNameMatch) {
    extractedData.fatherName = fatherNameMatch[1]; // e.g., "Vinod"
  }

  // Extract Address and Pincode from backText
  const pincodeMatch = backText.match(/\b\d{6}\b/);
  if (pincodeMatch) {
    extractedData.pincode = pincodeMatch[0]; // e.g., "673506"
    // Address is everything before the pincode
    const pincodeIndex = backText.lastIndexOf(extractedData.pincode);
    const addressText = backText.substring(0, pincodeIndex).trim();
    // Extract the last few lines as the address (assuming multi-line OCR output)
    const addressLines = addressText.split('\n').slice(-3).join(', ').replace(/[^\w\s,]/g, '');
    extractedData.address = addressLines; // e.g., "VIA, Nadapuram, Chelakkad, Kozhikode, Kerala"
  }

  return extractedData;
}