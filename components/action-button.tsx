"use client"

import React from "react"

import { cn } from "@/lib/utils"

interface ActionButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  variant?: "primary" | "option"
  selected?: boolean
  className?: string
  ariaLabel?: string
}

export function ActionButton({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  selected = false,
  className,
  ariaLabel,
}: ActionButtonProps) {
  const baseStyles =
    "w-full min-h-[44px] px-4 py-3 rounded-lg font-medium text-left transition-all duration-200 break-words focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-center",
    option: cn(
      "bg-card border border-border text-foreground hover:border-primary/50 hover:bg-card/80",
      selected && "border-primary bg-primary/10"
    ),
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
