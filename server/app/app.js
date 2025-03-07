import express from "express";
import { apiRoutes } from "./routes.js";
import errorHandler from "./middleware/errorhandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api",apiRoutes);



app.use(errorHandler);


export default app;



