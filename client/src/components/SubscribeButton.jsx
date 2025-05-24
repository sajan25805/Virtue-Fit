// // // // // // import React from "react";
// // // // // // import { useAuthStore } from "../store/authStore";
// // // // // // import axios from "axios";
// // // // // // import toast from "react-hot-toast";

// // // // // // const SubscribeButton = ({ plan }) => {
// // // // // //   const user = useAuthStore((state) => state.user);

// // // // // //   const handleClick = async () => {
// // // // // //     try {
// // // // // //       if (plan.name === "Free") {
// // // // // //         await axios.put("/api/stripe/free", { userId: user._id });
// // // // // //         toast.success("You're now on the Free plan");
// // // // // //         window.location.reload();
// // // // // //       } else {
// // // // // //         const res = await axios.post("/api/stripe/create-checkout-session", {
// // // // // //           userId: user._id,
// // // // // //           priceId: plan.priceId,
// // // // // //         });
// // // // // //         window.location.href = res.data.url;
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       toast.error("Subscription failed");
// // // // // //       console.error(error);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <button
// // // // // //       onClick={handleClick}
// // // // // //       className={`w-full px-4 py-2 rounded font-medium ${
// // // // // //         plan.name === "Free"
// // // // // //           ? "bg-gray-200 text-gray-700"
// // // // // //           : "bg-[#00A8FF] text-white hover:bg-[#0096E6]"
// // // // // //       }`}
// // // // // //     >
// // // // // //       {plan.name === "Free" ? "Switch to Free" : `Choose ${plan.name}`}
// // // // // //     </button>
// // // // // //   );
// // // // // // };

// // // // // // export default SubscribeButton;







// // // // // import React from "react";
// // // // // import { useAuthStore } from "../store/authStore";
// // // // // import axios from "axios";
// // // // // import toast from "react-hot-toast";

// // // // // const SubscribeButton = ({ plan }) => {
// // // // //   const user = useAuthStore((state) => state.user);

// // // // //   const handleClick = async () => {
// // // // //     try {
// // // // //       if (plan.name === "Free") {
// // // // //         await axios.put("/api/stripe/free", { userId: user._id });
// // // // //         toast.success("You're now on the Free plan");
// // // // //         window.location.reload();
// // // // //       } else {
// // // // //         const res = await axios.post("/api/stripe/create-checkout-session", {
// // // // //           userId: user._id,
// // // // //           priceId: plan.priceId,
// // // // //         });
// // // // //         window.location.href = res.data.url;
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error("Subscription failed");
// // // // //       console.error(error);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <button
// // // // //       onClick={handleClick}
// // // // //       className={`w-full px-4 py-2 rounded font-medium ${
// // // // //         plan.name === "Free"
// // // // //           ? "bg-gray-200 text-gray-700"
// // // // //           : "bg-[#00A8FF] text-white hover:bg-[#0096E6]"
// // // // //       }`}
// // // // //     >
// // // // //       {plan.name === "Free" ? "Switch to Free" : `Choose ${plan.name}`}
// // // // //     </button>
// // // // //   );
// // // // // };

// // // // // export default SubscribeButton;








// // // // import React from "react";
// // // // import { useAuthStore } from "../store/authStore";
// // // // import axios from "axios";
// // // // import toast from "react-hot-toast";

// // // // // Set default Axios base URL
// // // // axios.defaults.baseURL = 'http://localhost:8000';

// // // // const SubscribeButton = ({ plan }) => {
// // // //   const user = useAuthStore((state) => state.user);

// // // //   const handleClick = async () => {
// // // //     try {
// // // //       if (plan.name === "Free") {
// // // //         await axios.post("/api/stripe/set-free-subscription", { userId: user._id });
// // // //         toast.success("You're now on the Free plan");
// // // //         window.location.reload();
// // // //       } else {
// // // //         const res = await axios.post("/api/stripe/create-checkout-session", {
// // // //           userId: user._id,
// // // //           priceId: plan.priceId,
// // // //         });
// // // //         window.location.href = res.data.url;
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Subscription failed");
// // // //       console.error(error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <button
// // // //       onClick={handleClick}
// // // //       className={`w-full px-4 py-2 rounded font-medium ${
// // // //         plan.name === "Free"
// // // //           ? "bg-gray-200 text-gray-700"
// // // //           : "bg-[#00A8FF] text-white hover:bg-[#0096E6]"
// // // //       }`}
// // // //     >
// // // //       {plan.name === "Free" ? "Switch to Free" : `Choose ${plan.name}`}
// // // //     </button>
// // // //   );
// // // // };

// // // // export default SubscribeButton;





// // // import { stripePromise } from "../stripe";
// // // import axios from "axios";
// // // import { toast } from "react-hot-toast";
// // // import { useAuthStore } from "../store/authStore";

// // // const SubscribeButton = ({ plan, priceId }) => {
// // //   const user = useAuthStore((state) => state.user);

// // //   const handleSubscribe = async () => {
// // //     if (!user?._id) return toast.error("You must be logged in");

