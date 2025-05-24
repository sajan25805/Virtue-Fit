// // // import Stripe from "stripe";
// // // import { User } from "../models/User.js";
// // // import config from "../config/config.js";

// // // const stripe = new Stripe(config.stripe.stripeSecret);

// // // export const createStripeCheckoutSession = async (req, res) => {
// // //   try {
// // //     const { userId, priceId } = req.body;

// // //     const user = await User.findById(userId);
// // //     if (!user) return res.status(404).json({ message: "User not found" });

// // //     const customer = await stripe.customers.create({
// // //       email: user.email,
// // //       metadata: { userId: user._id.toString() }
// // //     });

// // //     const session = await stripe.checkout.sessions.create({
// // //       customer: customer.id,
// // //       payment_method_types: ['card'],
// // //       line_items: [
// // //         {
// // //           price: priceId,
// // //           quantity: 1,
// // //         },
// // //       ],
// // //       mode: "subscription",
// // //       success_url: `${config.client_url}/subscription-success`,
// // //       cancel_url: `${config.client_url}/subscription-cancel`,
// // //     });

// // //     res.json({ sessionId: session.id });
// // //   } catch (error) {
// // //     console.error("Stripe session error", error);
// // //     res.status(500).json({ message: "Failed to create checkout session" });
// // //   }
// // // };

// // // export const setFreeSubscription = async (req, res) => {
// // //   try {
// // //     const { userId } = req.body;
// // //     await User.findByIdAndUpdate(userId, {
// // //       subscription: "Free",
// // //       subscriptionDetails: {
// // //         plan: "Free",
// // //         status: "active",
// // //         stripeCustomerId: null,
// // //         stripeSubscriptionId: null,
// // //         priceId: null,
// // //         currentPeriodStart: new Date(),
// // //         currentPeriodEnd: null,
// // //         cancelAtPeriodEnd: false,
// // //       },
// // //     });
// // //     res.json({ message: "User subscribed to Free plan" });
// // //   } catch (err) {
// // //     res.status(500).json({ message: "Failed to set Free plan" });
// // //   }
// // // };

// // // export const stripeWebhookHandler = async (req, res) => {
// // //   const sig = req.headers["stripe-signature"];
// // //   let event;

// // //   try {
// // //     event = stripe.webhooks.constructEvent(
// // //       req.rawBody,
// // //       sig,
// // //       config.stripe.webhookSecret
// // //     );
// // //   } catch (err) {
// // //     return res.status(400).send(`Webhook error: ${err.message}`);
// // //   }

// // //   if (event.type === "checkout.session.completed") {
// // //     const session = event.data.object;
// // //     const customer = await stripe.customers.retrieve(session.customer);
// // //     const userId = customer.metadata.userId;

// // //     const subscription = await stripe.subscriptions.retrieve(session.subscription);
// // //     const priceId = subscription.items.data[0].price.id;
// // //     const planName = priceId === "price_1RRyZVPCaa4i7sFWJFzwmJlz" ? "Premium" : "Basic";

// // //     await User.findByIdAndUpdate(userId, {
// // //       subscription: planName,
// // //       subscriptionDetails: {
// // //         plan: planName,
// // //         stripeCustomerId: session.customer,
// // //         stripeSubscriptionId: subscription.id,
// // //         priceId,
// // //         status: subscription.status,
// // //         currentPeriodStart: new Date(subscription.current_period_start * 1000),
// // //         currentPeriodEnd: new Date(subscription.current_period_end * 1000),
// // //         cancelAtPeriodEnd: subscription.cancel_at_period_end,
// // //       },
// // //     });
// // //   }

// // //   res.sendStatus(200);
// // // };




// // import Stripe from "stripe";
// // import { User } from "../models/User.js";
// // import config from "../config/config.js";

// // const stripe = new Stripe(config.stripe.stripeSecret);

// // // Create Stripe Checkout Session for paid plans
// // export const createStripeCheckoutSession = async (req, res) => {
// //   try {
// //     const { userId, priceId } = req.body;

