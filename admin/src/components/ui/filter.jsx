// import React, { useState } from "react";

// export function Filter({ label, options, value, onChange }) {
//   return (
//     <div className="mb-4">
//       <label className="block text-sm font-medium text-[#0E0E2C]">{label}</label>
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full max-w-xs border rounded p-2"
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "./button"

export function Filter({ label, options, value, onChange, className }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className={className ? `relative ${className}` : "relative"} ref={ref}>
      <div className="mb-1 block text-sm font-medium text-[#0E0E2C]">{label}</div>
      <Button variant="outline" className="w-full justify-between font-normal" onClick={() => setOpen(!open)}>
        <span>{selectedOption?.label || "Select option"}</span>
        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
      </Button>
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-[#ECECEE] bg-white shadow-lg">
          <div className="max-h-60 overflow-auto py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className={`flex cursor-pointer items-center px-3 py-2 text-sm hover:bg-[#F7F7FD] ${
                  option.value === value ? "bg-[#F7F7FD]" : ""
                }`}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
              >
                <span className="flex-grow">{option.label}</span>
                {option.value === value && <Check className="h-4 w-4 text-[#00A8FF]" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function FilterGroup({ children, className }) {
  return (
    <div className={className ? `flex flex-wrap gap-4 mb-6 ${className}` : "flex flex-wrap gap-4 mb-6"}>{children}</div>
  )
}