// // //     try {
// // //       const stripe = await stripePromise;

// // //       const res = await axios.post("/api/stripe/create-checkout-session", {
// // //         userId: user._id,
// // //         priceId,
// // //       });

// // //       if (res.data?.url) {
// // //         stripe.redirectToCheckout({ sessionId: res.data.sessionId });
// // //       } else {
// // //         window.location.href = res.data.url; // fallback
// // //       }
// // //     } catch (error) {
// // //       console.error(error);
// // //       toast.error("Could not initiate checkout");
// // //     }
// // //   };

// // //   return (
// // //     <button
// // //       onClick={handleSubscribe}
// // //       className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-4 py-2 rounded-md text-sm"
// // //     >
// // //       Subscribe to {plan}
// // //     </button>
// // //   );
// // // };

// // // export default SubscribeButton;




// // import React from "react";
// // import { loadStripe } from "@stripe/stripe-js";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import { useAuthStore } from "../store/authStore";

// // // ✅ Your Stripe public key
// // const stripePromise = loadStripe("pk_test_51RRy0MPCaa4i7sFWOWZuZduupyJKKgBOvwV5uokA8wFbF8XFJuq0rA8N6VVuTkfzR10uCZPqwmA5tCJWYZOQA1E7005ZRttAXa"); // Replace with your actual Stripe public key

// // const SubscribeButton = ({ priceId }) => {
// //   const user = useAuthStore((state) => state.user);

// //   const handleSubscribe = async () => {
// //     if (!user) {
// //       toast.error("You must be logged in to subscribe.");
// //       return;
// //     }

// //     try {
// //       const stripe = await stripePromise;
// //       if (!stripe) {
// //         toast.error("Stripe is not ready.");
// //         return;
// //       }

// //       // ✅ Hit backend to create the checkout session
// //       const { data } = await axios.post(
// //         `${import.meta.env.VITE_API_BASE_URL}/api/stripe/create-checkout-session`,
// //         {
// //           userId: user._id,
// //           priceId,
// //         }
// //       );

// //       // ✅ Redirect to Stripe checkout
// //       const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });

// //       if (result.error) {
// //         toast.error(result.error.message);
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Something went wrong!");
// //     }
// //   };

// //   return (
// //     <button
// //       onClick={handleSubscribe}
// //       className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-4 py-2 rounded-md font-semibold"
// //     >
// //       Subscribe
// //     </button>
// //   );
// // };

// // export default SubscribeButton;


// import React from "react";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
// import { useAuthStore } from "../store/authStore";
// import toast from "react-hot-toast";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// const SubscribeButton = ({ plan }) => {
//   const user = useAuthStore((state) => state.user);

//   const handleSubscribe = async () => {
//     if (!user || !user._id) {
//       toast.error("Please login first.");
//       return;
//     }

//     if (plan.name === "Free") {
//       try {
//         await axios.post(`${import.meta.env.VITE_API_BASE_URL}/set-free-subscription`, {
//           userId: user._id,
//         });
//         toast.success("Subscribed to Free plan.");
//         window.location.href = "/"; // or refresh/subscription-success page
//       } catch {
//         toast.error("Failed to subscribe to Free plan.");
//       }
//       return;
//     }

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/create-checkout-session`, {
//         userId: user._id,
//         priceId: plan.priceId,
//       });

//       const stripe = await stripePromise;
//       stripe.redirectToCheckout({ sessionId: res.data.sessionId });
//     } catch (err) {
//       console.error(err);
//       toast.error("Error initiating checkout.");
//     }
//   };

//   return (
//     <button
//       onClick={handleSubscribe}
//       className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
//     >
//       {plan.name === "Free" ? "Choose Free" : `Subscribe to ${plan.name}`}
//     </button>
//   );
// };

// export default SubscribeButton;

import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

const SubscribeButton = ({ plan }) => {
  const user = useAuthStore((state) => state.user);

  const handleSubscribe = async () => {
    if (!user || !user._id) {
      toast.error("You must be logged in to subscribe.");
      return;
    }

    if (plan.name === "Free") {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/set-free-subscription`, {
          userId: user._id,
        });
        toast.success("Subscribed to Free plan!");
        window.location.reload();
      } catch (err) {
        console.error("Free subscription error", err);
        toast.error("Failed to subscribe to Free plan.");
      }
      return;
    }

    // Stripe Paid Subscription
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/create-checkout-session`, {
        userId: user._id,
        priceId: plan.priceId,
      });

      if (res.data && res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Stripe checkout URL not received.");
      }
    } catch (err) {
      console.error("Stripe session error", err.response?.data || err.message);
      toast.error("Failed to start Stripe Checkout.");
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className="bg-[#00A8FF] text-white px-4 py-2 rounded hover:bg-[#007ACC] transition-all duration-200"
    >
      {plan.name === "Free" ? "Choose Free" : `Subscribe - $${plan.price}`}
    </button>
  );
};

export default SubscribeButton;
