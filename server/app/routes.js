import { Router } from "express";
import { authRoutes } from "./routes/authRoute.js";
import { mealRoute } from "./routes/mealRoute.js";
import { snackRoute } from "./routes/snackRoute.js";
import { meditationRoute } from "./routes/meditationRoute.js";
import { workoutRoute } from "./routes/workoutRoute.js";
import { trainerRoute } from "./routes/trainerRoute.js";




const router = Router();


router.use("/auth",authRoutes);
router.use("/workouts",workoutRoute);
router.use("/trainers",trainerRoute);
router.use("/meals",mealRoute);
router.use("/snacks",snackRoute);
router.use("/meditations",meditationRoute);



router.get("/",(req,res)=>{
    return res.json({
        app: "Virtue Fit",
        message: ` \n ============================ \n VFW API \n ============================ `
    })
})

export const apiRoutes = router;
