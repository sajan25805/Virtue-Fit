import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";
import { Loader } from "lucide-react";

export default function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState("");
  const { verifyEmail, error, isLoading } = useAuthStore();
  const { token } = useParams(); // For direct link verification
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail(verificationCode || token);
      navigate("/trainer/dashboard");
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify Your Email
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!token && (
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" size={24} /> : "Verify Email"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Didn't receive a code?{" "}
          <button className="text-blue-500 hover:underline">
            Resend Verification Email
          </button>
        </p>
      </div>
    </div>
  );
}
