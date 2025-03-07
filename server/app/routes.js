import { Router } from "express";
import { authRoutes } from "./routes/authRoute.js";





const router = Router();


router.use("/auth",authRoutes);
// router.use("/user")



router.get("/",(req,res)=>{
    return res.json({
        app: "Virtue Fit",
        message: ` \n ============================ \n VFW API \n ============================ `
    })
})

export const apiRoutes = router;
