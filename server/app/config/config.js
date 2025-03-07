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
    client_url:process.env.CLIENT_URL

};


export default config;