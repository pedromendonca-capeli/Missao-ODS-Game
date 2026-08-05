import { useState, useEffect, useRef } from "react";

// ─── SDG Data ────────────────────────────────────────────────────────────────

const SDGs = [
  { id: 1, name: "Erradicação da Pobreza", color: "#E5243B", emoji: "🏠", icon: "👐", desc: "Acabar com a pobreza em todas as suas formas, em todos os lugares.", goal: "Identificar causas e soluções para a pobreza extrema.", xp: 100 },
  { id: 2, name: "Fome Zero", color: "#DDA63A", emoji: "🌾", icon: "🍽️", desc: "Acabar com a fome, alcançar a segurança alimentar e melhoria da nutrição.", goal: "Explorar formas de garantir alimentação segura e sustentável.", xp: 100 },
  { id: 3, name: "Saúde e Bem-Estar", color: "#4C9F38", emoji: "💚", icon: "🏥", desc: "Assegurar uma vida saudável e promover o bem-estar para todos.", goal: "Aprender sobre acesso universal à saúde e prevenção de doenças.", xp: 110 },
  { id: 4, name: "Educação de Qualidade", color: "#C5192D", emoji: "📚", icon: "🎓", desc: "Assegurar educação inclusiva e equitativa de qualidade.", goal: "Descobrir como a educação transforma comunidades.", xp: 110 },
  { id: 5, name: "Igualdade de Gênero", color: "#FF3A21", emoji: "⚡", icon: "♀️", desc: "Alcançar igualdade de gênero e empoderar mulheres e meninas.", goal: "Refletir sobre equidade e representatividade.", xp: 110 },
  { id: 6, name: "Água Potável e Saneamento", color: "#26BDE2", emoji: "💧", icon: "🚿", desc: "Garantir disponibilidade e manejo sustentável da água e saneamento.", goal: "Missão de economia de água e saneamento básico.", xp: 120 },
  { id: 7, name: "Energia Limpa e Acessível", color: "#FCC30B", emoji: "⚡", icon: "☀️", desc: "Assegurar acesso confiável, sustentável e moderno à energia.", goal: "Simular escolhas de fontes de energia renovável.", xp: 120 },
  { id: 8, name: "Trabalho Decente", color: "#A21942", emoji: "💼", icon: "🤝", desc: "Promover crescimento econômico sustentado, inclusivo e sustentável.", goal: "Entender direitos trabalhistas e empregos do futuro.", xp: 120 },
  { id: 9, name: "Indústria e Inovação", color: "#FD6925", emoji: "🏗️", icon: "🔧", desc: "Construir infraestruturas resilientes e promover a inovação.", goal: "Projetar soluções inovadoras para desafios sociais.", xp: 130 },
  { id: 10, name: "Redução das Desigualdades", color: "#DD1367", emoji: "⚖️", icon: "🌐", desc: "Reduzir a desigualdade dentro dos países e entre eles.", goal: "Analisar disparidades e propor políticas inclusivas.", xp: 130 },
  { id: 11, name: "Cidades Sustentáveis", color: "#FD9D24", emoji: "🏙️", icon: "🌆", desc: "Tornar cidades e assentamentos humanos inclusivos e sustentáveis.", goal: "Planejar uma cidade sustentável do futuro.", xp: 130 },
  { id: 12, name: "Consumo Responsável", color: "#BF8B2E", emoji: "♻️", icon: "🛍️", desc: "Assegurar padrões de produção e consumo sustentáveis.", goal: "Jogar o minijogo de reciclagem e consumo consciente.", xp: 140 },
  { id: 13, name: "Ação Contra a Mudança do Clima", color: "#3F7E44", emoji: "🌍", icon: "🌡️", desc: "Tomar medidas urgentes para combater a mudança do clima.", goal: "Tomar decisões que reduzam emissões de carbono.", xp: 140 },
  { id: 14, name: "Vida na Água", color: "#0A97D9", emoji: "🌊", icon: "🐟", desc: "Conservar e usar sustentavelmente os oceanos e mares.", goal: "Proteger ecossistemas marinhos de ameaças humanas.", xp: 140 },
  { id: 15, name: "Vida Terrestre", color: "#56C02B", emoji: "🌿", icon: "🦁", desc: "Proteger, recuperar e promover o uso sustentável dos ecossistemas.", goal: "Combater o desmatamento e preservar a biodiversidade.", xp: 150 },
  { id: 16, name: "Paz, Justiça e Instituições", color: "#00689D", emoji: "🕊️", icon: "⚖️", desc: "Promover sociedades pacíficas e inclusivas para o desenvolvimento sustentável.", goal: "Construir sistemas justos e democráticos.", xp: 150 },
  { id: 17, name: "Parcerias e Meios de Implementação", color: "#19486A", emoji: "🤝", icon: "🌐", desc: "Fortalecer meios de implementação e revitalizar a parceria global.", goal: "Criar alianças globais para os objetivos sustentáveis.", xp: 160 },
];

// ─── Quiz Data ────────────────────────────────────────────────────────────────

