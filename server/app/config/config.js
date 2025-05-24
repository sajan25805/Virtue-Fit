import dotenv from "dotenv";


/**
 * Initialize environment variables
 */

dotenv.config();

 const config =  {

    port: process.env.PORT,
    mongodbURI:process.env.MONGODB_URI,
    jwtSecret:process.env.JWT_SECRET,
    nodeEnv:process.env.NODE_ENV,
    mailtrap: {
        endpoint: process.env.MAILTRAP_ENDPOINT,
        token: process.env.MAILTRAP_TOKEN
    },
    client_url:process.env.CLIENT_URL,
    cloudinary:{
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
    stripe:{
        webhookSecret:process.env.STRIPE_WEBHOOK_SECRET,
        stripeSecret:process.env.STRIPE_SECRET_KEY
    }
};


export default config;

