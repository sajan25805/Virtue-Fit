import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const RESEND_DELAY = 30; // seconds

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(RESEND_DELAY);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail, user } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pasted = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pasted[i] || "";
      }
      setCode(newCode);
      const nextIndex = pasted.findIndex((d) => d === "") === -1 ? 5 : pasted.findIndex((d) => d === "");
      inputRefs.current[nextIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      toast.success("Email verified successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  const handleResend = async () => {
    try {
      if (!user?.email) {
        toast.error("User email not found");
        return;
      }

      const res = await fetch("http://localhost:8000/api/auth/resend-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email })
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Verification email resent");
        setResendDisabled(true);
        setTimer(RESEND_DELAY);
      } else {
        toast.error(data.message || "Failed to resend email");
      }
    } catch (err) {
      toast.error("Server error while resending email");
    }
  };

  useEffect(() => {
    let interval;
    if (resendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return RESEND_DELAY;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendDisabled]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0E0E2C] to-[#1f1f3a] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/10"
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">Enter the 6-digit code sent to your email.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-800 text-white border border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-500 font-semibold text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleResend}
            disabled={resendDisabled}
            className="text-sm text-blue-400 hover:underline disabled:text-gray-400"
          >
            {resendDisabled ? `Resend available in ${timer}s` : "Resend verification code"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
