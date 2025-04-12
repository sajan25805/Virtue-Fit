

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store";
import { Loader } from "lucide-react";
import { Label } from "../../components/ui/label";

export default function TrainerSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "Fitness",
    bio: "",
  });

  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send plain data object — assume signup handles FormData creation
      await signup({
        ...formData,
        profilePicture: file,
      });

      navigate("/trainer/verify-email");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Trainer Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength="8"
          />

          <select
            value={formData.specialization}
            onChange={(e) => updateFormData("specialization", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Fitness">Fitness</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Meditation">Meditation</option>
            <option value="Yoga">Yoga</option>
          </select>

          <textarea
            placeholder="Bio (Optional)"
            value={formData.bio}
            onChange={(e) => updateFormData("bio", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />

          <div>
            <Label htmlFor="profile-pic">Upload Profile Pic</Label>
            <input
              id="profile-pic"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin" size={24} />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a href="/trainer/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
