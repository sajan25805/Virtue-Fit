import express from "express";
import { apiRoutes } from "./routes.js";
import errorHandler from "./middleware/errorhandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


const app = express();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}




app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api",apiRoutes);



app.use(errorHandler);


export default app;



