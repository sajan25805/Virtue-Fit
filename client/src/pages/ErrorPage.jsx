"use client"

import { useRouteError } from "react-router-dom"
import { AlertTriangle } from "lucide-react"

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div className="min-h-screen bg-[#F7F7FD] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-[#0E0E2C] mb-2">Oops! Something went wrong</h1>

        <p className="text-gray-600 mb-6">
          {error?.statusText || error?.message || "Sorry, an unexpected error has occurred."}
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-6 py-3 rounded-lg transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
