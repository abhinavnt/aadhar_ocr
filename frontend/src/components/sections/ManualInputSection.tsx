import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, UserCheck } from "lucide-react"

interface ManualInputSectionProps {
  onSubmit: (aadhaarNumber: string, yearOfBirth: string) => void
  isProcessing: boolean
  error: string | null
}

export default function ManualInputSection({ onSubmit, isProcessing, error }: ManualInputSectionProps) {
  const [aadhaarNumber, setAadhaarNumber] = useState("")
  const [yearOfBirth, setYearOfBirth] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (aadhaarNumber && yearOfBirth) {
      onSubmit(aadhaarNumber, yearOfBirth)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="aadhaar">Aadhaar Number</Label>
          <Input
            id="aadhaar"
            type="text"
            placeholder="1234 5678 9012"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            maxLength={14}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year of Birth</Label>
          <Input
            id="year"
            type="text"
            placeholder="YYYY"
            value={yearOfBirth}
            onChange={(e) => setYearOfBirth(e.target.value)}
            maxLength={4}
            pattern="\d{4}"
          />
        </div>

        <Button
          type="submit"
          disabled={!aadhaarNumber || !yearOfBirth || isProcessing}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <UserCheck className="w-5 h-5 mr-2" />
              Submit Details
            </>
          )}
        </Button>
      </form>
    </div>
  )
}