const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "drvj2dzep", 
  api_key: "857954374671648",
  api_secret: "QLj2LWlNx-VU10IFOBs7UUONpdw",  
});

const uploadFile = async (localFile) => {
  try {
    if (!localFile) throw new Error("No file provided");

    const response = await cloudinary.uploader.upload(localFile, {
      resource_type: "image",
    });

    fs.unlinkSync(localFile); // Remove local file after upload
    return response;
  } catch (error) {
    if (fs.existsSync(localFile)) fs.unlinkSync(localFile); // Cleanup local file
    throw error;
  }
};

module.exports = uploadFile;