// //     const user = await User.findById(userId);
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     const customer = await stripe.customers.create({
// //       email: user.email,
// //       metadata: { userId: user._id.toString() },
// //     });

// //     const session = await stripe.checkout.sessions.create({
// //       customer: customer.id,
// //       payment_method_types: ["card"],
// //       line_items: [
// //         {
// //           price: priceId,
// //           quantity: 1,
// //         },
// //       ],
// //       mode: "subscription",
// //       success_url: `${config.client_url}/subscription-success`,
// //       cancel_url: `${config.client_url}/subscription-cancel`,
// //     });

// //     res.json({ url: session.url });
// //   } catch (error) {
// //     console.error("Stripe session error", error);
// //     res.status(500).json({ message: "Failed to create checkout session" });
// //   }
// // };

// // // Handle Free Plan
// // export const setFreeSubscription = async (req, res) => {
// //   try {
// //     const { userId } = req.body;
// //     await User.findByIdAndUpdate(userId, {
// //       subscription: "Free",
// //       subscriptionDetails: {
// //         plan: "Free",
// //         status: "active",
// //         stripeCustomerId: null,
// //         stripeSubscriptionId: null,
// //         priceId: null,
// //         currentPeriodStart: new Date(),
// //         currentPeriodEnd: null,
// //         cancelAtPeriodEnd: false,
// //       },
// //     });
// //     res.json({ message: "User subscribed to Free plan" });
// //   } catch (err) {
// //     console.error("Free plan error", err);
// //     res.status(500).json({ message: "Failed to set Free plan" });
// //   }
// // };

// // // // Stripe webhook
// // // export const stripeWebhookHandler = async (req, res) => {
// // //   const sig = req.headers["stripe-signature"];
// // //   let event;

// // //   try {
// // //     event = stripe.webhooks.constructEvent(
// // //       req.rawBody,
// // //       sig,
// // //       config.stripe.webhookSecret
// // //     );
// // //   } catch (err) {
// // //     return res.status(400).send(`Webhook error: ${err.message}`);
// // //   }

// // //   if (event.type === "checkout.session.completed") {
// // //     const session = event.data.object;
// // //     const customer = await stripe.customers.retrieve(session.customer);
// // //     const userId = customer.metadata.userId;

// // //     const subscription = await stripe.subscriptions.retrieve(session.subscription);
// // //     const priceId = subscription.items.data[0].price.id;
// // //     const planName =
// // //       priceId === "price_1RRyZVPCaa4i7sFWJFzwmJlz" ? "Premium" : "Basic";

// // //     await User.findByIdAndUpdate(userId, {
// // //       subscription: planName,
// // //       subscriptionDetails: {
// // //         plan: planName,
// // //         stripeCustomerId: session.customer,
// // //         stripeSubscriptionId: subscription.id,
// // //         priceId,
// // //         status: subscription.status,
// // //         currentPeriodStart: new Date(subscription.current_period_start * 1000),
// // //         currentPeriodEnd: new Date(subscription.current_period_end * 1000),
// // //         cancelAtPeriodEnd: subscription.cancel_at_period_end,
// // //       },
// // //     });
// // //   }

// // //   res.sendStatus(200);
// // // };


// // // export const stripeWebhookHandler = async (req, res) => {
// // //   const sig = req.headers["stripe-signature"];
// // //   let event;

// // //   try {
// // //     event = stripe.webhooks.constructEvent(
// // //       req.body, // we now use req.body instead of req.rawBody due to bodyParser.raw
// // //       sig,
// // //       config.stripe.webhookSecret
// // //     );
// // //     console.log("✅ Webhook received:", event.type);
// // //   } catch (err) {
// // //     console.error("❌ Webhook error:", err.message);
// // //     return res.status(400).send(`Webhook error: ${err.message}`);
// // //   }

// // //   if (event.type === "checkout.session.completed") {
// // //     try {
// // //       const session = event.data.object;
// // //       const customer = await stripe.customers.retrieve(session.customer);
// // //       const userId = customer.metadata.userId;

// // //       const subscription = await stripe.subscriptions.retrieve(session.subscription);
// // //       const priceId = subscription.items.data[0].price.id;
// // //       const planName = priceId === "price_1RRyZVPCaa4i7sFWJFzwmJlz" ? "Premium" : "Basic";

// // //       await User.findByIdAndUpdate(userId, {
// // //         subscription: planName,
// // //         subscriptionDetails: {
// // //           plan: planName,
// // //           stripeCustomerId: session.customer,
// // //           stripeSubscriptionId: subscription.id,
// // //           priceId,
// // //           status: subscription.status,
// // //           currentPeriodStart: new Date(subscription.current_period_start * 1000),
// // //           currentPeriodEnd: new Date(subscription.current_period_end * 1000),
// // //           cancelAtPeriodEnd: subscription.cancel_at_period_end,
// // //         },
// // //       });

// // //       console.log(`✅ Updated user ${userId} to ${planName}`);
// // //     } catch (err) {
// // //       console.error("❌ Failed to update user on webhook:", err.message);
// // //     }
// // //   }

// // //   res.sendStatus(200);
// // // };


// // // export const stripeWebhookHandler = async (req, res) => {
// // //   const sig = req.headers["stripe-signature"];
// // //   let event;

// // //   console.log("Sajan");

// // //   try {
// // //     event = stripe.webhooks.constructEvent(
// // //       req.rawBody,
// // //       sig,
// // //       config.stripe.webhookSecret
// // //     );
// // //   } catch (err) {
// // //     console.error("❌ Stripe webhook signature verification failed:", err.message);
// // //     return res.status(400).send(`Webhook Error: ${err.message}`);
// // //   }

// // //   console.log("✅ Stripe event received:", event.type);

// // //   if (event.type === "checkout.session.completed") {
// // //     console.log("✅ Checkout session completed.");
// // //     // Optional: Add logic if needed
// // //   }

// // //   // ✅ Add this: Handle payment confirmation
// // //   if (event.type === "invoice.paid") {
// // //     const invoice = event.data.object;
// // //     const subscriptionId = invoice.subscription;

// // //     try {
// // //       const subscription = await stripe.subscriptions.retrieve(subscriptionId);
// // //       const customer = await stripe.customers.retrieve(subscription.customer);
// // //       const userId = customer.metadata.userId;

// // //       const priceId = subscription.items.data[0].price.id;
// // //       const planName = priceId === "price_1RRyZVPCaa4i7sFWJFzwmJlz" ? "Premium" : "Basic";

// // //       await User.findByIdAndUpdate(userId, {
// // //         subscription: planName,
// // //         subscriptionDetails: {
// // //           plan: planName,
// // //           stripeCustomerId: subscription.customer,
// // //           stripeSubscriptionId: subscription.id,
// // //           priceId,
// // //           status: subscription.status,
// // //           currentPeriodStart: new Date(subscription.current_period_start * 1000),
// // //           currentPeriodEnd: new Date(subscription.current_period_end * 1000),
// // //           cancelAtPeriodEnd: subscription.cancel_at_period_end,
// // //         },
// // //       });

// // //       console.log(`✅ User ${userId} updated to plan: ${planName}`);
// // //     } catch (err) {
// // //       console.error("❌ Failed to update user after invoice paid:", err.message);
// // //     }
// // //   }

// // //   res.sendStatus(200);
// // // };


// // // export const stripeWebhookHandler = async (req, res) => {
// // //   const sig = req.headers["stripe-signature"];
// // //   let event;

// // //   console.log("Sajan Raj Mainali");
  
// // //   try {
// // //     event = stripe.webhooks.constructEvent(
// // //       req.rawBody,
// // //       sig,
// // //       config.stripe.webhookSecret
// // //     );
// // //   } catch (err) {
// // //     console.error("❌ Webhook signature failed:", err.message);
// // //     return res.status(400).send(`Webhook error: ${err.message}`);
// // //   }

// // //   console.log("✅ Stripe webhook event received:", event.type);

// // //   try {
// // //     if (event.type === "checkout.session.completed") {
// // //       const session = event.data.object;
// // //       const customer = await stripe.customers.retrieve(session.customer);
// // //       const userId = customer.metadata.userId;
// // //       console.log("✅ checkout.session.completed for user:", userId);
// // //       // Optionally log session
// // //     }

// // //     if (event.type === "invoice.paid") {
// // //       const invoice = event.data.object;
// // //       const subscriptionId = invoice.subscription;

// // //       const subscription = await stripe.subscriptions.retrieve(subscriptionId);
// // //       const customer = await stripe.customers.retrieve(subscription.customer);
// // //       const userId = customer.metadata.userId;

// // //       const priceId = subscription.items.data[0].price.id;
// // //       const planName = priceId === "price_1RRyZVPCaa4i7sFWJFzwmJlz" ? "Premium" : "Basic";

// // //       await User.findByIdAndUpdate(userId, {
// // //         subscription: planName,
// // //         subscriptionDetails: {
// // //           plan: planName,
// // //           stripeCustomerId: subscription.customer,
// // //           stripeSubscriptionId: subscription.id,
// // //           priceId,
// // //           status: subscription.status,
// // //           currentPeriodStart: new Date(subscription.current_period_start * 1000),
// // //           currentPeriodEnd: new Date(subscription.current_period_end * 1000),
// // //           cancelAtPeriodEnd: subscription.cancel_at_period_end,
// // //         },
// // //       });

// // //       console.log(`✅ User ${userId} subscription updated to ${planName}`);
// // //     }

// // //     res.status(200).send("Webhook handled");
// // //   } catch (err) {
// // //     console.error("❌ Error processing webhook:", err.message);
// // //     console.error(err.stack);
// // //     res.status(500).json({ message: "Webhook handler failed", error: err.message });
// // //   }
// // // };



// // export const stripeWebhookHandler = async (req, res) => {
// //   const sig = req.headers["stripe-signature"];
// //   let event;

// //   console.log("🔔 Webhook received - processing...");

// //   try {
// //     event = stripe.webhooks.constructEvent(
// //       req.rawBody,
// //       sig,
// //       config.stripe.webhookSecret
// //     );
// //     console.log(`✅ Webhook verified: ${event.type}`);
// //   } catch (err) {
// //     console.error(`❌ Webhook signature verification failed: ${err.message}`);
// //     return res.status(400).send(`Webhook Error: ${err.message}`);
// //   }

// //   try {
// //     // Handle checkout.session.completed event
// //     if (event.type === "checkout.session.completed") {
// //       const session = event.data.object;
// //       console.log("💰 Checkout session completed:", session.id);

// //       // Retrieve the customer and user ID
// //       const customer = await stripe.customers.retrieve(session.customer);
// //       const userId = customer.metadata.userId;
      
// //       if (!userId) {
// //         console.error("❌ No user ID found in customer metadata");
// //         return res.status(400).json({ error: "No user ID in metadata" });
// //       }

// //       // Update user with initial subscription details
// //       const updateData = {
// //         subscriptionDetails: {
// //           stripeCustomerId: session.customer,
// //           status: "pending",
// //           plan: session.amount_total === 9.99 ? "Basic" : "Premium", // Example price check
// //         }
// //       };

// //       const updatedUser = await User.findByIdAndUpdate(
// //         userId,
// //         updateData,
// //         { new: true }
// //       );

// //       if (!updatedUser) {
// //         console.error(`❌ User not found: ${userId}`);
// //         return res.status(404).json({ error: "User not found" });
// //       }

// //       console.log(`🔄 User ${userId} updated with pending subscription`);
// //     }

// //     // Handle successful payment and active subscription
// //     if (event.type === "invoice.paid") {
// //       const invoice = event.data.object;
// //       console.log("💳 Invoice paid:", invoice.id);

// //       const subscriptionId = invoice.subscription;
// //       const subscription = await stripe.subscriptions.retrieve(subscriptionId);
// //       const customer = await stripe.customers.retrieve(subscription.customer);
// //       const userId = customer.metadata.userId;

// //       if (!userId) {
// //         console.error("❌ No user ID found in customer metadata");
// //         return res.status(400).json({ error: "No user ID in metadata" });
// //       }

// //       // Determine plan based on price ID
// //       const priceId = subscription.items.data[0].price.id;
// //       const planName = 
// //         priceId === "price_1RRyYOPCaa4i7sFWcTNKcd1B" ? "Basic" :
// //         priceId === "price_1RRyZVPCaa4i7sFWJFzwmJlz" ? "Premium" : "Unknown";

// //       if (planName === "Unknown") {
// //         console.error(`❌ Unknown price ID: ${priceId}`);
// //         return res.status(400).json({ error: "Unknown price ID" });
// //       }

// //       // Prepare subscription update
// //       const subscriptionUpdate = {
// //         subscription: planName,
// //         subscriptionDetails: {
// //           plan: planName,
// //           stripeCustomerId: subscription.customer,
// //           stripeSubscriptionId: subscription.id,
// //           priceId: priceId,
// //           status: subscription.status,
// //           currentPeriodStart: new Date(subscription.current_period_start * 1000),
// //           currentPeriodEnd: new Date(subscription.current_period_end * 1000),
// //           cancelAtPeriodEnd: subscription.cancel_at_period_end,
// //         }
// //       };

// //       // Log the update being attempted
// //       console.log(`🔄 Attempting to update user ${userId} with:`, JSON.stringify(subscriptionUpdate, null, 2));

// //       // Update user in database
// //       const updatedUser = await User.findByIdAndUpdate(
// //         userId,
// //         subscriptionUpdate,
// //         { new: true, runValidators: true }
// //       );

// //       if (!updatedUser) {
// //         console.error(`❌ User update failed for: ${userId}`);
// //         return res.status(404).json({ error: "User update failed" });
// //       }

// //       console.log(`✅ Successfully updated subscription for user ${userId} to ${planName}`);
// //     }

// //     // Handle subscription cancellation or failure
// //     if (event.type === "customer.subscription.deleted") {
// //       const subscription = event.data.object;
// //       const customer = await stripe.customers.retrieve(subscription.customer);
// //       const userId = customer.metadata.userId;

// //       if (userId) {
// //         await User.findByIdAndUpdate(userId, {
// //           subscription: "Free",
// //           subscriptionDetails: {
// //             status: "canceled",
// //             cancelAtPeriodEnd: false,
// //             currentPeriodEnd: null
// //           }
// //         });
// //         console.log(`🔄 User ${userId} subscription set to Free after cancellation`);
// //       }
// //     }

// //     res.status(200).json({ received: true });
// //   } catch (err) {
// //     console.error("❌ Webhook processing error:");
// //     console.error(err);
    
// //     // Detailed error logging
// //     if (err instanceof mongoose.Error.ValidationError) {
// //       console.error("Mongoose validation errors:", err.errors);
// //     }
// //     if (err instanceof mongoose.Error) {
// //       console.error("Mongoose error details:", err);
// //     }

// //     res.status(500).json({
// //       error: "Webhook handler failed",
// //       message: err.message,
// //       ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
// //     });
// //   }
// // };


// import Stripe from "stripe";
// import { User } from "../models/User.js";
// import config from "../config/config.js";

// const stripe = new Stripe(config.stripe.stripeSecret);

// export const createStripeCheckoutSession = async (req, res) => {
//   try {
//     const { userId, priceId } = req.body;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const customer = await stripe.customers.create({
//       email: user.email,
//       metadata: { userId: user._id.toString() },
//     });

//     const session = await stripe.checkout.sessions.create({
//       customer: customer.id,
//       payment_method_types: ["card"],
//       line_items: [{ price: priceId, quantity: 1 }],
//       mode: "subscription",
//       success_url: `${config.client_url}/subscription-success`,
//       cancel_url: `${config.client_url}/subscription-cancel`,
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error("Stripe session error", error);
//     res.status(500).json({ message: "Failed to create checkout session" });
//   }
// };

// export const setFreeSubscription = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     await User.findByIdAndUpdate(userId, {
//       subscription: "Free",
//       subscriptionDetails: {
//         plan: "Free",
//         status: "active",
//         stripeCustomerId: null,
//         stripeSubscriptionId: null,
//         priceId: null,
//         currentPeriodStart: new Date(),
//         currentPeriodEnd: null,
//         cancelAtPeriodEnd: false,
//       },
//     });
//     res.json({ message: "User subscribed to Free plan" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to set Free plan" });
//   }
// };

// export const stripeWebhookHandler = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, config.stripe.webhookSecret);
//     console.log(`✅ Webhook received: ${event.type}`);
//   } catch (err) {
//     console.error(`❌ Webhook signature verification failed: ${err.message}`);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   try {
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       const customer = await stripe.customers.retrieve(session.customer);
//       const userId = customer.metadata.userId;

//       await User.findByIdAndUpdate(userId, {
//         subscriptionDetails: {
//           plan: "pending",
//           stripeCustomerId: session.customer,
//           stripeSubscriptionId: session.subscription,
//           priceId: session.amount_total === 999 ? "price_1RRyYOPCaa4i7sFWcTNKcd1B" : "price_1RRyZVPCaa4i7sFWJFzwmJlz",
//           status: "incomplete",
//           currentPeriodStart: new Date(),
//           currentPeriodEnd: null,
//           cancelAtPeriodEnd: false,
//         },
//       });
//     }

//     if (event.type === "invoice.paid") {
//       const invoice = event.data.object;
//       const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
//       const customer = await stripe.customers.retrieve(subscription.customer);
//       const userId = customer.metadata.userId;
//       const priceId = subscription.items.data[0].price.id;
//       const plan = priceId === "price_1RRyZVPCaa4i7sFWJFzwmJlz" ? "Premium" : "Basic";

//       await User.findByIdAndUpdate(userId, {
//         subscription: plan,
//         subscriptionDetails: {
//           plan,
//           stripeCustomerId: customer.id,
//           stripeSubscriptionId: subscription.id,
//           priceId,
//           status: subscription.status,
//           currentPeriodStart: new Date(subscription.current_period_start * 1000),
//           currentPeriodEnd: new Date(subscription.current_period_end * 1000),
//           cancelAtPeriodEnd: subscription.cancel_at_period_end,
//         },
//       });
//     }

//     res.status(200).json({ received: true });
//   } catch (err) {
//     console.error("❌ Webhook processing error:", err);
//     res.status(500).json({ message: "Webhook processing failed" });
//   }
// };

import Stripe from "stripe";
import { User } from "../models/User.js";
import config from "../config/config.js";

const stripe = new Stripe(config.stripe.stripeSecret);

export const createStripeCheckoutSession = async (req, res) => {
  try {
    const { userId, priceId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user._id.toString() },
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${config.client_url}/subscription-success`,
      cancel_url: `${config.client_url}/subscription-cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error", error);
    res.status(500).json({ message: "Failed to create checkout session" });
  }
};

export const setFreeSubscription = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndUpdate(userId, {
      subscription: "Free",
      subscriptionDetails: {
        plan: "Free",
        status: "active",
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        priceId: null,
        currentPeriodStart: new Date(),
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
      },
    });
    res.json({ message: "User subscribed to Free plan" });
  } catch (err) {
    res.status(500).json({ message: "Failed to set Free plan" });
  }
};