const QUIZZES: Record<number, { type: string; question: string; options?: string[]; correct: number | boolean; explanation: string }[]> = {
  1: [
    { type: "multiple", question: "Qual porcentagem da população mundial vivia em extrema pobreza em 2023?", options: ["Menos de 5%", "Cerca de 10%", "Mais de 20%", "Cerca de 30%"], correct: 1, explanation: "Aproximadamente 10% da população mundial ainda vive com menos de US$2,15 por dia." },
    { type: "truefalse", question: "A pobreza é apenas falta de dinheiro, sem relação com acesso à saúde ou educação.", correct: false, explanation: "Pobreza é multidimensional: inclui falta de saúde, educação, moradia e oportunidades." },
    { type: "multiple", question: "Qual ação é mais eficaz para reduzir a pobreza?", options: ["Caridade individual", "Transferência de renda + educação + saúde", "Ignorar o problema", "Apenas crescimento econômico"], correct: 1, explanation: "Programas integrados como Bolsa Família combinam renda, educação e saúde para maior impacto." },
  ],
  6: [
    { type: "multiple", question: "Qual porcentagem da água doce do planeta está disponível para consumo humano?", options: ["50%", "25%", "10%", "Menos de 3%"], correct: 3, explanation: "Apenas cerca de 2,5% da água do planeta é doce, e a maior parte está em geleiras." },
    { type: "truefalse", question: "Um banho de 15 minutos gasta mais água do que encher uma banheira.", correct: true, explanation: "Um banho longo pode gastar até 270 litros, enquanto uma banheira usa cerca de 150 litros." },
    { type: "multiple", question: "Qual hábito economiza mais água no dia a dia?", options: ["Lavar louça com torneira aberta", "Tomar banho rápido", "Usar mangueira no jardim", "Lavar calçada com água"], correct: 1, explanation: "Banhos curtos (máx. 5 min) podem economizar até 70 litros por banho." },
  ],
  13: [
    { type: "multiple", question: "Qual gás é o principal responsável pelo efeito estufa?", options: ["Oxigênio (O²)", "Nitrogênio (N²)", "Dióxido de Carbono (CO²)", "Hidrogênio (H²)"], correct: 2, explanation: "O CO² emitido pela queima de combustíveis fósseis é o principal causador do aquecimento global." },
    { type: "truefalse", question: "O Brasil é um dos países mais vulneráveis às mudanças climáticas.", correct: true, explanation: "O Brasil enfrenta riscos de secas, enchentes e perda de biodiversidade por causa das mudanças climáticas." },
    { type: "multiple", question: "Qual alternativa reduz mais emissões de CO²?", options: ["Andar de carro elétrico", "Usar transporte coletivo", "Andar a pé ou de bicicleta", "Trabalhar em casa"], correct: 2, explanation: "Andar a pé ou de bicicleta tem zero emissão de carbono e ainda melhora a saúde." },
  ],
};

// ─── Achievements ─────────────────────────────────────────────────────────────

const ACHIEVEMENTS = [
  { id: "first_mission", name: "Primeira Missão", desc: "Completou sua primeira missão ODS", emoji: "🚀", color: "#4ade80" },
  { id: "eco_warrior", name: "Guerreiro Ecológico", desc: "Completou 5 missões sobre meio ambiente", emoji: "🌿", color: "#56C02B" },
  { id: "water_saver", name: "Protetor das Águas", desc: "Completou a missão ODS 6 com 3 estrelas", emoji: "💧", color: "#26BDE2" },
  { id: "climate_hero", name: "Herói do Clima", desc: "Completou a missão ODS 13 com pontuação máxima", emoji: "🌍", color: "#3F7E44" },
  { id: "quiz_master", name: "Mestre do Quiz", desc: "Acertou 10 questões seguidas", emoji: "🧠", color: "#fbbf24" },
  { id: "perfect_score", name: "Pontuação Perfeita", desc: "Conseguiu 100% em qualquer missão", emoji: "⭐", color: "#FD6925" },
  { id: "global_citizen", name: "Cidadão Global", desc: "Completou todas as 17 missões", emoji: "🌐", color: "#19486A" },
  { id: "speed_runner", name: "Velocista", desc: "Completou uma missão em menos de 2 minutos", emoji: "⚡", color: "#FCC30B" },
];

