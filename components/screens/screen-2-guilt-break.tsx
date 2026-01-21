"use client"

import { ActionButton } from "@/components/action-button"

interface Screen2GuiltBreakProps {
  onNext: () => void
}

export function Screen2GuiltBreak({ onNext }: Screen2GuiltBreakProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-4 text-muted-foreground">
        <p className="text-foreground font-medium">Deixa eu adivinhar uma coisa.</p>
        <p>Vc já abriu a documentação oficial do WhatsApp…</p>
        <p>…leu 3 páginas…</p>
        <p>…e fechou com a sensação de que isso não foi feito pra vc.</p>
      </div>

      <div className="space-y-4 text-muted-foreground">
        <p>Ou pior.</p>
        <p>Pensou em usar uma API não oficial.</p>
        <p>Funcionou por um tempo.</p>
        <p>Depois veio o medo de bloqueio.</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-2">
        <p className="text-primary font-bold text-lg">Isso NÃO é falha sua.</p>
        <p className="text-foreground font-medium">É o sistema.</p>
      </div>

      <ActionButton onClick={onNext} ariaLabel="Continuar">
        {"👉 Continuar"}
      </ActionButton>
    </div>
  )
}