// export const stripeWebhookHandler = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, config.stripe.webhookSecret);
//     console.log(`✅ Webhook received: ${event.type}`);
//   } catch (err) {
//     console.error(`❌ Webhook signature verification failed: ${err.message}`);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   try {
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       const customer = await stripe.customers.retrieve(session.customer);
//       const userId = customer.metadata.userId;

//       await User.findByIdAndUpdate(userId, {
//         subscriptionDetails: {
//           plan: "pending",
//           stripeCustomerId: session.customer,
//           stripeSubscriptionId: session.subscription,
//           priceId: session.amount_total === 999 ? "price_1RRyYOPCaa4i7sFWcTNKcd1B" : "price_1RRyZVPCaa4i7sFWJFzwmJlz",
//           status: "incomplete",
//           currentPeriodStart: new Date(),
//           currentPeriodEnd: null,
//           cancelAtPeriodEnd: false,
//         },
//       });
//     }

//     if (event.type === "invoice.paid") {
//       const invoice = event.data.object;
//       const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
//       const customer = await stripe.customers.retrieve(subscription.customer);
//       const userId = customer.metadata.userId;
//       const priceId = subscription.items.data[0].price.id;
//       const plan = priceId === "price_1RRyZVPCaa4i7sFWJFzwmJlz" ? "Premium" : "Basic";

