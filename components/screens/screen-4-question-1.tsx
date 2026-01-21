"use client"

import { useState } from "react"
import { ActionButton } from "@/components/action-button"

interface Screen4Question1Props {
  onAnswer: (answer: "A" | "B" | "C") => void
  selectedAnswer?: "A" | "B" | "C"
  onNext: () => void
}

const OPTIONS = [
  { key: "A" as const, label: "Não. Nunca consegui passar dessa parte" },
  { key: "B" as const, label: "Tentei, mas ficou em análise / foi recusado" },
  { key: "C" as const, label: "Sim, o número foi aprovado" },
]

const FEEDBACKS = {
  A: (
    <>
      <p className="text-foreground font-medium">Ok. Esse é um dos bloqueios mais comuns.</p>
      <p className="text-muted-foreground">{"E não tem nada a ver com 'fazer errado'."}</p>
    </>
  ),
  B: (
    <>
      <p className="text-foreground font-medium">Perfeito. Aqui muita gente acha que errou algo técnico…</p>
      <p className="text-muted-foreground">…mas o problema geralmente vem antes disso.</p>
    </>
  ),
  C: (
    <>
      <p className="text-foreground font-medium">Ótimo. Então vc já passou por um dos portões mais chatos.</p>
    </>
  ),
}

export function Screen4Question1({ onAnswer, selectedAnswer, onNext }: Screen4Question1Props) {
  const [showFeedback, setShowFeedback] = useState(!!selectedAnswer)

  const handleSelect = (answer: "A" | "B" | "C") => {
    onAnswer(answer)
    setShowFeedback(true)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Pergunta 1 de 3</span>
        <h2 className="text-xl font-bold text-foreground leading-tight">
          Seu número já foi aprovado oficialmente na WhatsApp Business API?
        </h2>
      </div>

      <div className="space-y-3">
        {OPTIONS.map((option) => (
          <ActionButton
            key={option.key}
            variant="option"
            selected={selectedAnswer === option.key}
            onClick={() => handleSelect(option.key)}
            ariaLabel={option.label}
          >
            <span className="text-primary font-bold mr-2">{option.key})</span>
            {option.label}
          </ActionButton>
        ))}
      </div>

      {showFeedback && selectedAnswer && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {FEEDBACKS[selectedAnswer]}
        </div>
      )}

      <ActionButton
        onClick={onNext}
        disabled={!selectedAnswer}
        ariaLabel="Próxima pergunta"
      >
        {"👉 Próxima pergunta"}
      </ActionButton>
    </div>
  )
}
