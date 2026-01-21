let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  const Ctx = window.AudioContext || (window as any).webkitAudioContext
  if (!Ctx) return null
  if (!audioCtx) audioCtx = new Ctx()
  return audioCtx
}

/**
 * Som curto e discreto de "seleção" (sem depender de arquivos em /public).
 * Observação: navegadores podem bloquear áudio até a primeira interação do usuário.
 */
export function playChoiceSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    // Se o contexto estiver suspenso, tentar retomar.
    if (ctx.state === "suspended") void ctx.resume()

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    // "Click" suave: frequência alta e envelope curto.
    osc.type = "triangle"
    osc.frequency.setValueAtTime(880, now)
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.03)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.07)
  } catch {
    // Silencioso por design (não quebrar UX caso o browser bloqueie áudio).
  }
}


