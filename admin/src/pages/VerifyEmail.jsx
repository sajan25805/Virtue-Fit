import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/auth-store";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const {
    verifyEmail,
    resendVerificationEmail,
    error,
    isLoading,
  } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex((d) => d !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      toast.success("Email verified successfully!");
      navigate("/trainer/dashboard");
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  const handleResend = async () => {
    try {
      await resendVerificationEmail();
      toast.success("Verification email resent!");
    } catch (err) {
      toast.error("Failed to resend verification email.");
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-200 text-gray-800 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Didn’t receive a code?{" "}
          <button
            onClick={handleResend}
            className="text-blue-500 font-semibold hover:underline"
            disabled={isLoading}
          >
            Resend Verification Email
          </button>
        </p>
      </motion.div>
    </div>
  );
}
