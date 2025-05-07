import { v2 as cloudinary } from 'cloudinary';
import serverConfig from './serverConfig.js';

// configuring cloudinary
console.log(serverConfig.CLOUDINARY_API_KEY);
cloudinary.config({
    cloud_name: serverConfig.CLOUDINARY_CLOUD_NAME,
    api_key: serverConfig.CLOUDINARY_API_KEY,
    api_secret: serverConfig.CLOUDINARY_API_SECRET
});

export default cloudinary;