"# aadhar_ocr" 


# Aadhaar OCR Backend

## Setup
1. Install dependencies: `npm install`
2. Install Tesseract OCR on your system.
3. Set up `.env` with `PORT` and `MONGODB_URI`.
4. Build: `npx tsc`
5. Run: `node dist/server.js`

## Endpoints
- **POST /api/aadhaar/ocr**: Upload front and back images for OCR processing.
- **GET /api/aadhaar/details**: Retrieve Aadhaar details by `aadhaarNumber` and `dateOfBirth`.

## Testing
- Use Postman to test `/api/aadhaar/ocr` with form-data (keys: `front`, `back`).
- Test `/api/aadhaar/details` with query params.











# Aadhaar OCR FrontEnd

# AadhaarScan Pro -  React TypeScript Application


## Features

- 🖼️ **Image Upload**: Drag & drop or click to upload Aadhaar card images (front and back)
- ✍️ **Manual Entry**: Alternative input method using Aadhaar number and date of birth
- 🔍 **OCR Processing**: Advanced text extraction from uploaded images
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Beautiful UI**: Modern, elegant design with smooth animations
- 🔒 **Secure**: Client-side processing with no permanent data storage
- ✅ **Validation**: Comprehensive input validation and error handling
- 📊 **Results Display**: Clean, organized presentation of extracted data

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **React Dropzone** for file uploads
- **VITE** for build tooling

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
\`\`\`

4. Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.



## Usage

### Image Upload Method

1. Select the "Upload Images" tab
2. Drag and drop or click to upload the front side of your Aadhaar card
3. Upload the back side of your Aadhaar card
4. Click "Process Aadhaar Card" to extract information

### Manual Entry Method

1. Select the "Manual Entry" tab
2. Fill in the required fields (Aadhaar number and date of birth)
3. Optionally add additional information
4. Click "Process Aadhaar Information"

## Security Features

- Input sanitization and validation
- File type and size restrictions
- Secure error handling

## Validation

- Aadhaar number validation using Verhoeff algorithm
- Date of birth validation
- Email and phone number format validation
- File type and size validation for uploads

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


