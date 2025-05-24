import React from "react";
import { Link } from "react-router-dom";

const SubscriptionSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Subscription Successful 🎉</h1>
      <p className="text-lg text-green-800 mb-6">
        Thank you for subscribing! You now have access to all features.
      </p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default SubscriptionSuccess;
