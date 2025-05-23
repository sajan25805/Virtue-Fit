import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import React from "react"

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export const DropdownMenuContent = React.forwardRef(({ className = "", children, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={`z-50 min-w-[10rem] rounded-md border bg-white p-1 shadow-md dark:bg-gray-800 ${className}`}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
))

export const DropdownMenuItem = React.forwardRef(({ className = "", ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={`cursor-pointer select-none rounded-sm px-3 py-2 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
    {...props}
  />
))

export const DropdownMenuLabel = React.forwardRef(({ className = "", ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={`px-3 py-2 text-xs font-semibold text-gray-500 ${className}`}
    {...props}
  />
))

export const DropdownMenuSeparator = React.forwardRef(({ className = "", ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={`my-1 h-px bg-gray-200 dark:bg-gray-700 ${className}`}
    {...props}
  />
))
