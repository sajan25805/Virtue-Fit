// // import React from "react";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import { useAuthStore } from "../store/authStore";
// // import { useNavigate } from "react-router-dom";

// // const plans = [
// //   {
// //     name: "Free",
// //     price: "Free",
// //     features: ["Basic Workouts", "Limited Access"],
// //     stripePriceId: null,
// //   },
// //   {
// //     name: "Basic",
// //     price: "$9.99/mo",
// //     features: ["Workouts", "Programs", "Trainers"],
// //     stripePriceId: "price_1RRyYOPCaa4i7sFWcTNKcd1B",
// //   },
// //   {
// //     name: "Premium",
// //     price: "$19.99/mo",
// //     features: ["Everything in Basic", "Meditations", "Blogs"],
// //     stripePriceId: "price_1RRyZVPCaa4i7sFWJFzwmJlz",
// //   },
// // ];

// // export default function UpgradePage() {
// //   const user = useAuthStore((state) => state.user);
// //   const navigate = useNavigate();

// //   const handleUpgrade = async (priceId) => {
// //     if (!user?._id) return toast.error("You must be logged in.");

// //     if (!priceId) {
// //       return toast.success("You're already on the Free plan.");
// //     }

// //     try {
// //       const res = await axios.post("/api/stripe/create-checkout-session", {
// //         userId: user._id,
// //         priceId,
// //       });

// //       window.location.href = res.data.url;
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to redirect to checkout");
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto py-10 px-4">
// //       <h1 className="text-3xl font-bold mb-6 text-center">Choose a Plan</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         {plans.map((plan) => (
// //           <div key={plan.name} className="border rounded-lg p-6 shadow-sm bg-white">
// //             <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
// //             <p className="text-lg font-bold mb-4">{plan.price}</p>
// //             <ul className="mb-6 space-y-1">
// //               {plan.features.map((feat, idx) => (
// //                 <li key={idx} className="text-sm text-gray-700">• {feat}</li>
// //               ))}
// //             </ul>
// //             <button
// //               onClick={() => handleUpgrade(plan.stripePriceId)}
// //               className={`w-full py-2 px-4 text-white rounded ${
// //                 plan.name === "Free"
// //                   ? "bg-gray-400 cursor-not-allowed"
// //                   : "bg-blue-600 hover:bg-blue-700"
// //               }`}
// //             >
// //               {plan.name === "Free" ? "Current Plan" : "Upgrade"}
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// import React from "react";
// import { Link } from "react-router-dom";

// export default function UpgradePage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
//       <h1 className="text-3xl font-bold mb-4">Upgrade Required</h1>
//       <p className="mb-6 text-gray-600">
//         Your current plan does not include access to this feature.
//       </p>
//       <Link to="/subscription">
//         <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded">
//           View Plans
//         </button>
//       </Link>
//     </div>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";

const UpgradePage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto text-center py-20 px-4">
      <h1 className="text-3xl font-bold mb-4">Upgrade to Premium</h1>
      <p className="text-gray-600 mb-8">
        This content is only available for Premium users.
      </p>
      <button
        onClick={() => navigate("/subscription")}
        className="px-6 py-3 bg-[#00A8FF] text-white rounded hover:bg-[#0096E6]"
      >
        View Subscription Plans
      </button>
    </div>
  );
};

export default UpgradePage;
