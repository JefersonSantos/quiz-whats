"use client"

import { ActionButton } from "@/components/action-button"
import { CheckCircle } from "lucide-react"

interface Screen7ResultProps {
  onNext: () => void
}

export function Screen7Result({ onNext }: Screen7ResultProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Diagnóstico completo.</h2>
      </div>

      <div className="space-y-4 text-muted-foreground">
        <p className="text-foreground font-medium">Baseado nas suas respostas, fica claro uma coisa:</p>
        <p>{"Vc não está travado pq 'não entende de API'."}</p>
        <p>Vc está travado pq o processo oficial é confuso, fragmentado e mal explicado.</p>
        <p>Ele foi feito pra afastar iniciantes.</p>
        <p>E favorecer quem já conhece os atalhos.</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-2">
        <p className="text-primary font-bold text-lg">O problema não é vc.</p>
        <p className="text-foreground font-medium">É o mapa.</p>
      </div>

      <ActionButton onClick={onNext} ariaLabel="Continuar">
        {"👉 Continuar"}
      </ActionButton>
    </div>
  )
}
