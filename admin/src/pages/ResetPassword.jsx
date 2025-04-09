import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await resetPassword({ token, newPassword });
      navigate("/trainer/login");
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength="8"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength="8"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" size={24} /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
