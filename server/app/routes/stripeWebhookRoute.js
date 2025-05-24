// // import express from "express";
// // import {
// //   createStripeCheckoutSession,
// //   stripeWebhookHandler,
// //   setFreeSubscription
// // } from "../controllers/stripeController.js";
// // import bodyParser from "body-parser";

// // const router = express.Router();

// // // Webhook uses raw body
// // router.post(
// //   "/webhook",
// //   bodyParser.raw({ type: "application/json" }),
// //   stripeWebhookHandler
// // );

// // router.post("/create-checkout-session", createStripeCheckoutSession);

// // router.post("/set-free-subscription", setFreeSubscription);

// // export default router;


// // import express from "express";
// // import { createStripeCheckoutSession, setFreeSubscription, stripeWebhookHandler } from "../controllers/stripeController.js";

// // const router = express.Router();

// // router.post("/create-checkout-session", createStripeCheckoutSession);
// // router.post("/set-free-subscription", setFreeSubscription);
// // router.post("/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhookHandler); // Webhook needs raw body

// // export default router;


// import express from "express";
// import { createStripeCheckoutSession, setFreeSubscription, stripeWebhookHandler } from "../controllers/stripeController.js";

// const router = express.Router();

// // Stripe Checkout Session
// router.post("/create-checkout-session", createStripeCheckoutSession);

// // Free Subscription
// router.post("/set-free-subscription", setFreeSubscription);

// // Stripe Webhook - MUST use express.raw()
// router.post(
//   "/stripe/webhook",
//   express.raw({ type: "application/json" }), // Critical for webhook verification
//   stripeWebhookHandler
// );

// export default router;




import express from "express";
import {
  createStripeCheckoutSession,
  stripeWebhookHandler,
  setFreeSubscription,
} from "../controllers/stripeController.js";

const router = express.Router();

// ✅ Stripe Checkout session (Basic / Premium)
router.post("/create-checkout-session", createStripeCheckoutSession);

// ✅ Set Free plan directly (used when clicking Free plan)
router.post("set-free-subscription", setFreeSubscription);

// ✅ Stripe Webhook handler (must be raw body parsed in `app.js`)
router.post("webhook", stripeWebhookHandler);

export default router;
