"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

const Checkbox = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    // Define base, variant, and size styles
    const baseStyles = "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const variantStyles = {
      default: "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      // Add other variants as needed
    };
    const sizeStyles = {
      default: "text-base",
      // Add other sizes as needed
    };

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant] || ""} ${sizeStyles[size] || ""} ${className}`}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  }
)

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
