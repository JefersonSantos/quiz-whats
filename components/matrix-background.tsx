"use client"

import { useEffect, useRef } from "react"

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const chars = "01"
    const charArray = chars.split("")
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    // Randomize initial positions
    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      ctx.fillStyle = "rgba(11, 11, 14, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#22C55E"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Vary the opacity for depth effect
        const opacity = Math.random() * 0.4 + 0.3
        ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`
        ctx.fillText(char, x, y)

        // Add brighter leading character
        if (Math.random() > 0.98) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
          ctx.fillText(char, x, y)
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
