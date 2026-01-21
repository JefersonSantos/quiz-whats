"use client"

import { useEffect, useState } from "react"
import { ActionButton } from "@/components/action-button"
import { playChoiceSound } from "@/lib/play-choice-sound"

interface Screen5Question2Props {
  onAnswer: (answer: "A" | "B" | "C") => void
  selectedAnswer?: "A" | "B" | "C"
  onNext: () => void
}

const OPTIONS = [
  { key: "A" as const, label: "Webhook? 😅" },
  { key: "B" as const, label: "Tentei, mas nunca funcionou direito" },
  { key: "C" as const, label: "Sim, está ativo e respondendo" },
]

const FEEDBACKS = {
  A: (
    <>
      <p className="text-foreground font-medium">Normal.</p>
      <p className="text-muted-foreground">Documentação fala disso como se fosse óbvio.</p>
      <p className="text-muted-foreground">Pra quem está começando, não é.</p>
    </>
  ),
  B: (
    <>
      <p className="text-foreground font-medium">Esse ponto trava MUITA gente.</p>
      <p className="text-muted-foreground">E quase sempre não é erro de código.</p>
    </>
  ),
  C: (
    <>
      <p className="text-foreground font-medium">Perfeito. Então sua base técnica já está sólida.</p>
    </>
  ),
}

export function Screen5Question2({ onAnswer, selectedAnswer, onNext }: Screen5Question2Props) {
  const [showFeedback, setShowFeedback] = useState(!!selectedAnswer)

  const handleSelect = (answer: "A" | "B" | "C") => {
    playChoiceSound()
    onAnswer(answer)
    setShowFeedback(true)
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const tag = target?.tagName?.toLowerCase()
      if (tag === "input" || tag === "textarea" || (target as any)?.isContentEditable) return

      const key = e.key.toLowerCase()
      if (key === "a" || key === "1") {
        e.preventDefault()
        handleSelect("A")
      } else if (key === "b" || key === "2") {
        e.preventDefault()
        handleSelect("B")
      } else if (key === "c" || key === "3") {
        e.preventDefault()
        handleSelect("C")
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Pergunta 2 de 3</span>
        <h2 className="text-xl font-bold text-foreground leading-tight">
          Vc já conseguiu configurar o webhook sem dor de cabeça?
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
        ariaLabel="Continuar"
      >
        {"👉 Continuar"}
      </ActionButton>
    </div>
  )
}
