"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Check,
  Star,
  Shield,
  Zap,
  MessageSquare,
  Clock,
  Users,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { MatrixBackground } from "@/components/matrix-background";

export default function SalesPage() {
  const router = useRouter();
  const [faqOpen, setFaqOpen] = useState<number[]>([]);
  const [showFixedCta, setShowFixedCta] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setShowFixedCta(scrollPercent > 0.2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleSections((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setFaqOpen((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCta = () => {
    router.push("/checkout");
  };

  const faqItems = [
    {
      question: "Preciso ser dev?",
      answer:
        "Não. O Tools Typesend foi criado justamente para quem não é desenvolvedor. Todas as etapas são explicadas de forma clara, sem jargão técnico desnecessário.",
    },
    {
      question: "Meu número pode ser bloqueado?",
      answer:
        "Seguindo o processo oficial que ensinamos, o risco de bloqueio é praticamente zero. Você estará usando a API oficial da Meta, da forma correta.",
    },
    {
      question: "Funciona pra pequenos negócios?",
      answer:
        "Sim. Na verdade, foi pensado especialmente para empreendedores, freelancers e pequenas agências que precisam de automação profissional sem complexidade.",
    },
    {
      question: "Quanto tempo até funcionar?",
      answer:
        "A maioria dos usuários consegue ativar a API em poucas horas. O processo completo de configuração pode levar de 1 a 7 dias, dependendo da aprovação da Meta.",
    },
    {
      question: "É API oficial?",
      answer:
        "Sim, 100% oficial. Você estará conectado diretamente à WhatsApp Business API através dos canais oficiais da Meta.",
    },
  ];

  const getSectionClass = (index: number) =>
    `transition-all duration-700 ${
      visibleSections.has(index)
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-8"
    }`;

  return (
    <main className="min-h-screen bg-[#0B0B0E] text-white max-w-[100vw] overflow-x-hidden relative">
      <MatrixBackground />
      <div className="max-w-[420px] mx-auto px-4 sm:px-6 pb-32 relative z-10">
        {/* Section 1: Headline */}
        <section
          ref={(el) => { sectionRefs.current[0] = el; }}
          className={`pt-12 pb-10 ${getSectionClass(0)}`}
        >
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-balance">
            A WhatsApp Business API não é difícil.
            <br />
            <span className="text-[#A1A1AA]">
              Ela só foi feita pra confundir quem está começando.
            </span>
          </h1>
          <p className="mt-6 text-[#A1A1AA] text-base leading-relaxed">
            Ative sua API oficial, sem gambiarra, sem risco de bloqueio e sem
            precisar virar dev expert.
          </p>
          <button
            onClick={handleCta}
            className="mt-8 w-full bg-[#22C55E] hover:bg-[#1ea550] text-[#0B0B0E] font-semibold py-4 px-6 rounded-lg min-h-[44px] transition-colors flex items-center justify-center gap-2"
          >
            <span>Ativar minha API agora</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>

        {/* Section 2: Frustration Mirror */}
        <section
          ref={(el) => { sectionRefs.current[1] = el; }}
          className={`py-10 ${getSectionClass(1)}`}
        >
          <div className="bg-[#121218] border border-[#1F1F2B] rounded-xl p-6">
            <p className="text-white text-base leading-relaxed">
              Se vc já tentou ativar a WhatsApp Business API, provavelmente
              passou por pelo menos um desses cenários:
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Abriu a documentação oficial.",
                "Leu algumas páginas.",
                "Fechou com mais dúvidas do que respostas.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[#A1A1AA] text-sm"
                >
                  <span className="text-[#22C55E] mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-[#1F1F2B]">
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                Ou então tentou seguir um tutorial no YouTube…
              </p>
              <p className="text-[#A1A1AA] text-sm leading-relaxed mt-2">
                que parecia simples no vídeo,
              </p>
              <p className="text-[#A1A1AA] text-sm leading-relaxed mt-2">
                mas travou completamente quando chegou na sua vez.
              </p>
            </div>
            <p className="mt-6 text-[#22C55E] font-semibold text-lg">
              O problema nunca foi vc.
            </p>
          </div>
        </section>

        {/* Section 3: The Villain */}
        <section
          ref={(el) => { sectionRefs.current[2] = el; }}
          className={`py-10 ${getSectionClass(2)}`}
        >
          <p className="text-white text-base leading-relaxed">
            Existe um motivo claro pra tanta gente travar.
          </p>
          <p className="mt-2 text-[#22C55E] font-semibold text-xl">
            A burocracia da Meta.
          </p>

          <div className="mt-8 bg-[#121218] border border-[#1F1F2B] rounded-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-[#1F1F2B] rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#A1A1AA]" />
            </div>
            <p className="mt-4 text-[#A1A1AA] text-sm italic">
              Mark, o Guardião da Meta.
            </p>
          </div>

          <div className="mt-6 space-y-3 text-[#A1A1AA] text-base leading-relaxed">
            <p>Ele não te impede diretamente.</p>
            <p>
              Ele cria um sistema confuso o suficiente pra vc desistir sozinho.
            </p>
          </div>

          <ul className="mt-6 space-y-3">
            {[
              "Documentação fragmentada",
              "Termos técnicos sem contexto",
              "Etapas fora de ordem",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-[#A1A1AA] text-sm bg-[#121218] border border-[#1F1F2B] rounded-lg p-4"
              >
                <span className="text-red-400">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 4: Plot Twist */}
        <section
          ref={(el) => { sectionRefs.current[3] = el; }}
          className={`py-10 ${getSectionClass(3)}`}
        >
          <p className="text-[#A1A1AA] text-base">
            Aqui está a verdade que quase ninguém te conta:
          </p>

          <div className="mt-6 bg-[#121218] border border-[#22C55E]/30 rounded-xl p-6">
            <p className="text-white text-lg font-semibold leading-relaxed">
              A WhatsApp Business API não foi feita pra ser difícil.
            </p>
            <p className="mt-2 text-[#22C55E] text-lg font-semibold">
              Ela foi feita pra ser controlada.
            </p>
          </div>

          <div className="mt-6 space-y-3 text-[#A1A1AA] text-base leading-relaxed">
            <p>Quem entende o fluxo, passa.</p>
            <p>Quem tenta adivinhar, fica batendo no portão.</p>
          </div>
        </section>

        {/* Section 5: Solution - Typesend */}
        <section
          ref={(el) => { sectionRefs.current[4] = el; }}
          className={`py-10 ${getSectionClass(4)}`}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
            Typesend é o tradutor entre vc e a WhatsApp Business API.
          </h2>

          <div className="mt-6 space-y-2 text-[#A1A1AA] text-base">
            <p>Nada de hacks.</p>
            <p>Nada de atalhos perigosos.</p>
            <p>Nada de gambiarra.</p>
          </div>

          <div className="mt-8 bg-[#121218] border border-[#22C55E]/30 rounded-xl p-6">
            <p className="text-white text-base font-medium flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
              Ativar sua WhatsApp Business API oficial, com segurança, clareza e
              rapidez.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            {[
              { icon: FileCheck, title: "Aprovação sem mistério" },
              { icon: Zap, title: "Conexão técnica traduzida" },
              { icon: MessageSquare, title: "Mensagens funcionando de verdade" },
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-[#121218] border border-[#1F1F2B] rounded-xl p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-[#22C55E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <pillar.icon className="w-6 h-6 text-[#22C55E]" />
                </div>
                <p className="text-white font-medium">{pillar.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: How it Works */}
        <section
          ref={(el) => { sectionRefs.current[5] = el; }}
          className={`py-10 ${getSectionClass(5)}`}
        >
          <h2 className="text-xl font-bold text-white mb-6">Como funciona</h2>

          <div className="space-y-4">
            {[
              {
                phase: "FASE 1",
                days: "Dias 1 a 30",
                desc: "Ativação correta do número + estrutura oficial",
              },
              {
                phase: "FASE 2",
                days: "Dias 31 a 60",
                desc: "Configuração guiada do fluxo técnico",
              },
              {
                phase: "FASE 3",
                days: "Dias 61 a 90",
                desc: "Mensagens e automações rodando",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#121218] border border-[#1F1F2B] rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#22C55E] text-xs font-bold bg-[#22C55E]/10 px-2 py-1 rounded">
                    {item.phase}
                  </span>
                  <span className="text-[#A1A1AA] text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.days}
                  </span>
                </div>
                <p className="text-white text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-[#A1A1AA] text-sm">
            <p>Sem pular etapas.</p>
            <p>Sem tentar adivinhar o próximo passo.</p>
          </div>
        </section>

        {/* Section 7: Social Proof */}
        <section
          ref={(el) => { sectionRefs.current[6] = el; }}
          className={`py-10 ${getSectionClass(6)}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-[#22C55E]" />
            <p className="text-white text-base font-medium">
              Mais de 20 usuários já ativaram suas APIs usando o Tools Typesend.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Empreendedores", "Freelancers", "Agências pequenas", "Gestores de tráfego"].map(
              (tag, i) => (
                <span
                  key={i}
                  className="text-xs text-[#A1A1AA] bg-[#1F1F2B] px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="space-y-4">
            {[
              "Eu estava travado há quase 2 meses. Em poucos minutos, minha API estava ativa.",
              "Parecia impossível até alguém explicar do jeito certo.",
              "Finalmente sem medo de bloqueio.",
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-[#121218] border border-[#1F1F2B] rounded-xl p-5"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-[#22C55E] text-[#22C55E]"
                    />
                  ))}
                </div>
                <p className="text-[#A1A1AA] text-sm italic">"{testimonial}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Offer */}
        <section
          ref={(el) => { sectionRefs.current[7] = el; }}
          className={`py-10 ${getSectionClass(7)}`}
        >
          <div className="bg-[#121218] border-2 border-[#22C55E]/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">
              O QUE VC RECEBE
            </h3>

            <ul className="space-y-4">
              {[
                "Acesso completo ao Tools Typesend",
                "Ativação guiada da WhatsApp Business API",
                "Estrutura oficial, sem risco",
                "Suporte e atualizações",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-[#1F1F2B]">
              <div className="flex items-center gap-2 text-[#22C55E] text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>BÔNUS: Checklist de ativação oficial</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1F1F2B]">
              <p className="text-[#A1A1AA] text-sm line-through">De R$ 297</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-white">R$ 97</span>
                <span className="text-[#A1A1AA] text-sm">à vista</span>
              </div>
              <p className="text-[#A1A1AA] text-xs mt-1">ou 12x de R$ 9,70</p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[#A1A1AA] text-xs">
              <Shield className="w-4 h-4" />
              <span>Teste por 7 dias. Ou seu dinheiro de volta.</span>
            </div>

            <button
              onClick={handleCta}
              className="mt-6 w-full bg-[#22C55E] hover:bg-[#1ea550] text-[#0B0B0E] font-semibold py-4 px-6 rounded-lg min-h-[44px] transition-colors"
            >
              Quero ativar minha API
            </button>
          </div>
        </section>

        {/* Section 9: FAQ */}
        <section
          ref={(el) => { sectionRefs.current[8] = el; }}
          className={`py-10 ${getSectionClass(8)}`}
        >
          <h2 className="text-xl font-bold text-white mb-6">
            Perguntas frequentes
          </h2>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="bg-[#121218] border border-[#1F1F2B] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  aria-expanded={faqOpen.includes(i)}
                  className="w-full flex items-center justify-between p-5 text-left min-h-[44px]"
                >
                  <span className="text-white text-sm font-medium pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#A1A1AA] flex-shrink-0 transition-transform ${
                      faqOpen.includes(i) ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {faqOpen.includes(i) && (
                  <div className="px-5 pb-5">
                    <p className="text-[#A1A1AA] text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 10: Final CTA */}
        <section
          ref={(el) => { sectionRefs.current[9] = el; }}
          className={`py-10 ${getSectionClass(9)}`}
        >
          <div className="space-y-3 text-[#A1A1AA] text-base leading-relaxed">
            <p>Vc já tentou sozinho.</p>
            <p>Já travou.</p>
            <p>Já se frustrou.</p>
          </div>

          <p className="mt-6 text-white text-lg font-medium">
            Agora vc tem duas opções.
          </p>

          <div className="mt-6 bg-[#121218] border border-[#22C55E]/30 rounded-xl p-6">
            <p className="text-[#22C55E] font-semibold text-lg">
              Atravessar o portão com o mapa certo.
            </p>
          </div>

          <button
            onClick={handleCta}
            className="mt-8 w-full bg-[#22C55E] hover:bg-[#1ea550] text-[#0B0B0E] font-bold py-5 px-6 rounded-xl min-h-[56px] transition-colors text-base flex items-center justify-center gap-2"
          >
            <span>ATIVAR MINHA WHATSAPP BUSINESS API AGORA</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>
      </div>

      {/* Fixed CTA Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#121218]/95 backdrop-blur-md border-t border-[#1F1F2B] p-4 transition-transform duration-300 z-50 ${
          showFixedCta ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-[420px] mx-auto flex items-center justify-between gap-4">
          <p className="text-[#A1A1AA] text-xs hidden sm:block">
            API oficial, sem risco de bloqueio
          </p>
          <button
            onClick={handleCta}
            className="flex-1 sm:flex-none bg-[#22C55E] hover:bg-[#1ea550] text-[#0B0B0E] font-semibold py-3 px-6 rounded-lg min-h-[44px] transition-colors text-sm"
          >
            Ativar agora
          </button>
        </div>
      </div>
    </main>
  );
}
