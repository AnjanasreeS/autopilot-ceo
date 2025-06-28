import React from "react"
import { cn } from "@/lib/utils"

export const Button = React.forwardRef(function Button(
  { className, variant = "default", size = "md", ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-slate-300 text-slate-800 bg-white hover:bg-slate-50",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  }

  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
})