const RANKING = [
  { name: "Ana Silva", xp: 4850, avatar: "👩", level: 12 },
  { name: "Carlos Mendes", xp: 4320, avatar: "👦", level: 11 },
  { name: "Julia Santos", xp: 3990, avatar: "👧", level: 10 },
  { name: "Pedro Costa", xp: 3750, avatar: "👨", level: 9 },
  { name: "Mariana Lima", xp: 3200, avatar: "👩‍🦱", level: 8 },
  { name: "Rafael Torres", xp: 2980, avatar: "🧑", level: 8 },
  { name: "Beatriz Nunes", xp: 2650, avatar: "👩‍🦰", level: 7 },
  { name: "Lucas Ferreira", xp: 2100, avatar: "🧒", level: 6 },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "home" | "phases" | "mission" | "quiz" | "result" | "achievements" | "ranking" | "profile" | "minigame";

// ─── Utility Components ───────────────────────────────────────────────────────

function ProgressBar({ value, max, color, height = 12 }: { value: number; max: number; color: string; height?: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="rounded-full overflow-hidden bg-white/10" style={{ height }}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

function XPBar({ xp, level }: { xp: number; level: number }) {
  const nextLevelXp = level * 500;
  const currentXp = xp % 500;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-accent" style={{ fontFamily: "Nunito, sans-serif" }}>Nv.{level}</span>
      <div className="flex-1">
        <ProgressBar value={currentXp} max={nextLevelXp} color="#fbbf24" height={8} />
      </div>
      <span className="text-xs text-white/60" style={{ fontFamily: "Nunito, sans-serif" }}>{currentXp}/{nextLevelXp}</span>
    </div>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((s) => (
        <span key={s} className={`text-lg transition-all ${s <= count ? "opacity-100 scale-110" : "opacity-30 grayscale"}`}>⭐</span>
      ))}
    </div>
  );
}

function Btn({
  children, onClick, color = "#4ade80", textColor = "#0a1628", size = "md", disabled = false, className = ""
}: {
  children: React.ReactNode; onClick?: () => void; color?: string; textColor?: string; size?: "sm" | "md" | "lg"; disabled?: boolean; className?: string;
}) {
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl font-extrabold transition-all duration-150 active:scale-95 hover:scale-105 hover:brightness-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${sizes[size]} ${className}`}
      style={{ background: disabled ? "#374151" : color, color: disabled ? "#9ca3af" : textColor, fontFamily: "Nunito, sans-serif", boxShadow: disabled ? "none" : `0 4px 15px ${color}55` }}
    >
      {children}
    </button>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-white/70 hover:text-white transition-colors text-sm font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>
      ← Voltar
    </button>
  );
}

function NavBar({ screen, onNav, xp, level, coins }: { screen: Screen; onNav: (s: Screen) => void; xp: number; level: number; coins: number }) {
  if (screen === "home") return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3" style={{ background: "rgba(15,27,45,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <button onClick={() => onNav("home")} className="text-2xl font-black tracking-tight" style={{ fontFamily: "Fredoka One, sans-serif", color: "#4ade80" }}>🌍 Missão ODS</button>
      <div className="flex items-center gap-3">
        <span className="text-yellow-300 font-bold text-sm">🪙 {coins}</span>
        <span className="text-green-400 font-bold text-sm">⚡ {xp} XP</span>
        <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs font-bold">Nv.{level}</span>
      </div>
    </div>
  );
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function HomeScreen({ onNav, xp, level, coins, completedPhases }: { onNav: (s: Screen) => void; xp: number; level: number; coins: number; completedPhases: number[] }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => { const t = setInterval(() => setPulse(p => !p), 1500); return () => clearInterval(t); }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4" style={{ background: "linear-gradient(135deg, #0f1b2d 0%, #0d2540 40%, #0a3d2b 100%)" }}>
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none animate-pulse"
          style={{
            width: Math.random() * 6 + 2, height: Math.random() * 6 + 2,
            background: ["#4ade80", "#fbbf24", "#60a5fa", "#f472b6", "#a78bfa"][i % 5],
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.4,
            animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* SDG color band */}
      <div className="absolute top-0 left-0 right-0 h-2 flex">
        {SDGs.map(s => <div key={s.id} style={{ background: s.color, flex: 1 }} />)}
      </div>

      <div className="flex flex-col items-center gap-6 z-10 max-w-md w-full">
        {/* Logo */}
        <div className={`text-8xl transition-transform duration-700 ${pulse ? "scale-110" : "scale-100"}`}>🌍</div>
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight" style={{ fontFamily: "Fredoka One, sans-serif", color: "#4ade80", textShadow: "0 0 40px #4ade8066" }}>Missão ODS</h1>
          <p className="text-white/70 mt-2 text-base" style={{ fontFamily: "Nunito, sans-serif" }}>Aprenda sobre os 17 Objetivos de Desenvolvimento Sustentável</p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 bg-white/5 rounded-2xl px-6 py-3 border border-white/10">
          <div className="text-center">
            <div className="text-2xl font-black text-yellow-300" style={{ fontFamily: "Fredoka One, sans-serif" }}>{xp}</div>
            <div className="text-xs text-white/50" style={{ fontFamily: "Nunito, sans-serif" }}>XP Total</div>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <div className="text-2xl font-black text-green-400" style={{ fontFamily: "Fredoka One, sans-serif" }}>{completedPhases.length}</div>
            <div className="text-xs text-white/50" style={{ fontFamily: "Nunito, sans-serif" }}>Missões</div>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <div className="text-2xl font-black text-blue-400" style={{ fontFamily: "Fredoka One, sans-serif" }}>Nv.{level}</div>
            <div className="text-xs text-white/50" style={{ fontFamily: "Nunito, sans-serif" }}>Nível</div>
          </div>
        </div>

        {/* Main button */}
        <Btn onClick={() => onNav("phases")} size="lg" color="#4ade80" className="w-full text-center justify-center">
          🚀 Jogar Agora!
        </Btn>

        {/* Secondary buttons */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {[
            { label: "❓ Como\nFunciona", screen: "profile", color: "#60a5fa" },
            { label: "🏆 Ranking", screen: "ranking", color: "#fbbf24" },
            { label: "🎖️ Conquistas", screen: "achievements", color: "#f472b6" },
          ].map(b => (
            <button key={b.screen} onClick={() => onNav(b.screen as Screen)}
              className="rounded-2xl py-3 px-2 text-xs font-bold text-center transition-all hover:scale-105 active:scale-95 whitespace-pre-line leading-tight"
              style={{ background: `${b.color}22`, border: `2px solid ${b.color}44`, color: b.color, fontFamily: "Nunito, sans-serif" }}>
              {b.label}
            </button>
          ))}
        </div>

        <p className="text-white/30 text-xs text-center" style={{ fontFamily: "Nunito, sans-serif" }}>17 ODS · Quizzes · Minijogos · Conquistas</p>
      </div>
    </div>
  );
}

function PhasesScreen({ onNav, onSelectSDG, completedPhases, stars }: { onNav: (s: Screen) => void; onSelectSDG: (id: number) => void; completedPhases: number[]; stars: Record<number, number> }) {
  const [filter, setFilter] = useState<"all" | "done" | "todo">("all");
  const totalXP = completedPhases.reduce((a, id) => a + (SDGs.find(s => s.id === id)?.xp ?? 0), 0);

  const filtered = SDGs.filter(s => {
    if (filter === "done") return completedPhases.includes(s.id);
    if (filter === "todo") return !completedPhases.includes(s.id);
    return true;
  });

  return (
    <div className="min-h-screen pt-20 pb-8 px-4" style={{ background: "linear-gradient(180deg, #0f1b2d 0%, #0a2040 100%)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <BackBtn onClick={() => onNav("home")} />
          <h2 className="text-3xl font-black mt-2" style={{ fontFamily: "Fredoka One, sans-serif", color: "#f0f7ff" }}>Escolha sua Missão</h2>
          <p className="text-white/60 text-sm mt-1" style={{ fontFamily: "Nunito, sans-serif" }}>{completedPhases.length}/17 missões concluídas · {totalXP} XP conquistados</p>
          <div className="mt-3"><ProgressBar value={completedPhases.length} max={17} color="#4ade80" height={10} /></div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {[["all", "Todas"], ["done", "Concluídas ✅"], ["todo", "Pendentes 🔒"]].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v as typeof filter)}
              className="px-4 py-1.5 rounded-full text-sm font-bold transition-all"
              style={{ fontFamily: "Nunito, sans-serif", background: filter === v ? "#4ade80" : "rgba(255,255,255,0.08)", color: filter === v ? "#0a1628" : "rgba(255,255,255,0.6)" }}>
              {l}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((sdg) => {
            const done = completedPhases.includes(sdg.id);
            const locked = sdg.id > 1 && !completedPhases.includes(sdg.id - 1) && !done;
            const s = stars[sdg.id] ?? 0;
            return (
              <button key={sdg.id} onClick={() => { if (!locked) { onSelectSDG(sdg.id); onNav("mission"); } }}
                className={`relative rounded-2xl p-4 text-left transition-all duration-200 border ${locked ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] hover:brightness-110 cursor-pointer active:scale-[0.98]"}`}
                style={{ background: done ? `${sdg.color}22` : "rgba(255,255,255,0.04)", borderColor: done ? `${sdg.color}55` : "rgba(255,255,255,0.08)" }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${sdg.color}33`, border: `2px solid ${sdg.color}66` }}>
                      {locked ? "🔒" : sdg.emoji}
                    </div>
                    <div>
                      <div className="text-xs font-bold opacity-60" style={{ fontFamily: "Nunito, sans-serif", color: sdg.color }}>ODS {sdg.id}</div>
                      <div className="font-extrabold text-sm text-white leading-tight" style={{ fontFamily: "Nunito, sans-serif" }}>{sdg.name}</div>
                      <div className="text-xs text-white/50 mt-0.5" style={{ fontFamily: "Nunito, sans-serif" }}>{sdg.xp} XP</div>
                    </div>
                  </div>
                  {done && <Stars count={s} />}
                </div>
                {done && (
                  <div className="absolute top-2 right-2 text-lg">✅</div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MissionScreen({ sdgId, onNav, onStart }: { sdgId: number; onNav: (s: Screen) => void; onStart: () => void }) {
  const sdg = SDGs.find(s => s.id === sdgId)!;
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 flex flex-col items-center" style={{ background: `linear-gradient(135deg, #0f1b2d 0%, ${sdg.color}22 100%)` }}>
      <div className="max-w-md w-full">
        <BackBtn onClick={() => onNav("phases")} />

        <div className={`mt-6 transition-all duration-500 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* SDG badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full text-xs font-black" style={{ background: sdg.color, color: "#fff", fontFamily: "Nunito, sans-serif" }}>
              ODS {sdg.id}
            </div>
            <div className="text-white/50 text-xs" style={{ fontFamily: "Nunito, sans-serif" }}>+{sdg.xp} XP</div>
          </div>

          {/* Big illustration */}
          <div className="rounded-3xl w-full aspect-video flex items-center justify-center mb-6 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${sdg.color}33, ${sdg.color}11)`, border: `2px solid ${sdg.color}44` }}>
            <span className="text-8xl">{sdg.emoji}</span>
            <div className="absolute inset-0 flex items-end p-4">
              <div className="w-full h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${sdg.color}, transparent)` }} />
            </div>
          </div>

          <h1 className="text-3xl font-black text-white mb-3 leading-tight" style={{ fontFamily: "Fredoka One, sans-serif" }}>{sdg.name}</h1>
          <p className="text-white/70 mb-4 leading-relaxed text-sm" style={{ fontFamily: "Nunito, sans-serif" }}>{sdg.desc}</p>

          {/* Mission objective */}
          <div className="rounded-2xl p-4 mb-6 border" style={{ background: `${sdg.color}15`, borderColor: `${sdg.color}33` }}>
            <div className="text-xs font-black mb-1" style={{ color: sdg.color, fontFamily: "Nunito, sans-serif" }}>🎯 OBJETIVO DA MISSÃO</div>
            <p className="text-white text-sm font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>{sdg.goal}</p>
          </div>

          {/* Mission info */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[["🧠 Quiz", "3 perguntas"], ["⏱️ Tempo", "~3 min"], ["⭐ Estrelas", "Até 3"]].map(([icon, val]) => (
              <div key={icon} className="rounded-xl p-3 text-center border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="text-lg">{icon.split(" ")[0]}</div>
                <div className="text-white text-xs font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>{icon.split(" ").slice(1).join(" ")}</div>
                <div className="text-white/50 text-xs" style={{ fontFamily: "Nunito, sans-serif" }}>{val}</div>
              </div>
            ))}
          </div>

          <Btn onClick={onStart} size="lg" color={sdg.color} textColor="#fff" className="w-full justify-center text-center">
            ⚡ Começar Missão!
          </Btn>
        </div>
      </div>
    </div>
  );
}

function QuizScreen({ sdgId, onFinish }: { sdgId: number; onFinish: (score: number, total: number) => void }) {
  const sdg = SDGs.find(s => s.id === sdgId)!;
  const questions = QUIZZES[sdgId] ?? QUIZZES[1];
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);
  const [streak, setStreak] = useState(0);

  const q = questions[qIndex];
  const isCorrect = selected !== null && selected === q.correct;

  function handleSelect(val: number | boolean) {
    if (showFeedback) return;
    setSelected(val);
    setShowFeedback(true);
    const correct = val === q.correct;
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setShake(true);
      setStreak(0);
      setTimeout(() => setShake(false), 600);
    }
  }

  function handleNext() {
    if (qIndex + 1 >= questions.length) {
      onFinish(score + (isCorrect ? 1 : 0), questions.length);
    } else {
      setQIndex(i => i + 1);
      setSelected(null);
      setShowFeedback(false);
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 flex flex-col" style={{ background: `linear-gradient(135deg, #0f1b2d 0%, ${sdg.color}22 100%)` }}>
      <div className="max-w-md mx-auto w-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex-1"><ProgressBar value={qIndex} max={questions.length} color={sdg.color} height={10} /></div>
          <span className="text-white/70 text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>{qIndex + 1}/{questions.length}</span>
        </div>

        {/* Streak */}
        {streak >= 2 && (
          <div className="text-center py-1 rounded-xl text-sm font-black animate-bounce" style={{ background: "#fbbf2422", color: "#fbbf24", fontFamily: "Nunito, sans-serif" }}>
            🔥 {streak} acertos seguidos!
          </div>
        )}

        {/* Question */}
        <div className={`rounded-3xl p-6 border transition-all ${shake ? "animate-bounce" : ""}`}
          style={{ background: "rgba(255,255,255,0.05)", borderColor: `${sdg.color}44` }}>
          <div className="text-xs font-black mb-2" style={{ color: sdg.color, fontFamily: "Nunito, sans-serif" }}>
            {q.type === "truefalse" ? "🔵 VERDADEIRO OU FALSO" : "🟡 MÚLTIPLA ESCOLHA"}
          </div>
          <p className="text-white font-extrabold text-lg leading-snug" style={{ fontFamily: "Nunito, sans-serif" }}>{q.question}</p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {q.type === "truefalse" ? (
            [["✅ Verdadeiro", true], ["❌ Falso", false]].map(([label, val]) => (
              <OptionBtn key={String(val)} label={String(label)} value={val as boolean} selected={selected} correct={q.correct} showFeedback={showFeedback} onSelect={handleSelect} sdgColor={sdg.color} />
            ))
          ) : (
            q.options!.map((opt, i) => (
              <OptionBtn key={i} label={opt} value={i} selected={selected} correct={q.correct} showFeedback={showFeedback} onSelect={handleSelect} sdgColor={sdg.color} />
            ))
          )}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`rounded-2xl p-4 border transition-all animate-in slide-in-from-bottom-4 duration-300`}
            style={{ background: isCorrect ? "#4ade8022" : "#ef444422", borderColor: isCorrect ? "#4ade8055" : "#ef444455" }}>
            <div className="font-black text-lg mb-1" style={{ color: isCorrect ? "#4ade80" : "#ef4444", fontFamily: "Nunito, sans-serif" }}>
              {isCorrect ? "🎉 Correto! Incrível!" : "😞 Ops! Não foi dessa vez."}
            </div>
            <p className="text-white/80 text-sm" style={{ fontFamily: "Nunito, sans-serif" }}>{q.explanation}</p>
          </div>
        )}

        {showFeedback && (
          <Btn onClick={handleNext} color={sdg.color} textColor="#fff" className="w-full justify-center">
            {qIndex + 1 >= questions.length ? "🏁 Ver Resultado" : "Próxima →"}
          </Btn>
        )}
      </div>
    </div>
  );
}

