"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Key, ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, Bell, Search, Menu, User, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { MatrixBackground } from "@/components/matrix-background"
import { useSearchParams } from "next/navigation"
import Loading from "./loading"

const YOUTUBE_VIDEO_ID = "A_lSPfZiKxo"

const CHECKPOINTS = [
  { time: 45, text: "O problema nunca foi você. Foi o caminho." },
  { time: 90, text: "Existem 3 portões. Ordem importa." },
  { time: 135, text: "Aprovação do número não é só formulário." },
  { time: 180, text: "Webhook não é bicho de sete cabeças." },
  { time: 225, text: "Mensagens só funcionam quando os portões anteriores estão certos." },
  { time: 270, text: "Não é hackear. É traduzir." },
  { time: 315, text: "Você não precisa de sorte. Precisa de mapa." },
]

const FAKE_COMMENTS = [
  { user: "TechDev Brasil", time: "2 dias atrás", text: "Finalmente alguém explicou direito! Valeu demais.", likes: 47 },
  { user: "Marina Santos", time: "1 dia atrás", text: "Cara, eu estava travado há semanas. Isso aqui salvou meu projeto.", likes: 23 },
  { user: "João Pedro Dev", time: "18 horas atrás", text: "API funcionando aqui! Obrigado!", likes: 15 },
]

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string
          playerVars?: Record<string, number | string>
          events?: {
            onReady?: (event: { target: YouTubePlayer }) => void
            onStateChange?: (event: { data: number }) => void
          }
        }
      ) => YouTubePlayer
      PlayerState: {
        PLAYING: number
        PAUSED: number
        ENDED: number
      }
    }
    onYouTubeIframeAPIReady: () => void
  }
}

interface YouTubePlayer {
  playVideo: () => void
  pauseVideo: () => void
  getCurrentTime: () => number
  getDuration: () => number
  destroy: () => void
}

