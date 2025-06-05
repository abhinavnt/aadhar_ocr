import { IAadhaar } from '../interfaces/IAadhaar';

export function parseAadhaarText(frontText: string, backText: string): IAadhaar {
  console.log("reached the aadhaar text");
  console.log(frontText, "front end text", backText, "back text");

  // Normalize the text (remove extra spaces, newlines, and special characters)
  const normalizeText = (text: string) => text
    .replace(/\s+/g, ' ')
    .replace(/[^a-zA-Z0-9\s\/:,-]/g, '')
    .trim();

  const normalizedFrontText = normalizeText(frontText);
  const normalizedBackText = normalizeText(backText);

  // Aadhaar number (with or without spaces)
  const aadhaarNumberMatch = normalizedFrontText.match(/\d{4}\s?\d{4}\s?\d{4}/) || normalizedBackText.match(/\d{4}\s?\d{4}\s?\d{4}/);
  
  // Name (match any string after "Name", "NAME", or similar)
  const nameMatch = normalizedFrontText.match(/(?:Name|NAME)\s*[:\-]?\s*([A-Za-z\s]+)/i);
  
  // DOB (match various date formats)
  const dobMatch = normalizedFrontText.match(/(?:DOB|Date\s*of\s*Birth|D\.O\.B\.)\s*[:\-]?\s*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i) ||
                   normalizedFrontText.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/); // Fallback for date-like strings
  
  // Gender
  const genderMatch = normalizedFrontText.match(/(?:Gender|GENDER)\s*[:\-]?\s*(Male|Female)/i);
  
  // Address (match everything after "Address" until the Aadhaar number or end of text)
  const addressMatch = normalizedBackText.match(/(?:Address|ADDRESS)\s*[:\-]?\s*([\s\S]+?)(?=\d{4}\s?\d{4}\s?\d{4}|$)/i);

  console.log("reached the end");
  console.log(aadhaarNumberMatch, "aadhaarNumberMatch");
  console.log(nameMatch, "name");
  console.log(dobMatch, "dobmatch");
  console.log(genderMatch, "gender match");
  console.log(addressMatch, "address match");

  // Instead of throwing an error, return partial data with defaults for missing fields
  const result: IAadhaar = {
    aadhaarNumber: aadhaarNumberMatch ? aadhaarNumberMatch[0].replace(/\s/g, '') : '',
    name: nameMatch ? nameMatch[1].trim() : '',
    dateOfBirth: dobMatch ? dobMatch[1] : '',
    gender: genderMatch ? genderMatch[1].toUpperCase() : '',
    address: addressMatch ? addressMatch[1].trim() : '',
  };

  // Log a warning if any field is missing
  if (!result.aadhaarNumber || !result.name || !result.dateOfBirth || !result.gender || !result.address) {
    console.warn("Some Aadhaar fields could not be extracted:", result);
  }

  return result;
}