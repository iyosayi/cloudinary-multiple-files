const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const upload = async (req) => {
  try {
    if (!req.files) {
      throw new Error("No file detected");
    }
    const files = req.files.map((item) => item.path);
    let arr = [];
    for (let i = 0; i < files.length; i++) {
      const { secure_url } = await cloudinary.uploader.upload(files[i]);
      arr.push(secure_url);
    }
    return arr;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { upload, cloudinary };
