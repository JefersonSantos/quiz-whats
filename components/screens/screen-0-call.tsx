"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { PhoneCall, PhoneIncoming, PhoneOff } from "lucide-react"

interface Screen0CallProps {
  onCallFinished: () => void
}

type CallStatus = "incoming" | "active" | "ended"

export function Screen0Call({ onCallFinished }: Screen0CallProps) {
  const [status, setStatus] = useState<CallStatus>("incoming")
  const [seconds, setSeconds] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const vibrationRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Formata duração mm:ss
  const formattedTime = useMemo(() => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }, [seconds])

  // Vibração enquanto está chamando
  useEffect(() => {
    if (typeof window === "undefined" || !("vibrate" in window.navigator)) return
    if (status !== "incoming") {
      if (vibrationRef.current) {
        window.navigator.vibrate(0)
        vibrationRef.current = null
      }
      return
    }

    // Padrão de vibração suave intermitente
    const vibrate = () => window.navigator.vibrate([120, 180, 120, 600])
    vibrate()
    const id = window.setInterval(vibrate, 1200)
    vibrationRef.current = id

    return () => {
      window.clearInterval(id)
      window.navigator.vibrate(0)
    }
  }, [status])

  // Inicia o áudio da chamada atendida e o cronômetro
  const startCall = () => {
    if (status !== "incoming") return
    setStatus("active")

    // Cronômetro
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    // Áudio da chamada (coloque o arquivo em /public/audio/ligacao.mp3)
    const audio = new Audio("/audio/ligacao.mp3")
    audioRef.current = audio
    audio.play().catch(() => {
      // Se falhar, ainda finalizamos após alguns segundos
    })

    audio.addEventListener("ended", handleHangup)
  }

  const handleHangup = () => {
    if (status === "ended") return
    setStatus("ended")
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    audioRef.current?.removeEventListener("ended", handleHangup)
    audioRef.current?.pause()
    audioRef.current = null
    // Pequeno delay para mostrar o estado de encerrado antes de seguir
    setTimeout(() => onCallFinished(), 800)
  }

  // Cleanup geral
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      audioRef.current?.removeEventListener("ended", handleHangup)
      audioRef.current?.pause()
      audioRef.current = null
      if (vibrationRef.current) {
        window.clearInterval(vibrationRef.current)
        window.navigator.vibrate(0)
      }
    }
  }, [])

  return (
    <div className="flex flex-col gap-8 items-center text-center">
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          Urgente⚠️
        </span>
        <h1 className="text-2xl font-bold text-foreground">Whatsapp Business API</h1>
        <p className="text-muted-foreground text-sm">
          iPhone • 4G • 72%
        </p>
      </div>

      <div className="w-full bg-[#0C0C12] border border-[#1F1F2B] rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center text-3xl font-semibold text-[#0B0B0E]">
            WA
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white">Jeferson Bassan</p>
            <p className="text-sm text-[#A1A1AA]">+55 (71) 99180-4605</p>
          </div>

          {status === "incoming" && (
            <p className="text-sm text-[#F59E0B] flex items-center gap-2">
              <PhoneIncoming className="w-4 h-4" />
              Chamando...
            </p>
          )}

          {status === "active" && (
            <p className="text-sm text-[#22C55E] flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              {formattedTime}
            </p>
          )}

          {status === "ended" && (
            <p className="text-sm text-[#F97316] flex items-center gap-2">
              <PhoneOff className="w-4 h-4" />
              Chamada encerrada
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 w-full">
        {status === "incoming" && (
          <>
            <button
              type="button"
              onClick={handleHangup}
              className="w-16 h-16 rounded-full bg-[#EF4444] flex items-center justify-center text-white text-xl shadow-lg active:scale-95 transition-transform"
              aria-label="Recusar"
            >
              <PhoneOff className="w-7 h-7" />
            </button>
            <button
              type="button"
              onClick={startCall}
              className="w-16 h-16 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-xl shadow-lg active:scale-95 transition-transform"
              aria-label="Atender"
            >
              <PhoneCall className="w-7 h-7" />
            </button>
          </>
        )}

        {status === "active" && (
          <button
            type="button"
            onClick={handleHangup}
            className="w-16 h-16 rounded-full bg-[#EF4444] flex items-center justify-center text-white text-xl shadow-lg active:scale-95 transition-transform"
            aria-label="Encerrar"
          >
            <PhoneOff className="w-7 h-7" />
          </button>
        )}

        {status === "ended" && (
          <div className="text-sm text-muted-foreground">Indo para o diagnóstico...</div>
        )}
      </div>
    </div>
  )
}


