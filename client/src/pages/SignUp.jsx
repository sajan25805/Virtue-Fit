
import { useState } from "react"
import {
  UserIcon,
  FireIcon,
  ScaleIcon,
  LockClosedIcon,
  ClipboardDocumentCheckIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { Loader } from "lucide-react"

export default function SignUp() {
  const [step, setStep] = useState(1)
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
  })

  const navigate = useNavigate()
  const { signup, error, isLoading } = useAuthStore()

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step === 4) {
      try {
        await signup(formData)
        navigate("/verify-email")
      } catch (error) {
        console.error("Signup failed:", error)
      }
    } else {
      nextStep()
    }
  }

  return (
    <div className="min-h-screen text-[#0E0E2C] flex justify-center items-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#F7F7FD] z-0">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A8FF] opacity-10 rounded-full -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A8FF] opacity-10 rounded-full translate-y-1/4 -translate-x-1/4"></div>

        {/* Pattern Grid */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(#0E0E2C 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        {/* Fitness-themed Icons (subtle background) */}
        <div className="absolute top-10 left-10 text-[#00A8FF] opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-20 text-[#00A8FF] opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6H3v-9.172l9-8.375zm12-2.453l-12-11.125-12 11.125h3v-6h6v6h6v-6h6v6h3z" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-1/4 text-[#00A8FF] opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 16.947v1.053h2v-1.053c1.232-.21 2.257-.999 2.767-2.097l-1.348-.746c-.292.528-.89.9-1.566.9-.9 0-1.633-.736-1.633-1.633 0-.897.733-1.633 1.633-1.633.524 0 .989.249 1.291.633l1.367-.713c-.525-.951-1.524-1.592-2.667-1.592-1.693 0-3.067 1.379-3.067 3.067 0 1.688 1.374 3.067 3.067 3.067.442 0 .861-.096 1.239-.267-.389.326-.793.603-1.239.827-.18.09-.353.174-.525.256z" />
          </svg>
        </div>
      </div>

      <div className="w-full max-w-md space-y-8 z-10">
        {/* Progress Tracker */}
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
                  step > index + 1 ? "bg-[#00A8FF]" : step === index + 1 ? "bg-[#00A8FF]" : "bg-[#ECECEE]"
                }`}
              >
                <Item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm mt-2">{Item.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-[#00A8FF]">
          <div className="flex items-center gap-2 mb-6">
            <ClipboardDocumentCheckIcon className="w-6 h-6 text-[#00A8FF]" />
            <h2 className="text-2xl font-bold">Create Your Fitness Account</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    className="w-full px-3 py-2 bg-[#ECECEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    className="w-full px-3 py-2 bg-[#ECECEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Fitness Goals */}
            {step === 2 && (
              <div className="space-y-4">
                <select
                  value={formData.fitnessGoal}
                  onChange={(e) => updateFormData("fitnessGoal", e.target.value)}
                  className="w-full px-3 py-2 bg-[#ECECEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                >
                  <option value="">Select Your Goal</option>
                  <option value="weight_loss">Weight Loss</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="endurance">Endurance</option>
                </select>

                <select
                  value={formData.experienceLevel}
                  onChange={(e) => updateFormData("experienceLevel", e.target.value)}
                  className="w-full px-3 py-2 bg-[#ECECEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                >
                  <option value="">Experience Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            )}

            {/* Step 3: Physical Information */}
            {step === 3 && (
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={formData.height}
                  onChange={(e) => updateFormData("height", e.target.value)}
                  className="w-full px-3 py-2 bg-[#ECECEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                />
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={formData.weight}
                  onChange={(e) => updateFormData("weight", e.target.value)}
                  className="w-full px-3 py-2 bg-[#ECECEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)}
                  className="w-full px-3 py-2 bg-[#ECECEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                />
              </div>
            )}

            {/* Step 4: Account Details */}
            {step === 4 && (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="w-full px-3 py-2 bg-[#ECECEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className="w-full px-3 py-2 bg-[#ECECEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
                />
              </div>
            )}

            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className={`flex items-center px-4 py-2 bg-[#ECECEE] rounded-lg hover:bg-gray-300 ${step === 1 ? "invisible" : ""}`}
              >
                <ChevronLeftIcon className="w-5 h-5 mr-2" /> Back
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-[#00A8FF] text-white rounded-lg hover:bg-[#008ecc]"
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

      {/* Decorative Elements */}
      <div className="absolute bottom-4 w-full text-center text-[#0E0E2C] opacity-70 z-10 text-sm">
        <p>Join thousands of members on their fitness journey</p>
      </div>
    </div>
  )
}

