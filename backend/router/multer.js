const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../lib/cloudinary")

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profiles", // folder name in cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
})

// multer instance
const upload = multer({ storage })

module.exports = upload