"use client";

import { useState } from "react";
import {
  UserIcon,
  FireIcon,
  ScaleIcon,
  LockClosedIcon,
  ClipboardDocumentCheckIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    fitnessGoal: "",
    experienceLevel: "",
    height: "",
    weight: "",
    age: "",
  });

  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 4) {
      try {
        await signup(formData); // Pass user input to signup function
        navigate("/verify-email"); // Redirect to verify Email after successful signup
      } catch (error) {
        console.error("Signup failed:", error);
      }
    } else {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-4">
      {/* <Navbar/> */}
      <div className="w-full max-w-md space-y-8">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[
            { icon: UserIcon, label: "Personal" },
            { icon: FireIcon, label: "Goals" },
            { icon: ScaleIcon, label: "Physical" },
            { icon: LockClosedIcon, label: "Account" },
          ].map((Item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`rounded-full p-3 ${
                  step > index + 1
                    ? "bg-green-500"
                    : step === index + 1
                    ? "bg-green-600"
                    : "bg-gray-700"
                }`}
              >
                <Item.icon className="w-6 h-6" />
              </div>
              <span className="text-sm mt-2">{Item.label}</span>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <ClipboardDocumentCheckIcon className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-bold">Create Your Fitness Account</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateFormData("firstName", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateFormData("lastName", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Fitness Goals */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium">
                    What's your primary fitness goal?
                  </label>
                  <div className="space-y-3">
                    {["Weight Loss", "Muscle Gain", "Endurance"].map((goal) => (
                      <label
                        key={goal}
                        className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600"
                      >
                        <input
                          type="radio"
                          name="fitnessGoal"
                          value={goal.toLowerCase().replace(" ", "-")}
                          checked={
                            formData.fitnessGoal ===
                            goal.toLowerCase().replace(" ", "-")
                          }
                          onChange={(e) =>
                            updateFormData("fitnessGoal", e.target.value)
                          }
                          className="text-green-500 focus:ring-green-500"
                        />
                        <span>{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="experienceLevel"
                    className="block text-sm font-medium"
                  >
                    Experience Level
                  </label>
                  <select
                    id="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={(e) =>
                      updateFormData("experienceLevel", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select your experience level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Physical Information */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="height"
                      className="block text-sm font-medium"
                    >
                      Height (cm)
                    </label>
                    <input
                      id="height"
                      type="number"
                      placeholder="175"
                      value={formData.height}
                      onChange={(e) => updateFormData("height", e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium"
                    >
                      Weight (kg)
                    </label>
                    <input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={formData.weight}
                      onChange={(e) => updateFormData("weight", e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="age" className="block text-sm font-medium">
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Account Information */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            )}
            {error && (
              <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className={`flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                  step === 1 ? "invisible" : ""
                }`}
              >
                <ChevronLeftIcon className="w-5 h-5 mr-2" /> Back
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
              >

                {isLoading ? (
                  <Loader className="animate-spin mx-auto" size={24} />
                ) : step === 4 ? (
                  <>
                    Create Account <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Next <ChevronRightIcon className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
