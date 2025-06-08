import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import type { AadhaarData, UploadedImages } from "@/types/aadhar"
import ImageUploadSection from "@/components/sections/ImageUploadSection"
import ManualInputSection from "@/components/sections/ManualInputSection"
import ExtractedDataDisplay from "@/components/sections/ExtractedDataDisplay"

export default function AadhaarOCRApp() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImages>({
    front: null,
    back: null,
  })

  const [extractedData, setExtractedData] = useState<AadhaarData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (side: "front" | "back", file: File) => {
    console.log("Image uploading for side:", side)
    console.log("File details:", file)

    const reader = new FileReader()

    reader.onload = (e) => {
      const result = e.target?.result
      if (result && typeof result === "string") {
        console.log("FileReader success, preview length:", result.length)
        setUploadedImages((prev) => {
          const updated = {
            ...prev,
            [side]: { file, preview: result },
          }
          console.log("Updated uploadedImages:", updated)
          return updated
        })
      } else {
        console.error("FileReader failed to read file")
        setError("Failed to read the image file. Please try again.")
      }
    }

    reader.onerror = (error) => {
      console.error("FileReader error:", error)
      setError("Error reading the image file. Please try again.")
    }

    // Clear any previous errors
    setError(null)

    // Read the file as data URL
    reader.readAsDataURL(file)
  }

  const handleManualSubmit = async (aadhaarNumber: string, dateOfBirth: string) => {
    setIsProcessing(true)
    setError(null)

    try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/aadhaar/details?aadhaarNumber=${encodeURIComponent(aadhaarNumber)}&dateOfBirth=${encodeURIComponent(dateOfBirth)}`
    );

    if (!response.ok) {
      throw new Error('Failed to retrieve Aadhaar details');
    }

    const data: AadhaarData = await response.json();
    setExtractedData(data);
  } catch (err) {
    setError("Failed to process manual input. Please try again.");
  } finally {
    setIsProcessing(false);
  }
  }

  const handleOCRProcess = async () => {
    if (!uploadedImages.front && !uploadedImages.back) {
      setError("Please upload at least one image to process.")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Simulate OCR API call
      const formData = new FormData();
      if (!uploadedImages.front || !uploadedImages.back) {
        return null
      }
      formData.append('front', uploadedImages.front.file);
      formData.append('back', uploadedImages.back.file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/aadhaar/ocr`, {
        method: 'POST',
        body: formData,
      });
      console.log(response,"response from the api call");
      

      if (!response.ok) {
        throw new Error('OCR processing failed');
      }

      const data: AadhaarData = await response.json();

      setExtractedData(data)
    } catch (err) {
      setError("OCR processing failed. Please try again with clearer images.")
    } finally {
      setIsProcessing(false)
    }
  }

  const clearAll = () => {
    setUploadedImages({ front: null, back: null })
    setExtractedData(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Aadhaar OCR System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Extract information from your Aadhaar card using advanced OCR technology or enter details manually
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input Methods */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-800">Choose Input Method</CardTitle>
                <CardDescription className="text-gray-600">
                  Upload Aadhaar images or enter details manually
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="upload" className="text-sm font-medium">
                      Upload Images
                    </TabsTrigger>
                    <TabsTrigger value="manual" className="text-sm font-medium">
                      Manual Entry
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="space-y-6">
                    <ImageUploadSection
                      uploadedImages={uploadedImages}
                      onImageUpload={handleImageUpload}
                      onOCRProcess={handleOCRProcess}
                      onClear={clearAll}
                      isProcessing={isProcessing}
                      error={error}
                    />
                  </TabsContent>

                  <TabsContent value="manual" className="space-y-6">
                    <ManualInputSection onSubmit={handleManualSubmit} isProcessing={isProcessing} error={error} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <ExtractedDataDisplay extractedData={extractedData} isProcessing={isProcessing} />
          </div>
        </div>
      </div>
    </div>
  )
}