export default function RevelacaoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const playerRef = useRef<YouTubePlayer | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeCheckpoints, setActiveCheckpoints] = useState<number[]>([])
  const [showCTA, setShowCTA] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const [comment, setComment] = useState("")
  const [commentSubmitted, setCommentSubmitted] = useState(false)
  const [showCommentError, setShowCommentError] = useState(false)

  const updateProgress = useCallback(() => {
    if (!playerRef.current) return
    
    const currentTime = playerRef.current.getCurrentTime()
    const duration = playerRef.current.getDuration() || 1
    const progressPercent = (currentTime / duration) * 100
    setProgress(progressPercent)

    // Activate checkpoints based on current time
    const newActiveCheckpoints = CHECKPOINTS
      .map((cp, index) => (currentTime >= cp.time ? index : -1))
      .filter((i) => i !== -1)
    setActiveCheckpoints(newActiveCheckpoints)

    // Show CTA after 80% progress
    if (progressPercent >= 80) {
      setShowCTA(true)
    }
  }, [])

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            setPlayerReady(true)
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true)
              intervalRef.current = setInterval(updateProgress, 500)
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
              if (intervalRef.current) {
                clearInterval(intervalRef.current)
              }
            } else if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false)
              setShowCTA(true)
              if (intervalRef.current) {
                clearInterval(intervalRef.current)
              }
            }
          },
        },
      })
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [updateProgress])

  const handleCommentSubmit = () => {
    if (comment.toUpperCase().trim() === "API") {
      setCommentSubmitted(true)
      setShowCommentError(false)
    } else {
      setShowCommentError(true)
    }
  }

  const handleTransition = () => {
    router.push("/prova")
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] max-w-[100vw] overflow-x-hidden relative">
      <MatrixBackground />
      
      {/* YouTube-style Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] border-b border-[#303030]">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 text-white" />
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3-.07-2.49-.1 3.59-.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                </svg>
              </div>
              <span className="text-white text-xl font-semibold tracking-tight">YouTube</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-white" />
            <Bell className="w-5 h-5 text-white" />
            <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center">
              <User className="w-5 h-5 text-[#0f0f0f]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-14 pb-12 relative z-10">
        {/* YouTube Player */}
        <div className="relative aspect-video w-full bg-black">
          <div id="youtube-player" className="w-full h-full" />
          
          {/* Loading State */}
          {!playerReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Video Info Section */}
        <div className="px-3 py-3 bg-[#0f0f0f]">
          <h1 className="text-white text-base font-medium leading-snug mb-2">
            WhatsApp Business API - O Mapa Completo para Ativação
          </h1>
          <div className="flex items-center gap-2 text-xs text-[#aaaaaa] mb-3">
            <span>12K visualizações</span>
            <span>•</span>
            <span>há 3 dias</span>
          </div>

          {/* Channel Info */}
          <div className="flex items-center justify-between py-3 border-t border-b border-[#303030]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16a34a] flex items-center justify-center">
                <span className="text-white font-bold text-sm">WA</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">WhatsApp API Expert</p>
                <p className="text-[#aaaaaa] text-xs">24.5K inscritos</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full">
              Inscrever-se
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 py-3 overflow-x-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#272727] rounded-full">
              <ThumbsUp className="w-4 h-4 text-white" />
              <span className="text-white text-sm">3.2K</span>
              <div className="w-px h-4 bg-[#505050]" />
              <ThumbsDown className="w-4 h-4 text-white" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#272727] rounded-full">
              <Share2 className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Compartilhar</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#272727] rounded-full">
              <Download className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Download</span>
            </button>
            <button className="p-2 bg-[#272727] rounded-full">
              <MoreHorizontal className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Checkpoints Section */}
        <div className="px-3 py-4 bg-[#0f0f0f] border-t border-[#303030]">
          <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
            <Key className="w-4 h-4 text-[#22C55E]" />
            Checkpoints do Vídeo
          </h3>
          <div className="space-y-2">
            {CHECKPOINTS.map((checkpoint, index) => {
              const isActive = activeCheckpoints.includes(index)
              return (
                <div
                  key={index}
                  className={`
                    p-3 rounded-lg transition-all duration-300
                    ${isActive 
                      ? "bg-[#22C55E]/10 border border-[#22C55E]/30" 
                      : "bg-[#272727] border border-transparent opacity-50"
                    }
                  `}
                >
                  <p className={`text-xs ${isActive ? "text-white" : "text-[#aaaaaa]"}`}>
                    {checkpoint.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Comments Section */}
        <div className="px-3 py-4 bg-[#0f0f0f] border-t border-[#303030]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-sm font-medium">Comentários <span className="text-[#aaaaaa]">847</span></h3>
            <button className="text-white text-xs flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
              </svg>
              Ordenar
            </button>
          </div>

          {/* Add Comment */}
          <div className="flex gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-[#0f0f0f]" />
            </div>
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value)
                    setShowCommentError(false)
                  }}
                  placeholder="Digite 'API' para continuar..."
                  className="w-full bg-transparent border-b border-[#303030] focus:border-[#22C55E] text-white text-sm py-2 pr-10 outline-none placeholder:text-[#aaaaaa] transition-colors"
                  disabled={commentSubmitted}
                />
                <button
                  onClick={handleCommentSubmit}
                  disabled={!comment.trim() || commentSubmitted}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                    comment.trim() && !commentSubmitted
                      ? "text-[#22C55E] hover:bg-[#22C55E]/10"
                      : "text-[#505050]"
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {showCommentError && (
                <p className="text-red-500 text-xs mt-2">Digite "API" para desbloquear o próximo passo</p>
              )}
              {commentSubmitted && (
                <p className="text-[#22C55E] text-xs mt-2 flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Comentário enviado! Próximo passo desbloqueado.
                </p>
              )}
            </div>
          </div>

          {/* Existing Comments */}
          <div className="space-y-4">
            {FAKE_COMMENTS.map((c, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#303030] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-medium">{c.user.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-xs font-medium">@{c.user.replace(/\s/g, "")}</span>
                    <span className="text-[#aaaaaa] text-xs">{c.time}</span>
                  </div>
                  <p className="text-white text-sm mb-2">{c.text}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-[#aaaaaa]">
                      <ThumbsUp className="w-3 h-3" />
                      <span className="text-xs">{c.likes}</span>
                    </button>
                    <button className="text-[#aaaaaa]">
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                    <button className="text-[#aaaaaa] text-xs">Responder</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Only shows after commenting "API" */}
        {commentSubmitted && (
          <div className="px-3 py-6 bg-[#0f0f0f] border-t border-[#303030]">
            {/* Checkpoint Badge */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20">
                <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-sm text-[#22C55E] font-medium">Checkpoint alcançado</span>
              </div>
            </div>

            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white mb-2">
                Mapa revelado
              </h2>
              <p className="text-[#aaaaaa] text-sm leading-relaxed">
                Na próxima etapa, você vai ver esse caminho funcionando.
                <br />
                Números reais. Mensagens reais. Automações rodando.
              </p>
            </div>

            <button
              onClick={handleTransition}
              className="w-full min-h-[44px] px-6 py-3 rounded-full bg-[#22C55E] text-[#0f0f0f] font-semibold text-base transition-all hover:bg-[#22C55E]/90 hover:shadow-lg hover:shadow-[#22C55E]/20 active:scale-[0.98]"
              aria-label="Ver ativações reais funcionando"
            >
              Ver ativações reais funcionando
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
