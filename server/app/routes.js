import { Router } from "express";
import { authRoutes } from "./routes/authRoute.js";
import { mealRoute } from "./routes/mealRoute.js";
import { snackRoute } from "./routes/snackRoute.js";
import { meditationRoute } from "./routes/meditationRoute.js";





const router = Router();


router.use("/auth",authRoutes);
// router.use("/user")

router.use("/meal",mealRoute);

router.use("/snack",snackRoute);

router.use("/meditation",meditationRoute);



router.get("/",(req,res)=>{
    return res.json({
        app: "Virtue Fit",
        message: ` \n ============================ \n VFW API \n ============================ `
    })
})

export const apiRoutes = router;
