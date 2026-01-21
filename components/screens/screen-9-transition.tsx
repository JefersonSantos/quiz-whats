"use client"

import { useState } from "react"
import { ActionButton } from "@/components/action-button"
import { Tag } from "lucide-react"

interface Screen9TransitionProps {
  onFinish: () => void
}

export function Screen9Transition({ onFinish }: Screen9TransitionProps) {
  const [showCheckpoint, setShowCheckpoint] = useState(false)

  const handleClick = () => {
    setShowCheckpoint(true)
    setTimeout(() => {
      onFinish()
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-8 relative">
      {showCheckpoint && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Tag className="w-6 h-6" />
              <span className="font-bold">Checkpoint alcançado</span>
            </div>
            <p className="text-muted-foreground">Diagnóstico concluído</p>
          </div>
        </div>
      )}

      <div className="space-y-4 text-muted-foreground">
        <p className="text-foreground font-medium">Na próxima etapa, vc vai ver o processo real da WhatsApp Business API…</p>
        <p>…sem ruído.</p>
        <p>…sem termos desnecessários.</p>
        <p>…e com os pontos críticos destacados.</p>
      </div>

      <ActionButton 
        onClick={handleClick} 
        ariaLabel="Ver o caminho oficial agora"
        disabled={showCheckpoint}
      >
        {"👉 Ver o caminho oficial agora"}
      </ActionButton>
    </div>
  )
}
