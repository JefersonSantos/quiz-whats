"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ProgressBar } from "@/components/progress-bar"
import { ScreenWrapper } from "@/components/screen-wrapper"
import { MatrixBackground } from "@/components/matrix-background"
import { Screen1Opening } from "@/components/screens/screen-1-opening"
import { Screen2GuiltBreak } from "@/components/screens/screen-2-guilt-break"
import { Screen3Instruction } from "@/components/screens/screen-3-instruction"
import { Screen4Question1 } from "@/components/screens/screen-4-question-1"
import { Screen5Question2 } from "@/components/screens/screen-5-question-2"
import { Screen6Question3 } from "@/components/screens/screen-6-question-3"
import { Screen7Result } from "@/components/screens/screen-7-result"
import { Screen8Relief } from "@/components/screens/screen-8-relief"
import { Screen9Transition } from "@/components/screens/screen-9-transition"
import { playChoiceSound } from "@/lib/play-choice-sound"

const PROGRESS_MAP: Record<number, number> = {
  1: 5,
  2: 15,
  3: 20,
  4: 35,
  5: 55,
  6: 75,
  7: 95,
  8: 100,
  9: 100,
}

export interface Answers {
  question1?: "A" | "B" | "C"
  question2?: "A" | "B" | "C"
  question3?: "A" | "B" | "C"
}

export default function DiagnosticPage() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>({})
  const router = useRouter()

  const nextStep = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, 9))
  }, [])

  const handleAnswer = useCallback((question: keyof Answers, answer: "A" | "B" | "C") => {
    playChoiceSound()
    setAnswers((prev) => ({ ...prev, [question]: answer }))
  }, [])

  const handleFinalCTA = useCallback(() => {
    router.push("/revelacao")
  }, [router])

  const progress = PROGRESS_MAP[step] || 5

  return (
    <main className="min-h-screen bg-background max-w-[100vw] overflow-x-hidden relative">
      <MatrixBackground />
      <ProgressBar progress={progress} />
      
      <div className="max-w-[420px] mx-auto px-4 sm:px-6 py-8 min-h-screen flex flex-col justify-center relative z-10">
        <ScreenWrapper step={step}>
          {step === 1 && <Screen1Opening onNext={nextStep} />}
          {step === 2 && <Screen2GuiltBreak onNext={nextStep} />}
          {step === 3 && <Screen3Instruction onNext={nextStep} />}
          {step === 4 && (
            <Screen4Question1
              onAnswer={(answer) => handleAnswer("question1", answer)}
              selectedAnswer={answers.question1}
              onNext={nextStep}
            />
          )}
          {step === 5 && (
            <Screen5Question2
              onAnswer={(answer) => handleAnswer("question2", answer)}
              selectedAnswer={answers.question2}
              onNext={nextStep}
            />
          )}
          {step === 6 && (
            <Screen6Question3
              onAnswer={(answer) => handleAnswer("question3", answer)}
              selectedAnswer={answers.question3}
              onNext={nextStep}
            />
          )}
          {step === 7 && <Screen7Result onNext={nextStep} />}
          {step === 8 && <Screen8Relief onNext={nextStep} />}
          {step === 9 && <Screen9Transition onFinish={handleFinalCTA} />}
        </ScreenWrapper>
      </div>
    </main>
  )
}
