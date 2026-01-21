"use client"

import { ActionButton } from "@/components/action-button"

interface Screen3InstructionProps {
  onNext: () => void
}

export function Screen3Instruction({ onNext }: Screen3InstructionProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-4 text-muted-foreground">
        <p className="text-foreground font-medium">Vou te fazer algumas perguntas simples.</p>
        <p>Responde com sinceridade.</p>
        <p>Não existe resposta certa ou errada.</p>
      </div>

      <div className="space-y-3">
        <p className="text-foreground font-medium">No final, vc vai saber exatamente:</p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">-</span>
            <span>o que já está ok</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">-</span>
            <span>o que está travando</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">-</span>
            <span>e o que precisa ser feito</span>
          </li>
        </ul>
      </div>

      <ActionButton onClick={onNext} ariaLabel="Vamos lá">
        {"👉 Vamos lá"}
      </ActionButton>
    </div>
  )
}
