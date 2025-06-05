export interface AadhaarData {
  aadhaarNumber: string
  name: string
  dateOfBirth: string
  gender: string
  address: string
  fatherName?: string
  pincode?: string
  phoneNumber?: string
  email?: string
}

export interface UploadedImage {
  file: File
  preview: string
}

export interface UploadedImages {
  front: UploadedImage | null
  back: UploadedImage | null
}
