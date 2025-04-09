import { v2 as cloudinary } from 'cloudinary';
import config from './config.js';


cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
});


export const uploadToCloudinary = async (file, resourceType = 'auto') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: resourceType,
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
};

export default cloudinary;

