import multer from 'multer'
import cloudinary from 'cloudinary'

const {
  CLOUDINARY_NAME,
  CLOUDINARY_APY_KEY,
  CLOUDINARY_API_SECRET,
} = process.env

const memoryStorage = multer.memoryStorage()

export const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 500000, files: 1 },
})

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_APY_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

export const serviceCloudinary = cloudinary
