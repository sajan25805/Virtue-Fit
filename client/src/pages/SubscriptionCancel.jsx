import React from "react";
import { Link } from "react-router-dom";

const SubscriptionCancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-red-50">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Subscription Cancelled</h1>
      <p className="text-lg text-red-700 mb-6">
        It looks like you cancelled your subscription. If that was a mistake, you can try again.
      </p>
      <Link
        to="/upgrade"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold"
      >
        Choose Plan Again
      </Link>
    </div>
  );
};

export default SubscriptionCancel;
