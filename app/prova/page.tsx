"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BadgeCheck, Play, Pause } from "lucide-react";
import { MatrixBackground } from "@/components/matrix-background";

export default function ProvaPage() {
  const router = useRouter();
  const [visibleSections, setVisibleSections] = useState<boolean[]>(
    Array(8).fill(false)
  );
  const [sealAnimated, setSealAnimated] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });

              if (index === 6) {
                setTimeout(() => setSealAnimated(true), 300);
              }
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white font-sans max-w-[100vw] overflow-x-hidden relative">
      <MatrixBackground />
      <div className="max-w-[420px] mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* TELA 1 - ENTRADA NA SALA FINAL */}
        <section
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          className={`min-h-[80vh] flex flex-col items-center justify-center text-center transition-all duration-700 ${
            visibleSections[0]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Portão semiaberto com luz */}
          <div className="relative w-48 h-64 mb-8">
            {/* Luz central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-full bg-gradient-to-t from-[#22C55E]/20 via-[#22C55E]/10 to-transparent blur-xl" />
            </div>
            {/* Portão esquerdo */}
            <div className="absolute left-0 top-0 w-20 h-full bg-[#121218] border-r border-[#1F1F2B] transform -skew-y-3 origin-left" />
            {/* Portão direito */}
            <div className="absolute right-0 top-0 w-20 h-full bg-[#121218] border-l border-[#1F1F2B] transform skew-y-3 origin-right" />
            {/* Luz saindo */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#22C55E]/30 to-transparent blur-md" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-2 break-words">
            Antes de ativar sua própria API...
          </h1>
          <p className="text-2xl sm:text-3xl font-bold text-[#22C55E] mb-6">
            Veja isso.
          </p>
          <p className="text-[#A1A1AA] text-lg">
            Essas pessoas estavam travadas exatamente onde vc estava.
          </p>
        </section>

        {/* TELA 2 - QUEBRA DA CRENÇA DA EXCEÇÃO */}
        <section
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
          className={`py-16 transition-all duration-700 delay-100 ${
            visibleSections[1]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[#A1A1AA] text-lg mb-6">
            Quase todo mundo chega aqui pensando a mesma coisa.
          </p>

          <div className="space-y-3 mb-12">
            <p className="text-white text-xl italic">
              &quot;Meu caso é diferente.&quot;
            </p>
            <p className="text-white text-xl italic">
              &quot;Meu número é mais complicado.&quot;
            </p>
            <p className="text-white text-xl italic">
              &quot;Pra eles funcionou, pra mim não vai.&quot;
            </p>
          </div>

          <div className="mt-16 space-y-4">
            <p className="text-white text-lg">
              Mark, o Guardião da Meta, adora essa crença.
            </p>
            <p className="text-[#A1A1AA]">
              Pq enquanto vc acha que é exceção...
            </p>
            <p className="text-[#22C55E] font-medium">
              ...vc não atravessa o portão.
            </p>
          </div>
        </section>

        {/* TELA 3 - PRINTS REAIS */}
        <section
          ref={(el) => {
            sectionRefs.current[2] = el;
          }}
          className={`py-16 transition-all duration-700 delay-100 ${
            visibleSections[2]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-4">
            {/* Card 1 */}
            <div className="bg-[#121218] border border-[#1F1F2B] rounded-lg p-4">
              <p className="text-sm text-[#A1A1AA] mb-3">Número aprovado</p>
              <div className="w-full aspect-video bg-[#1F1F2B] rounded flex items-center justify-center">
                <span className="text-[#A1A1AA] text-sm">
                  Print: Aprovação Meta
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#121218] border border-[#1F1F2B] rounded-lg p-4">
              <p className="text-sm text-[#A1A1AA] mb-3">Webhook ativo</p>
              <div className="w-full aspect-video bg-[#1F1F2B] rounded flex items-center justify-center">
                <span className="text-[#A1A1AA] text-sm">
                  Print: Webhook Status
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#121218] border border-[#1F1F2B] rounded-lg p-4">
              <p className="text-sm text-[#A1A1AA] mb-3">Mensagem entregue</p>
              <div className="w-full aspect-video bg-[#1F1F2B] rounded flex items-center justify-center">
                <span className="text-[#A1A1AA] text-sm">
                  Print: Mensagem Enviada
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <p className="text-white">Mesmo processo.</p>
            <p className="text-white">Mesmas regras.</p>
            <p className="text-[#22C55E] font-medium">Resultados diferentes.</p>
          </div>

          <p className="text-sm text-[#A1A1AA] mt-6">
            Nenhum desses usuários é dev avançado.
          </p>
        </section>

        {/* TELA 4 - MINI VÍDEO */}
        <section
          ref={(el) => {
            sectionRefs.current[3] = el;
          }}
          className={`py-16 transition-all duration-700 delay-100 ${
            visibleSections[3]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white text-lg mb-6">Agora veja isso funcionando.</p>

          <div
            className="relative w-full aspect-video bg-[#121218] border border-[#1F1F2B] rounded-lg overflow-hidden cursor-pointer"
            onClick={toggleVideo}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleVideo();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={isVideoPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src="/videos/demo.mp4" type="video/mp4" />
            </video>

            {!isVideoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-16 h-16 rounded-full bg-[#22C55E] flex items-center justify-center">
                  <Play className="w-8 h-8 text-[#0B0B0E] ml-1" />
                </div>
              </div>
            )}

            {isVideoPlaying && (
              <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Pause className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          <div className="mt-8 space-y-2">
            <p className="text-white">Isso não é demo.</p>
            <p className="text-[#22C55E] font-medium">É sistema funcionando.</p>
          </div>
        </section>

        {/* TELA 5 - VALIDAÇÃO TÉCNICA */}
        <section
          ref={(el) => {
            sectionRefs.current[4] = el;
          }}
          className={`py-16 transition-all duration-700 delay-100 ${
            visibleSections[4]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white text-lg mb-4">
            Tudo isso roda dentro das regras oficiais da Meta.
          </p>

          <div className="space-y-2 text-[#A1A1AA] mb-8">
            <p>Sem API paralela.</p>
            <p>Sem gambiarra.</p>
            <p>Sem risco de bloqueio.</p>
          </div>

          <div className="mt-12 space-y-2">
            <p className="text-white">O mesmo Guardião.</p>
            <p className="text-white">O mesmo portão.</p>
            <p className="text-[#22C55E] font-medium">O que muda é o mapa.</p>
          </div>
        </section>

        {/* TELA 6 - IDENTIFICAÇÃO FINAL */}
        <section
          ref={(el) => {
            sectionRefs.current[5] = el;
          }}
          className={`py-16 transition-all duration-700 delay-100 ${
            visibleSections[5]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-3 text-xl">
            <p className="text-white font-medium">
              Essas pessoas não passaram pq sabiam mais.
            </p>
            <p className="text-white">
              Elas passaram pq pararam de tentar adivinhar...
            </p>
            <p className="text-[#22C55E] font-medium">
              ...e começaram a seguir.
            </p>
          </div>

          <p className="text-white text-lg mt-16">
            Agora vc também sabe o caminho.
          </p>
        </section>

        {/* TELA 7 - SELO DE CONCLUSÃO */}
        <section
          ref={(el) => {
            sectionRefs.current[6] = el;
          }}
          className={`py-16 flex flex-col items-center justify-center text-center transition-all duration-700 delay-100 ${
            visibleSections[6]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className={`transition-all duration-500 ${
              sealAnimated ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <BadgeCheck className="w-20 h-20 text-[#22C55E] mx-auto mb-6" />

            <p className="text-2xl font-bold text-[#22C55E] mb-4">
              ACESSO LIBERADO
            </p>

            <div className="space-y-1 text-[#A1A1AA]">
              <p>Prova validada.</p>
              <p>Sistema confirmado.</p>
            </div>
          </div>
        </section>

        {/* TELA 8 - TRANSIÇÃO PARA OFERTA */}
        <section
          ref={(el) => {
            sectionRefs.current[7] = el;
          }}
          className={`py-16 pb-32 transition-all duration-700 delay-100 ${
            visibleSections[7]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-3 text-lg">
            <p className="text-white">
              Daqui pra frente, vc tem duas opções.
            </p>
            <p className="text-[#A1A1AA]">Continuar tentando sozinho...</p>
            <p className="text-white">...ou ativar sua API agora...</p>
            <p className="text-[#22C55E] font-medium">
              ...com o caminho já validado.
            </p>
          </div>
        </section>

        {/* CTA FIXO */}
        {visibleSections[6] && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/95 to-transparent z-50">
            <div className="max-w-[420px] mx-auto">
              <button
                type="button"
                onClick={() => router.push("/sales")}
                className="w-full min-h-[52px] bg-[#22C55E] hover:bg-[#16A34A] text-[#0B0B0E] font-semibold text-lg rounded-lg transition-colors"
                aria-label="Ativar minha API agora"
              >
                Ativar minha API agora
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
