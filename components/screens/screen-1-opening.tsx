"use client"

import { ActionButton } from "@/components/action-button"

interface Screen1OpeningProps {
  onNext: () => void
}

export function Screen1Opening({ onNext }: Screen1OpeningProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight text-balance">
          Se o WhatsApp Business API parece um labirinto…
          <br />
          <span className="text-muted-foreground">não é pq vc é incapaz.</span>
        </h1>

        <p className="text-lg text-primary font-medium">
          Em menos de 3 minutos, vc vai descobrir exatamente onde está travado.
        </p>
      </div>

      <div className="space-y-4 text-muted-foreground">
        <p>
          Antes de qualquer tutorial, promessa ou ferramenta,
          <br />
          vamos fazer algo simples.
        </p>
        <p className="text-foreground font-medium">Diagnosticar.</p>
        <p>Pq 9 em cada 10 pessoas que falham na API falham no mesmo ponto.</p>
        <p>E não tem nada a ver com inteligência ou experiência técnica.</p>
      </div>

      <ActionButton onClick={onNext} ariaLabel="Começar diagnóstico">
        {"👉 Começar diagnóstico"}
      </ActionButton>
    </div>
  )
}
