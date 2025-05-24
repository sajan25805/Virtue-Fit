// src/components/SubscriptionPlans.jsx
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(""); // Replace with real key

const plans = [
  {
    name: "Free",
    price: "$0",
    priceId: null,
    features: ["Limited access", "No trainers", "No premium content"],
  },
  {
    name: "Basic",
    price: "$9",
    priceId: "price_1RRyYOPCaa4i7sFWcTNKcd1B",
    features: ["Workouts", "Programs", "Trainers"],
  },
  {
    name: "Premium",
    price: "$19.99",
    priceId: "price_1RRyZVPCaa4i7sFWJFzwmJlz",
    features: ["Everything in Basic", "Meditations", "Blogs"],
  },
];

const SubscriptionPlans = ({ userId }) => {
  const handleSubscribe = async (priceId) => {
    if (!priceId) return alert("You're already on the Free plan!");

    try {
      const { data } = await axios.post("http://localhost:8000/api/stripe/create-checkout-session", {
        userId,
        priceId,
      });

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error("Subscription error", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <div key={plan.name} className="border rounded-lg p-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2 text-center">{plan.name}</h2>
          <p className="text-center text-2xl font-bold mb-4">{plan.price}</p>
          <ul className="text-sm text-gray-600 mb-4 list-disc list-inside">
            {plan.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
          <div className="flex justify-center">
            <button
              onClick={() => handleSubscribe(plan.priceId)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {plan.name === "Free" ? "Current Plan" : "Subscribe"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
