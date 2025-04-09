import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { requestPasswordReset, error, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestPasswordReset(email);
      alert("Password reset link sent to your email");
    } catch (error) {
      console.error("Password reset request failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" size={24} /> : "Send Reset Link"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Remember your password?{" "}
          <a href="/trainer/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
