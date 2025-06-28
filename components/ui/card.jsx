import React from "react"
import { cn } from "@/lib/utils"

export function Card({ className, ...props }) {
  return <div className={cn("rounded-2xl border bg-white shadow-sm", className)} {...props} />
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("border-b p-4", className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-lg font-semibold text-slate-900", className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-4", className)} {...props} />
}
