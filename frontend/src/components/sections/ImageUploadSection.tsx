import type React from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Upload, XCircle } from "lucide-react"
import type { UploadedImages } from "@/types/aadhar"

interface ImageUploadSectionProps {
  uploadedImages: UploadedImages
  onImageUpload: (side: "front" | "back", file: File) => void
  onOCRProcess: () => void
  onClear: () => void
  isProcessing: boolean
  error: string | null
}

export default function ImageUploadSection({
  uploadedImages,
  onImageUpload,
  onOCRProcess,
  onClear,
  isProcessing,
  error,
}: ImageUploadSectionProps) {
  const handleFileChange = (side: "front" | "back", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageUpload(side, file)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Front Image Upload */}
        <div className="space-y-2">
          <label htmlFor="front-image" className="block text-sm font-medium text-gray-700">
            Front Image
          </label>
          <input
            type="file"
            id="front-image"
            accept="image/*"
            onChange={(e) => handleFileChange("front", e)}
            className="hidden"
          />
          <Button asChild variant="outline" className="w-full justify-start">
            <label htmlFor="front-image" className="w-full cursor-pointer flex items-center justify-center space-x-2">
              {uploadedImages.front ? (
                <>
                  <XCircle className="w-4 h-4" />
                  <span>Change Image</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Front Image</span>
                </>
              )}
            </label>
          </Button>
          {uploadedImages.front && (
            <img
              src={uploadedImages.front.preview || "/placeholder.svg"}
              alt="Front Preview"
              className="rounded-md max-h-48 object-contain"
            />
          )}
        </div>

        {/* Back Image Upload */}
        <div className="space-y-2">
          <label htmlFor="back-image" className="block text-sm font-medium text-gray-700">
            Back Image
          </label>
          <input
            type="file"
            id="back-image"
            accept="image/*"
            onChange={(e) => handleFileChange("back", e)}
            className="hidden"
          />
          <Button asChild variant="outline" className="w-full justify-start">
            <label htmlFor="back-image" className="w-full cursor-pointer flex items-center justify-center space-x-2">
              {uploadedImages.back ? (
                <>
                  <XCircle className="w-4 h-4" />
                  <span>Change Image</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Back Image</span>
                </>
              )}
            </label>
          </Button>
          {uploadedImages.back && (
            <img
              src={uploadedImages.back.preview || "/placeholder.svg"}
              alt="Back Preview"
              className="rounded-md max-h-48 object-contain"
            />
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onOCRProcess}
          disabled={isProcessing || (!uploadedImages.front && !uploadedImages.back)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Process Images
            </>
          )}
        </Button>
        <Button variant="destructive" onClick={onClear} disabled={isProcessing}>
          Clear All
        </Button>
      </div>
    </div>
  )
}