function OptionBtn({ label, value, selected, correct, showFeedback, onSelect, sdgColor }: {
  label: string; value: number | boolean; selected: number | boolean | null; correct: number | boolean;
  showFeedback: boolean; onSelect: (v: number | boolean) => void; sdgColor: string;
}) {
  const isSelected = selected === value;
  const isCorrect = value === correct;
  let bg = "rgba(255,255,255,0.06)";
  let border = "rgba(255,255,255,0.12)";
  let textColor = "#f0f7ff";
  if (showFeedback) {
    if (isCorrect) { bg = "#4ade8022"; border = "#4ade80"; textColor = "#4ade80"; }
    else if (isSelected) { bg = "#ef444422"; border = "#ef4444"; textColor = "#ef4444"; }
  } else if (isSelected) { bg = `${sdgColor}22`; border = sdgColor; }

  return (
    <button onClick={() => onSelect(value)} disabled={showFeedback}
      className="w-full text-left rounded-2xl p-4 font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-default"
      style={{ background: bg, border: `2px solid ${border}`, color: textColor, fontFamily: "Nunito, sans-serif" }}>
      {label}
    </button>
  );
}

function ResultScreen({ sdgId, score, total, onNav, onEarned }: { sdgId: number; score: number; total: number; onNav: (s: Screen) => void; onEarned: (xp: number, coins: number, stars: number) => void }) {
  const sdg = SDGs.find(s => s.id === sdgId)!;
  const pct = score / total;
  const earnedStars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1;
  const earnedXP = Math.round(sdg.xp * pct);
  const earnedCoins = earnedStars * 10;
  const [revealed, setRevealed] = useState(false);

  useEffect(() => { const t = setTimeout(() => { setRevealed(true); onEarned(earnedXP, earnedCoins, earnedStars); }, 400); return () => clearTimeout(t); }, []);

  const messages = ["Boa tentativa! Continue praticando! 💪", "Muito bem! Você está no caminho certo! 🎯", "Excelente! Você é um especialista em ODS! 🏆"];
  const msgIdx = earnedStars - 1;

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 flex flex-col items-center justify-center" style={{ background: `linear-gradient(135deg, #0f1b2d 0%, ${sdg.color}22 100%)` }}>
      <div className="max-w-md w-full flex flex-col items-center gap-6 text-center">

        {/* Trophy animation */}
        <div className={`text-8xl transition-all duration-700 ${revealed ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
          {earnedStars === 3 ? "🏆" : earnedStars === 2 ? "🥈" : "🥉"}
        </div>

        <div>
          <h1 className="text-4xl font-black" style={{ fontFamily: "Fredoka One, sans-serif", color: "#f0f7ff" }}>Missão Concluída!</h1>
          <p className="text-white/60 mt-1" style={{ fontFamily: "Nunito, sans-serif" }}>ODS {sdgId}: {sdg.name}</p>
        </div>

        <Stars count={earnedStars} />

        <p className="text-white/80 text-base font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>{messages[msgIdx]}</p>

        {/* Score breakdown */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {[
            { icon: "🧠", label: "Acertos", val: `${score}/${total}` },
            { icon: "⚡", label: "XP Ganho", val: `+${earnedXP}` },
            { icon: "🪙", label: "Moedas", val: `+${earnedCoins}` },
          ].map(item => (
            <div key={item.label} className="rounded-2xl p-4 border border-white/10 text-center" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-white font-black text-lg" style={{ fontFamily: "Fredoka One, sans-serif" }}>{item.val}</div>
              <div className="text-white/50 text-xs" style={{ fontFamily: "Nunito, sans-serif" }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Certificate hint */}
        <div className="w-full rounded-2xl p-4 border text-center" style={{ background: `${sdg.color}15`, borderColor: `${sdg.color}33` }}>
          <div className="text-2xl mb-2">🎓</div>
          <div className="text-white font-bold text-sm" style={{ fontFamily: "Nunito, sans-serif" }}>Certificado de Conclusão</div>
          <div className="text-white/60 text-xs mt-1" style={{ fontFamily: "Nunito, sans-serif" }}>ODS {sdgId}: {sdg.name} — Concluído com {Math.round(pct * 100)}% de aproveitamento</div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Btn onClick={() => onNav("phases")} color={sdg.color} textColor="#fff" size="lg" className="w-full justify-center">
            🗺️ Próxima Missão
          </Btn>
          <Btn onClick={() => onNav("home")} color="rgba(255,255,255,0.1)" textColor="#fff" className="w-full justify-center">
            🏠 Menu Principal
          </Btn>
        </div>
      </div>
    </div>
  );
}

function AchievementsScreen({ onNav, unlockedIds }: { onNav: (s: Screen) => void; unlockedIds: string[] }) {
  return (
    <div className="min-h-screen pt-20 pb-8 px-4" style={{ background: "linear-gradient(180deg, #0f1b2d 0%, #1a0d2e 100%)" }}>
      <div className="max-w-md mx-auto">
        <BackBtn onClick={() => onNav("home")} />
        <h2 className="text-3xl font-black mt-2 text-white" style={{ fontFamily: "Fredoka One, sans-serif" }}>🎖️ Conquistas</h2>
        <p className="text-white/60 text-sm mt-1 mb-6" style={{ fontFamily: "Nunito, sans-serif" }}>{unlockedIds.length}/{ACHIEVEMENTS.length} desbloqueadas</p>

        <div className="flex flex-col gap-3">
          {ACHIEVEMENTS.map(a => {
            const unlocked = unlockedIds.includes(a.id);
            return (
              <div key={a.id} className={`rounded-2xl p-4 border flex items-center gap-4 transition-all ${unlocked ? "" : "opacity-40 grayscale"}`}
                style={{ background: unlocked ? `${a.color}15` : "rgba(255,255,255,0.04)", borderColor: unlocked ? `${a.color}44` : "rgba(255,255,255,0.08)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: unlocked ? `${a.color}33` : "rgba(255,255,255,0.05)" }}>
                  {unlocked ? a.emoji : "🔒"}
                </div>
                <div>
                  <div className="font-black text-white text-base" style={{ fontFamily: "Nunito, sans-serif" }}>{a.name}</div>
                  <div className="text-white/60 text-sm" style={{ fontFamily: "Nunito, sans-serif" }}>{a.desc}</div>
                  {unlocked && <div className="text-xs font-bold mt-1" style={{ color: a.color, fontFamily: "Nunito, sans-serif" }}>✓ Desbloqueada!</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RankingScreen({ onNav, userXP }: { onNav: (s: Screen) => void; userXP: number }) {
  const allPlayers = [
    ...RANKING,
    { name: "Você", xp: userXP, avatar: "🧑‍🎓", level: Math.floor(userXP / 500) + 1 },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4" style={{ background: "linear-gradient(180deg, #0f1b2d 0%, #1a1a0d 100%)" }}>
      <div className="max-w-md mx-auto">
        <BackBtn onClick={() => onNav("home")} />
        <h2 className="text-3xl font-black mt-2 text-white" style={{ fontFamily: "Fredoka One, sans-serif" }}>🏆 Ranking Global</h2>
        <p className="text-white/60 text-sm mt-1 mb-6" style={{ fontFamily: "Nunito, sans-serif" }}>Melhores jogadores da semana</p>

        {/* Top 3 podium */}
        <div className="flex items-end justify-center gap-3 mb-6 h-32">
          {[1, 0, 2].map(idx => {
            const p = allPlayers[idx];
            if (!p) return null;
            const podiumH = idx === 0 ? "h-32" : idx === 1 ? "h-24" : "h-20";
            const medals = ["🥇", "🥈", "🥉"];
            return (
              <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                <div className="text-2xl">{p.avatar}</div>
                <div className="text-white font-bold text-xs text-center truncate w-full" style={{ fontFamily: "Nunito, sans-serif" }}>{p.name}</div>
                <div className={`w-full rounded-t-xl flex flex-col items-center justify-end pb-2 ${podiumH}`}
                  style={{ background: idx === 0 ? "#fbbf2433" : idx === 1 ? "#94a3b833" : "#cd7c3633", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="text-xl">{medals[idx]}</div>
                  <div className="text-xs font-black" style={{ fontFamily: "Nunito, sans-serif", color: idx === 0 ? "#fbbf24" : idx === 1 ? "#94a3b8" : "#cd7c36" }}>{p.xp} XP</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          {allPlayers.map((p, i) => {
            const isMe = p.name === "Você";
            return (
              <div key={i} className={`flex items-center gap-3 rounded-2xl p-3 border transition-all ${isMe ? "border-green-500/50" : "border-white/08"}`}
                style={{ background: isMe ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.04)" }}>
                <div className="w-8 text-center font-black" style={{ fontFamily: "Fredoka One, sans-serif", color: i === 0 ? "#fbbf24" : i === 1 ? "#94a3b8" : i === 2 ? "#cd7c36" : "rgba(255,255,255,0.4)" }}>
                  {i + 1}
                </div>
                <div className="text-2xl">{p.avatar}</div>
                <div className="flex-1">
                  <div className="font-bold text-white text-sm flex items-center gap-1" style={{ fontFamily: "Nunito, sans-serif" }}>
                    {p.name} {isMe && <span className="text-xs text-green-400">(Você)</span>}
                  </div>
                  <div className="text-white/50 text-xs" style={{ fontFamily: "Nunito, sans-serif" }}>Nível {p.level}</div>
                </div>
                <div className="font-black text-sm" style={{ fontFamily: "Nunito, sans-serif", color: isMe ? "#4ade80" : "rgba(255,255,255,0.7)" }}>{p.xp} XP</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ onNav, xp, level, coins, completedPhases, unlockedAchievements }: {
  onNav: (s: Screen) => void; xp: number; level: number; coins: number; completedPhases: number[]; unlockedAchievements: string[];
}) {
  const avatars = ["🧑‍🎓", "👩‍🎓", "🧑‍🔬", "👩‍🔬", "🧑‍🌾", "👩‍🌾"];
  const [avatar, setAvatar] = useState(0);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4" style={{ background: "linear-gradient(180deg, #0f1b2d 0%, #0d2020 100%)" }}>
      <div className="max-w-md mx-auto">
        <BackBtn onClick={() => onNav("home")} />
        <h2 className="text-3xl font-black mt-2 text-white" style={{ fontFamily: "Fredoka One, sans-serif" }}>👤 Meu Perfil</h2>

        {/* Avatar */}
        <div className="flex flex-col items-center my-6 gap-3">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl border-4 border-green-500/50" style={{ background: "rgba(74,222,128,0.1)" }}>
            {avatars[avatar]}
          </div>
          <div className="flex gap-2">
            {avatars.map((a, i) => (
              <button key={i} onClick={() => setAvatar(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-base transition-all ${i === avatar ? "scale-125 ring-2 ring-green-400" : "opacity-50"}`}
                style={{ background: "rgba(255,255,255,0.05)" }}>
                {a}
              </button>
            ))}
          </div>
          <div className="text-center">
            <div className="text-white font-black text-xl" style={{ fontFamily: "Fredoka One, sans-serif" }}>Estudante ODS</div>
            <div className="text-white/60 text-sm" style={{ fontFamily: "Nunito, sans-serif" }}>Herói da Sustentabilidade</div>
          </div>
          <div className="w-full max-w-xs"><XPBar xp={xp} level={level} /></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { icon: "⚡", label: "XP Total", val: xp, color: "#fbbf24" },
            { icon: "🪙", label: "Moedas", val: coins, color: "#4ade80" },
            { icon: "✅", label: "Missões", val: completedPhases.length, color: "#60a5fa" },
            { icon: "🎖️", label: "Conquistas", val: unlockedAchievements.length, color: "#f472b6" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-4 border border-white/10 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="text-3xl font-black" style={{ fontFamily: "Fredoka One, sans-serif", color: s.color }}>{s.val}</div>
              <div className="text-white/60 text-xs mt-1" style={{ fontFamily: "Nunito, sans-serif" }}>{s.icon} {s.label}</div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="rounded-2xl p-5 border border-white/10 mb-4" style={{ background: "rgba(255,255,255,0.04)" }}>
          <h3 className="font-black text-white mb-3" style={{ fontFamily: "Nunito, sans-serif" }}>❓ Como Funciona</h3>
          {[
            ["🗺️", "Escolha uma das 17 missões ODS"],
            ["🧠", "Responda quizzes e complete desafios"],
            ["⭐", "Ganhe estrelas, XP e moedas ecológicas"],
            ["🏆", "Suba no ranking global de sustentabilidade"],
            ["🎖️", "Desbloqueie conquistas temáticas dos ODS"],
          ].map(([emoji, text]) => (
            <div key={text} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <span className="text-lg">{emoji}</span>
              <span className="text-white/70 text-sm" style={{ fontFamily: "Nunito, sans-serif" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedSDG, setSelectedSDG] = useState(1);
  const [xp, setXP] = useState(0);
  const [coins, setCoins] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [stars, setStars] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState({ score: 0, total: 0 });
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  const level = Math.floor(xp / 500) + 1;

  function handleNav(s: Screen) {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleStartMission() {
    handleNav("quiz");
  }

  function handleQuizFinish(score: number, total: number) {
    setQuizScore({ score, total });
    handleNav("result");
  }

  function handleEarned(earnedXP: number, earnedCoins: number, earnedStars: number) {
    setXP(x => x + earnedXP);
    setCoins(c => c + earnedCoins);
    setStars(s => ({ ...s, [selectedSDG]: earnedStars }));
    if (!completedPhases.includes(selectedSDG)) {
      setCompletedPhases(p => [...p, selectedSDG]);
      if (unlockedAchievements.length === 0) setUnlockedAchievements(["first_mission"]);
      if (selectedSDG === 6) setUnlockedAchievements(a => [...new Set([...a, "water_saver"])]);
      if (selectedSDG === 13) setUnlockedAchievements(a => [...new Set([...a, "climate_hero"])]);
    }
  }

  return (
    <div style={{ fontFamily: "Nunito, sans-serif" }}>
      <style>{`
        @keyframes shimmer { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .animate-float { animation: float 3s ease-in-out infinite; }
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>

      {screen !== "home" && (
        <NavBar screen={screen} onNav={handleNav} xp={xp} level={level} coins={coins} />
      )}

      {screen === "home" && (
        <HomeScreen onNav={handleNav} xp={xp} level={level} coins={coins} completedPhases={completedPhases} />
      )}
      {screen === "phases" && (
        <PhasesScreen onNav={handleNav} onSelectSDG={setSelectedSDG} completedPhases={completedPhases} stars={stars} />
      )}
      {screen === "mission" && (
        <MissionScreen sdgId={selectedSDG} onNav={handleNav} onStart={handleStartMission} />
      )}
      {screen === "quiz" && (
        <QuizScreen sdgId={selectedSDG} onFinish={handleQuizFinish} />
      )}
      {screen === "result" && (
        <ResultScreen sdgId={selectedSDG} score={quizScore.score} total={quizScore.total} onNav={handleNav} onEarned={handleEarned} />
      )}
      {screen === "achievements" && (
        <AchievementsScreen onNav={handleNav} unlockedIds={unlockedAchievements} />
      )}
      {screen === "ranking" && (
        <RankingScreen onNav={handleNav} userXP={xp} />
      )}
      {screen === "profile" && (
        <ProfileScreen onNav={handleNav} xp={xp} level={level} coins={coins} completedPhases={completedPhases} unlockedAchievements={unlockedAchievements} />
      )}
    </div>
  );
}