//       await User.findByIdAndUpdate(userId, {
//         subscription: plan,
//         subscriptionDetails: {
//           plan,
//           stripeCustomerId: customer.id,
//           stripeSubscriptionId: subscription.id,
//           priceId,
//           status: subscription.status,
//           currentPeriodStart: new Date(subscription.current_period_start * 1000),
//           currentPeriodEnd: new Date(subscription.current_period_end * 1000),
//           cancelAtPeriodEnd: subscription.cancel_at_period_end,
//         },
//       });
//     }

//     res.status(200).json({ received: true });
//   } catch (err) {
//     console.error("❌ Webhook processing error:", err);
//     res.status(500).json({ message: "Webhook processing failed" });
//   }
// };


// export const stripeWebhookHandler = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, config.stripe.webhookSecret);
//   } catch (err) {
//     console.error("Webhook signature error:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     try {
//       const customer = await stripe.customers.retrieve(session.customer);
//       const userId = customer.metadata.userId;

//       const subscription = await stripe.subscriptions.retrieve(session.subscription);
//       const priceId = subscription.items.data[0].price.id;

//       const planName =
//         priceId === "price_1RRyZVPCaa4i7sFWJFzwmJlz"
//           ? "Premium"
//           : priceId === "price_1RRyYOPCaa4i7sFWcTNKcd1B"
//           ? "Basic"
//           : "Free";

