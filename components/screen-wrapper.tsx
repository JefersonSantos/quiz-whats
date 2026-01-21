"use client"

import { useEffect, useState, type ReactNode } from "react"

interface ScreenWrapperProps {
  children: ReactNode
  step: number
}

export function ScreenWrapper({ children, step }: ScreenWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(step)

  useEffect(() => {
    if (step !== currentStep) {
      setIsVisible(false)
      const timeout = setTimeout(() => {
        setCurrentStep(step)
        setIsVisible(true)
      }, 150)
      return () => clearTimeout(timeout)
    } else {
      setIsVisible(true)
    }
  }, [step, currentStep])

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      <div className="bg-[#0B0B0E]/90 backdrop-blur-sm rounded-2xl p-6 border border-[#1F1F2B]/50 shadow-2xl">
        {children}
      </div>
    </div>
  )
}
