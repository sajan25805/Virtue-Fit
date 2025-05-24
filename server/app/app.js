// // // // import express from "express";
// // // // import { apiRoutes } from "./routes.js";
// // // // import errorHandler from "./middleware/errorhandler.js";
// // // // import cookieParser from "cookie-parser";
// // // // import cors from "cors";
// // // // import { fileURLToPath } from 'url';
// // // // import path from 'path';
// // // // import fs from 'fs';
// // // // import {startWorkoutReminderCron} from "./utils/workoutReminderJob.js"
// // // // import bodyParser from "body-parser";
 

// // // // const app = express();



// // // // const allowedOrigins = [
// // // //   "http://localhost:5174",
// // // //   "http://localhost:5173" // your second frontend URL
// // // // ];

// // // // app.use(cors({
// // // //   origin: function (origin, callback) {
// // // //     if (!origin || allowedOrigins.includes(origin)) {
// // // //       callback(null, true);
// // // //     } else {
// // // //       callback(new Error('Not allowed by CORS'));
// // // //     }
// // // //   },
// // // //   credentials: true
// // // // }));

// // // // // ⚠️ Stripe requires the raw body for webhook verification
// // // // app.use("/api/stripe/webhook", bodyParser.raw({ type: "application/json" }));

// // app.use((req, res, next) => {
// //   if (req.originalUrl === "/api/stripe/webhook") {
// //     next(); // skip json bodyParser for webhook
// //   } else {
// //     express.json()(req, res, next);
// //   }
// // });


// // // // const __filename = fileURLToPath(import.meta.url);
// // // // const __dirname = path.dirname(__filename);



// // // // // Ensure uploads directory exists
// // // // const uploadsDir = path.join(__dirname, 'uploads');
// // // // if (!fs.existsSync(uploadsDir)) {
// // // //   fs.mkdirSync(uploadsDir, { recursive: true });
// // // // }




// // // // app.use(express.json());
// // // // app.use(express.urlencoded({ extended: true }));
// // // // app.use(cookieParser());

// // // // startWorkoutReminderCron();


// // // // app.use("/api",apiRoutes);



// // // // app.use(errorHandler);


// // // // export default app;






// // // import express from "express";
// // // import { apiRoutes } from "./routes.js";
// // // import errorHandler from "./middleware/errorhandler.js";
// // // import cookieParser from "cookie-parser";
// // // import cors from "cors";
// // // import { fileURLToPath } from "url";
// // // import path from "path";
// // // import fs from "fs";
// // // import { startWorkoutReminderCron } from "./utils/workoutReminderJob.js";
// // // import bodyParser from "body-parser";

// // // const app = express();
// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // // 1. Ensure uploads directory exists
// // // const uploadsDir = path.join(__dirname, "uploads");
// // // if (!fs.existsSync(uploadsDir)) {
// // //   fs.mkdirSync(uploadsDir, { recursive: true });
// // // }

// // // // 2. Set allowed frontend URLs
// // // const allowedOrigins = [
// // //   "http://localhost:5173",
// // //   "http://localhost:5174",
// // // ];

// // // // 3. Setup CORS before any routes
// // // app.use(cors({
// // //   origin: function (origin, callback) {
// // //     if (!origin || allowedOrigins.includes(origin)) {
// // //       callback(null, true);
// // //     } else {
// // //       callback(new Error("Not allowed by CORS"));
// // //     }
// // //   },
// // //   credentials: true,
// // //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// // // }));

// // // // 4 Raw body only for Stripe webhook
// // // app.use("/api/stripe/webhook", bodyParser.raw({ type: "application/json" }));

// // // // 5. Apply normal middlewares for everything else
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));
// // // app.use(cookieParser());

// // // // 6. Background tasks
// // // startWorkoutReminderCron();

// // // // 7. Mount main API routes
// // // app.use("/api", apiRoutes);

// // // // 8. Error handler
// // // app.use(errorHandler);

// // // export default app;


// // import express from "express";
// // import { apiRoutes } from "./routes.js";
// // import errorHandler from "./middleware/errorhandler.js";
// // import cookieParser from "cookie-parser";
// // import cors from "cors";
// // import { fileURLToPath } from 'url';
// // import path from 'path';
// // import fs from 'fs';
// // import { startWorkoutReminderCron } from "./utils/workoutReminderJob.js";
// // import bodyParser from "body-parser";

// // const app = express();

// // const allowedOrigins = [
// //   "http://localhost:5174",
// //   "http://localhost:5173"
// // ];

// // app.use(cors({
// //   origin: function (origin, callback) {
// //     if (!origin || allowedOrigins.includes(origin)) {
// //       callback(null, true);
// //     } else {
// //       callback(new Error('Not allowed by CORS'));
// //     }
// //   },
// //   credentials: true
// // }));

// // // ⚠️ Stripe webhook needs raw body ONLY for this route
// // app.post("/api/stripe/webhook", bodyParser.raw({ type: "application/json" }));

// // // ✅ Use express.json() AFTER webhook so others can use parsed body
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // Ensure uploads directory exists
// // const uploadsDir = path.join(__dirname, 'uploads');
// // if (!fs.existsSync(uploadsDir)) {
// //   fs.mkdirSync(uploadsDir, { recursive: true });
// // }

// // startWorkoutReminderCron();

// // // Mount all routes (excluding webhook which is already defined)
// // app.use("/api", apiRoutes);

// // // Global error handler
// // app.use(errorHandler);

// // export default app;


// import express from "express";
// import { apiRoutes } from "./routes.js";
// import errorHandler from "./middleware/errorhandler.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { fileURLToPath } from 'url';
// import path from 'path';
// import fs from 'fs';
// import { startWorkoutReminderCron } from "./utils/workoutReminderJob.js";

// const app = express();

// const allowedOrigins = [
//   "http://localhost:5174",
//   "http://localhost:5173"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// app.use((req, res, next) => {
//   if (req.originalUrl === "/api/stripe/webhook") {
//     next(); // skip json bodyParser for webhook
//   } else {
//     express.json()(req, res, next);
//   }
// });

// // Standard middleware for all other routes
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// startWorkoutReminderCron();

// // Mount all API routes (including the Stripe webhook)
// app.use("/api", apiRoutes);

// // Global error handler
// app.use(errorHandler);

// export default app;



import express from "express";
import { apiRoutes } from "./routes.js";
import errorHandler from "./middleware/errorhandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { startWorkoutReminderCron } from "./utils/workoutReminderJob.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "https://c12b-2400-1a00-b040-42ab-100b-5fa2-21e9-2b4f.ngrok-free.app"
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ⚠️ Stripe webhook raw body BEFORE body parser
import { stripeWebhookHandler } from "./controllers/stripeController.js";
import config from "./config/config.js";
import Stripe from "stripe";
const stripe = new Stripe(config.stripe.stripeSecret);
app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhookHandler);

// After webhook: normal parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// File handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Cron
startWorkoutReminderCron();

// Routes
app.use("/api", apiRoutes);

// Error middleware
app.use(errorHandler);

export default app;
