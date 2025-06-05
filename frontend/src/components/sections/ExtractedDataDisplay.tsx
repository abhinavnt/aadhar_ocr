import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  UserCheck,
  Loader2,
  Download,
  Copy,
  CheckCircle,
} from "lucide-react"
import type { AadhaarData } from "@/types/aadhar"

interface ExtractedDataDisplayProps {
  extractedData: AadhaarData | null
  isProcessing: boolean
}

export default function ExtractedDataDisplay({ extractedData, isProcessing }: ExtractedDataDisplayProps) {
  const [copied, setCopied] = React.useState<string | null>(null)

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(field)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadData = () => {
    if (!extractedData) return

    const dataStr = JSON.stringify(extractedData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `aadhaar_data_${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const DataField = ({
    icon: Icon,
    label,
    value,
    field,
  }: {
    icon: React.ElementType
    label: string
    value: string
    field: string
  }) => (
    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
      <Icon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
        <p className="text-base text-gray-900 break-words">{value}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => copyToClipboard(value, field)}
        className="flex-shrink-0 h-8 w-8 p-0"
      >
        {copied === field ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </Button>
    </div>
  )

  if (isProcessing) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Processing...</h3>
            <p className="text-gray-600">Extracting information from your Aadhaar card. This may take a few moments.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!extractedData) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">No Data Yet</h3>
            <p className="text-gray-600 max-w-sm mx-auto">
              Upload your Aadhaar card images or enter details manually to see the extracted information here.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              Extracted Data
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Information successfully extracted from Aadhaar card
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Verified
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <DataField icon={CreditCard} label="Aadhaar Number" value={extractedData.aadhaarNumber} field="aadhaar" />

          <DataField icon={User} label="Full Name" value={extractedData.name} field="name" />

          <DataField icon={Calendar} label="Date of Birth" value={extractedData.dateOfBirth} field="dob" />

          <DataField icon={UserCheck} label="Gender" value={extractedData.gender} field="gender" />

          {extractedData.fatherName && (
            <DataField icon={User} label="Father's Name" value={extractedData.fatherName} field="father" />
          )}

          <DataField icon={MapPin} label="Address" value={extractedData.address} field="address" />

          {extractedData.pincode && (
            <DataField icon={MapPin} label="PIN Code" value={extractedData.pincode} field="pincode" />
          )}

          {extractedData.phoneNumber && (
            <DataField icon={Phone} label="Phone Number" value={extractedData.phoneNumber} field="phone" />
          )}

          {extractedData.email && (
            <DataField icon={Mail} label="Email Address" value={extractedData.email} field="email" />
          )}
        </div>

        <Separator />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={downloadData} variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download JSON
          </Button>

          <Button
            onClick={() => copyToClipboard(JSON.stringify(extractedData, null, 2), "all")}
            variant="outline"
            className="flex-1"
          >
            {copied === "all" ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy All Data
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
