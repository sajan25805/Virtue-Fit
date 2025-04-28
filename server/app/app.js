import express from "express";
import { apiRoutes } from "./routes.js";
import errorHandler from "./middleware/errorhandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import {startWorkoutReminderCron} from "./utils/workoutReminderJob.js"
 

const app = express();



const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173" // your second frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

startWorkoutReminderCron();


app.use("/api",apiRoutes);



app.use(errorHandler);


export default app;



