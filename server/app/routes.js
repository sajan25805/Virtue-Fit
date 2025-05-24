import { Router } from "express";
import { authRoutes } from "./routes/authRoute.js";
import { mealRoute } from "./routes/mealRoute.js";
import { snackRoute } from "./routes/snackRoute.js";
import { meditationRoute } from "./routes/meditationRoute.js";
import { workoutRoute } from "./routes/workoutRoute.js";
import { trainerRoute } from "./routes/trainerRoute.js";
import stripeWebhookRoute from "./routes/stripeWebhookRoute.js"
import adminRoute from "./routes/adminRoute.js"
import notificationRoute from "./routes/notificationRoutes.js"
import workoutProgressRoute from "./routes/workoutProgressRoutes.js"
import programRoute from "./routes/programRoute.js"
import plannerRoute from "./routes/PlannerRoute.js"
const router = Router();


router.use("/stripe", stripeWebhookRoute);
router.use("/auth",authRoutes);
router.use("/admin",adminRoute);
router.use("/workouts",workoutRoute);
router.use("/programs",programRoute);
router.use("/trainers",trainerRoute);
router.use("/meals",mealRoute);
router.use("/snacks",snackRoute);
router.use("/meditations",meditationRoute);
router.use("/planners",plannerRoute);
router.use("/notifications",notificationRoute);
router.use("/workout-progress",workoutProgressRoute);






router.get("/",(req,res)=>{
    return res.json({
        app: "Virtue Fit",
        message: ` \n ============================ \n VFW API \n ============================ `
    })
})

export const apiRoutes = router;
