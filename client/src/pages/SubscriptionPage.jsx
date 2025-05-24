// import React from "react";
// import { Link } from "react-router-dom";

// export default function SubscriptionPage() {
//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Plan</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Free Plan */}
//         <div className="border p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-2">Free Plan</h2>
//           <p className="text-gray-600 mb-4">Limited workouts and features</p>
//           <p className="text-2xl font-bold mb-4">$0</p>
//           <Link to="/subscribe?plan=Free">
//             <button className="w-full bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 transition">
//               Continue with Free
//             </button>
//           </Link>
//         </div>

//         {/* Basic Plan */}
//         <div className="border p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-2">Standard Plan</h2>
//           <p className="text-gray-600 mb-4">Workouts, Programs, Trainers</p>
//           <p className="text-2xl font-bold mb-4">$9.00</p>
//           <Link to="/subscribe?plan=Basic">
//             <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
//               Subscribe
//             </button>
//           </Link>
//         </div>

//         {/* Premium Plan */}
//         <div className="border p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-2">Premium Plan</h2>
//           <p className="text-gray-600 mb-4">
//             Everything in Standard + Meditation and Blogs
//           </p>
//           <p className="text-2xl font-bold mb-4">$19.99</p>
//           <Link to="/subscribe?plan=Premium">
//             <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">
//               Subscribe
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import SubscribeButton from "../components/SubscribeButton";

const plans = [
  {
    name: "Free",
    price: 0,
    priceId: null,
    features: ["Limited access to workouts and programs"],
  },
  {
    name: "Basic",
    price: 9.99,
    priceId: "price_1RRyYOPCaa4i7sFWcTNKcd1B",
    features: ["Access to all workouts, programs, trainers"],
  },
  {
    name: "Premium",
    price: 19.99,
    priceId: "price_1RRyZVPCaa4i7sFWJFzwmJlz",
    features: ["Everything in Basic", "Meditations", "Blogs"],
  },
];

const SubscriptionPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-lg shadow-sm p-6 text-center bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold mb-4">
              {plan.price === 0 ? "Free" : `$${plan.price}`}
            </p>
            <ul className="text-sm text-gray-600 mb-4">
              {plan.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>
            <SubscribeButton plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
