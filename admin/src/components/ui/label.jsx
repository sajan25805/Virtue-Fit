// components/ui/label.jsx
import React from "react"

export const Label = ({ children, className = "", ...props }) => {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 dark:text-gray-200 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}
