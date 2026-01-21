"use client"

import { ActionButton } from "@/components/action-button"

interface Screen1OpeningProps {
  onNext: () => void
}

export function Screen1Opening({ onNext }: Screen1OpeningProps) {
  return (
    <div className="space-y-4 text-muted-foreground">
       
      <ActionButton onClick={onNext} ariaLabel="Começar diagnóstico">
        {"👉 Começar diagnóstico"}
      </ActionButton>
    </div>
  )
}