//       await User.findByIdAndUpdate(userId, {
//         subscription: planName,
//         subscriptionDetails: {
//           plan: planName,
//           stripeCustomerId: session.customer,
//           stripeSubscriptionId: subscription.id,
//           priceId,
//           status: "active",
//           currentPeriodStart: new Date(subscription.current_period_start * 1000),
//           currentPeriodEnd: new Date(subscription.current_period_end * 1000),
//           cancelAtPeriodEnd: subscription.cancel_at_period_end,
//         },
//       });

//       console.log(`✅ User ${userId} upgraded to ${planName}`);
//     } catch (err) {
//       console.error("Error handling checkout.session.completed:", err);
//       return res.status(500).send("Webhook internal error");
//     }
//   }

//   res.sendStatus(200);
// };

export const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, config.stripe.webhookSecret);
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const customer = await stripe.customers.retrieve(session.customer);
      const userId = customer.metadata.userId;

      const subscription = await stripe.subscriptions.retrieve(session.subscription);
      const priceId = subscription.items.data[0].price.id;

      const planName =
        priceId === "price_1RRyZVPCaa4i7sFWJFzwmJlz"
          ? "Premium"
          : priceId === "price_1RRyYOPCaa4i7sFWcTNKcd1B"
          ? "Basic"
          : "Free";

      // ✅ Validate timestamps before converting
      const currentPeriodStart = subscription.current_period_start
        ? new Date(subscription.current_period_start * 1000)
        : null;

      const currentPeriodEnd = subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000)
        : null;

      await User.findByIdAndUpdate(userId, {
        subscription: planName,
        subscriptionDetails: {
          plan: planName,
          stripeCustomerId: session.customer,
          stripeSubscriptionId: subscription.id,
          priceId,
          status: "active",
          currentPeriodStart,
          currentPeriodEnd,
          cancelAtPeriodEnd: subscription.cancel_at_period_end ?? false,
        },
      });

      console.log(`✅ Subscription updated for user ${userId}`);
    } catch (err) {
      console.error("❌ Error handling checkout.session.completed:", err);
      return res.status(500).send("Webhook internal error");
    }
  }

  res.sendStatus(200);
};
