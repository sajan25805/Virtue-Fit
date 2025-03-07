import app from "./app.js";
import config from "./config/config.js";
import connectDB from "./connection.js";

const port = config.port ;

connectDB();

app.listen(8000,()=>{
    console.log(`Virtue Fit is listening at port: ${port}`)
});
