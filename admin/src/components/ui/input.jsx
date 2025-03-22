import * as React from "react"

// Simple function to merge class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-[#ECECEE] bg-white px-3 py-2 text-sm text-[#0E0E2C] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A8FF] focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
