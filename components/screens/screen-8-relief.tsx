"use client"

import { ActionButton } from "@/components/action-button"

interface Screen8ReliefProps {
  onNext: () => void
}

export function Screen8Relief({ onNext }: Screen8ReliefProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <p className="text-foreground font-medium text-lg">Agora a boa notícia.</p>
        
        <div className="space-y-3 text-muted-foreground">
          <p>Existe um caminho oficial.</p>
          <p>Seguro.</p>
          <p>Visual.</p>
          <p>Passo a passo.</p>
          <p>Sem gambiarra.</p>
          <p>Sem risco de bloqueio.</p>
          <p>Sem precisar virar dev expert.</p>
        </div>

        <p className="text-primary font-medium pt-4">
          E é exatamente isso que vamos te mostrar agora.
        </p>
      </div>

      <ActionButton onClick={onNext} ariaLabel="Continuar">
        {"👉 Continuar"}
      </ActionButton>
    </div>
  )
}
