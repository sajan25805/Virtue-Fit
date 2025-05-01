// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/auth-store";
// import { Loader } from "lucide-react";

// export default function TrainerLogin() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const { login, error, isLoading } = useAuthStore();

//   const updateFormData = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(formData);
//       navigate("/trainer/dashboard"); // Redirect after successful login
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Trainer Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => updateFormData("email", e.target.value)}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) => updateFormData("password", e.target.value)}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
//             disabled={isLoading}
//           >
//             {isLoading ? <Loader className="animate-spin" size={24} /> : "Login"}
//           </button>
//         </form>

//         <div className="mt-4 space-y-2">
//           <p className="text-sm text-gray-600 text-center">
//             Don't have an account?{" "}
//             <a href="/trainer/signup" className="text-blue-500 hover:underline">
//               Sign Up
//             </a>
//           </p>
//           <p className="text-sm text-gray-600 text-center">
//             Forgot password?{" "}
//             <a href="/trainer/forgot-password" className="text-blue-500 hover:underline">
//               Reset Password
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ⬅️ Use Link instead of a href
import { useAuthStore } from "../../store/auth-store";
import { Loader2 } from "lucide-react"; // Use animated loader

export default function TrainerLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, error, isLoading } = useAuthStore();

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/trainer/dashboard"); // ✅ Redirect to dashboard after login
    } catch (error) {
      console.error("Login failed:", error);
      // No need to show alert, already handled by zustand's `error`
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Trainer Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-600 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-gray-600 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => updateFormData("password", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2 text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <Link to="/trainer/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <p>
            Forgot password?{" "}
            <Link to="/trainer/forgot-password" className="text-blue-500 hover:underline">
              Reset Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
