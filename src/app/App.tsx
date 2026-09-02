import { useState, useEffect, useRef } from "react";

// ─── SDG Data ────────────────────────────────────────────────────────────────
const SDGs = [
  {
    id: 1,
    name: "Moradia Digna",
    color: "#FD9D24",
    emoji: "🏘️",
    icon: "🏠",
    desc: "Promover moradias seguras, adequadas e acessíveis para todos.",
    goal: "Entender a importância da moradia digna para cidades sustentáveis.",
    xp: 100
  },

  {
    id: 2,
    name: "Mobilidade Urbana",
    color: "#FD9D24",
    emoji: "🚌",
    icon: "🚲",
    desc: "Promover formas de transporte acessíveis, seguras e sustentáveis.",
    goal: "Descobrir como melhorar os deslocamentos dentro das cidades.",
    xp: 110
  },

  {
    id: 3,
    name: "Áreas Verdes",
    color: "#FD9D24",
    emoji: "🌳",
    icon: "🌿",
    desc: "Valorizar parques, praças e áreas verdes para melhorar a vida urbana.",
    goal: "Entender a importância da natureza dentro das cidades.",
    xp: 110
  },

  {
    id: 4,
    name: "Resíduos e Limpeza Urbana",
    color: "#FD9D24",
    emoji: "♻️",
    icon: "🗑️",
    desc: "Promover uma gestão adequada dos resíduos e a limpeza das cidades.",
    goal: "Aprender como reduzir, reutilizar e reciclar resíduos urbanos.",
    xp: 120
  },

  {
    id: 5,
    name: "Patrimônio e Cultura",
    color: "#FD9D24",
    emoji: "🏛️",
    icon: "🎨",
    desc: "Preservar o patrimônio histórico, cultural e a identidade das comunidades.",
    goal: "Descobrir por que preservar a história é importante para as cidades.",
    xp: 120
  },

  {
    id: 6,
    name: "Cidades Resilientes",
    color: "#FD9D24",
    emoji: "🌊",
    icon: "🛡️",
    desc: "Preparar as cidades para enfrentar desastres e situações de risco.",
    goal: "Aprender como o planejamento pode tornar as cidades mais preparadas.",
    xp: 130
  },

  {
    id: 7,
    name: "Planejamento Urbano",
    color: "#FD9D24",
    emoji: "🏗️",
    icon: "🗺️",
    desc: "Planejar o crescimento das cidades de forma organizada e sustentável.",
    goal: "Entender como o planejamento influencia a qualidade de vida urbana.",
    xp: 130
  },

  {
    id: 8,
    name: "Inclusão Urbana",
    color: "#FD9D24",
    emoji: "🤝",
    icon: "♿",
    desc: "Construir cidades acessíveis e inclusivas para diferentes pessoas.",
    goal: "Compreender a importância da acessibilidade e da inclusão nas cidades.",
    xp: 140
  },

  {
    id: 9,
    name: "Cidades Sustentáveis",
    color: "#FD9D24",
    emoji: "🌍",
    icon: "🏙️",
    desc: "Construir cidades inclusivas, seguras, resilientes e sustentáveis.",
    goal: "Reunir conhecimentos para compreender os principais desafios da ODS 11.",
    xp: 150
  },
];
// ─── Quiz Data ────────────────────────────────────────────────────────────────

const QUIZZES: Record<number, { type: string; question: string; options?: string[]; correct: number | boolean; explanation: string }[]> = {
  1: [
  {
    type: "multiple",
    question: "O que uma moradia adequada deve oferecer aos seus moradores?",
    options: [
      "Apenas um espaço para dormir",
      "Segurança, condições adequadas e acesso a serviços básicos",
      "Apenas uma localização central",
      "Um espaço grande, independentemente das condições"
    ],
    correct: 1,
    explanation: "Uma moradia digna não significa apenas ter um teto. Ela deve oferecer segurança, condições adequadas de vida e acesso a serviços básicos, como água, saneamento e energia."
  },

  {
    type: "truefalse",
    question: "Uma moradia adequada envolve apenas ter um espaço para morar, sem relação com serviços básicos.",
    correct: false,
    explanation: "Moradia adequada também está relacionada ao acesso a serviços básicos, segurança, infraestrutura e condições dignas de vida."
  },

  {
    type: "multiple",
    question: "Por que a ODS 11 busca ampliar o acesso à moradia adequada?",
    options: [
      "Para aumentar a quantidade de prédios nas cidades",
      "Para garantir cidades mais inclusivas e com melhor qualidade de vida",
      "Para incentivar a construção de casas cada vez maiores",
      "Para concentrar a população nas regiões centrais"
    ],
    correct: 1,
    explanation: "A ODS 11 busca tornar as cidades inclusivas, seguras, resilientes e sustentáveis, e o acesso à moradia adequada é uma parte importante desse objetivo."
  }
],

2: [
  {
    type: "multiple",
    question: "Qual medida pode contribuir para uma mobilidade urbana mais sustentável?",
    options: [
      "Aumentar o número de carros particulares",
      "Investir em transporte público de qualidade",
      "Construir mais estacionamentos no centro",
      "Reduzir as ciclovias"
    ],
    correct: 1,
    explanation: "Um transporte público eficiente pode transportar muitas pessoas utilizando menos espaço nas ruas e ajudando a diminuir congestionamentos e impactos ambientais."
  },

  {
    type: "truefalse",
    question: "As bicicletas podem contribuir para uma mobilidade urbana mais sustentável.",
    correct: true,
    explanation: "Bicicletas não emitem gases diretamente durante seu uso e ocupam pouco espaço urbano, podendo ser uma alternativa para deslocamentos de curta e média distância."
  },

  {
    type: "multiple",
    question: "O que significa tornar a mobilidade urbana mais acessível?",
    options: [
      "Facilitar o deslocamento apenas para quem possui carro",
      "Criar condições para que diferentes pessoas possam se deslocar pela cidade",
      "Construir estradas maiores exclusivamente para veículos",
      "Diminuir o número de calçadas"
    ],
    correct: 1,
    explanation: "Uma cidade acessível deve considerar diferentes necessidades, incluindo pessoas com deficiência, idosos e pessoas com mobilidade reduzida."
  }
],

3: [
  {
    type: "multiple",
    question: "Qual é uma das funções das árvores nas cidades?",
    options: [
      "Aumentar a temperatura das ruas",
      "Reduzir áreas de circulação",
      "Ajudar a melhorar o conforto térmico e a qualidade ambiental",
      "Impedir a construção de espaços públicos"
    ],
    correct: 2,
    explanation: "A vegetação pode fornecer sombra e contribuir para temperaturas mais agradáveis, além de ajudar na qualidade do ar e no bem-estar da população."
  },

  {
    type: "truefalse",
    question: "Parques e praças podem oferecer espaços de convivência, lazer e contato com a natureza.",
    correct: true,
    explanation: "Espaços públicos bem planejados podem estimular a convivência entre moradores e proporcionar locais para lazer, atividades físicas e descanso."
  },

  {
    type: "multiple",
    question: "O que pode acontecer quando uma cidade possui pouca vegetação e muitas superfícies de concreto?",
    options: [
      "A cidade sempre fica mais fria",
      "Pode ocorrer aumento das temperaturas em determinadas áreas",
      "A qualidade ambiental melhora automaticamente",
      "A quantidade de áreas verdes aumenta"
    ],
    correct: 1,
    explanation: "Áreas urbanas muito construídas podem formar as chamadas ilhas de calor, nas quais as temperaturas podem ser maiores do que em regiões próximas com mais vegetação."
  }
],

4: [
  {
    type: "multiple",
    question: "Qual atitude ajuda na gestão sustentável dos resíduos?",
    options: [
      "Jogar lixo em terrenos vazios",
      "Misturar todos os resíduos sem necessidade",
      "Reduzir, reutilizar e reciclar materiais sempre que possível",
      "Aumentar o desperdício"
    ],
    correct: 2,
    explanation: "Reduzir a quantidade de resíduos produzidos é importante porque diminui a pressão sobre sistemas de coleta, tratamento e disposição final do lixo."
  },

  {
    type: "truefalse",
    question: "A coleta seletiva pode facilitar o encaminhamento de materiais para a reciclagem.",
    correct: true,
    explanation: "A separação adequada dos resíduos facilita o trabalho de reciclagem e pode permitir que materiais retornem ao ciclo produtivo."
  },

  {
    type: "multiple",
    question: "Por que o descarte incorreto de resíduos pode ser um problema para as cidades?",
    options: [
      "Porque melhora a drenagem das ruas",
      "Porque pode causar poluição e contribuir para problemas urbanos",
      "Porque aumenta os espaços verdes",
      "Porque reduz automaticamente os custos de limpeza"
    ],
    correct: 1,
    explanation: "Resíduos descartados de forma inadequada podem obstruir sistemas de drenagem e contribuir para alagamentos, além de causar poluição de áreas urbanas."
  }
],

5: [
  {
    type: "multiple",
    question: "Por que preservar patrimônios históricos e culturais é importante?",
    options: [
      "Porque ajuda a manter a memória e a identidade das comunidades",
      "Porque impede qualquer mudança nas cidades",
      "Porque transforma todos os prédios antigos em museus",
      "Porque elimina a necessidade de novas construções"
    ],
    correct: 0,
    explanation: "Edifícios, monumentos, praças e outros lugares podem guardar parte da história e da identidade de uma comunidade."
  },

  {
    type: "truefalse",
    question: "Preservar locais históricos pode ajudar a manter a identidade cultural de uma comunidade.",
    correct: true,
    explanation: "A preservação do patrimônio ajuda a manter vivas referências históricas e culturais importantes para as gerações atuais e futuras."
  },

  {
    type: "multiple",
    question: "Como o patrimônio cultural pode contribuir para uma cidade sustentável?",
    options: [
      "Fortalecendo a identidade local e valorizando a história da comunidade",
      "Eliminando espaços públicos",
      "Aumentando obrigatoriamente o trânsito",
      "Substituindo todas as áreas verdes"
    ],
    correct: 0,
    explanation: "Uma cidade sustentável também valoriza sua história e sua cultura, preservando referências importantes para as gerações atuais e futuras."
  }
],

6: [
  {
    type: "multiple",
    question: "O que significa uma cidade ser resiliente?",
    options: [
      "Ser capaz de se preparar e responder melhor a situações de risco",
      "Nunca sofrer nenhum desastre",
      "Construir apenas prédios muito altos",
      "Evitar qualquer mudança no planejamento urbano"
    ],
    correct: 0,
    explanation: "Resiliência urbana envolve preparação, prevenção e capacidade de recuperação diante de eventos como enchentes, deslizamentos e outros desastres."
  },

  {
    type: "truefalse",
    question: "Uma cidade resiliente deve estar preparada para enfrentar situações de risco, como enchentes e deslizamentos.",
    correct: true,
    explanation: "O planejamento e a prevenção ajudam as cidades a reduzir riscos e responder melhor quando situações de emergência acontecem."
  },

  {
    type: "multiple",
    question: "Por que o planejamento é importante para reduzir os riscos de desastres?",
    options: [
      "Porque permite identificar riscos e preparar medidas de prevenção",
      "Porque elimina completamente os fenômenos naturais",
      "Porque impede o crescimento das cidades",
      "Porque aumenta a ocupação de áreas de risco"
    ],
    correct: 0,
    explanation: "Mapear áreas de risco e planejar o uso do território permite que governos e comunidades adotem medidas antes que situações perigosas aconteçam."
  }
],

7: [
  {
    type: "multiple",
    question: "Qual é uma característica de um bom planejamento urbano?",
    options: [
      "Crescimento desorganizado",
      "Organização dos espaços considerando as necessidades da população",
      "Construção sem considerar infraestrutura",
      "Concentração de todos os serviços em uma única região"
    ],
    correct: 1,
    explanation: "O planejamento urbano ajuda a organizar moradias, transporte, áreas verdes, serviços e infraestrutura de maneira mais equilibrada."
  },

  {
    type: "truefalse",
    question: "O planejamento urbano deve considerar as necessidades da população e a infraestrutura disponível.",
    correct: true,
    explanation: "Um bom planejamento considera fatores como moradia, transporte, saneamento, áreas verdes, serviços públicos e qualidade de vida."
  },

  {
    type: "multiple",
    question: "Por que é importante planejar a expansão das cidades?",
    options: [
      "Para evitar problemas de infraestrutura e ocupação inadequada",
      "Para aumentar a distância entre moradias e serviços",
      "Para eliminar espaços públicos",
      "Para impedir qualquer crescimento populacional"
    ],
    correct: 0,
    explanation: "Quando uma cidade cresce sem planejamento, pode enfrentar problemas como falta de transporte, saneamento insuficiente e ocupação de áreas inadequadas."
  }
],

8: [
  {
    type: "multiple",
    question: "O que caracteriza uma cidade inclusiva?",
    options: [
      "Uma cidade acessível e que busca atender diferentes grupos da população",
      "Uma cidade com espaços públicos exclusivos",
      "Uma cidade planejada apenas para motoristas",
      "Uma cidade sem transporte público"
    ],
    correct: 0,
    explanation: "A inclusão urbana busca garantir que diferentes pessoas possam utilizar espaços, serviços e oportunidades oferecidos pela cidade."
  },

  {
    type: "truefalse",
    question: "Rampas, calçadas adequadas e sinalização podem melhorar a acessibilidade dos espaços urbanos.",
    correct: true,
    explanation: "Recursos de acessibilidade facilitam o uso dos espaços públicos por pessoas com diferentes necessidades de mobilidade."
  },

  {
    type: "multiple",
    question: "Por que espaços públicos acessíveis são importantes?",
    options: [
      "Porque permitem que mais pessoas participem da vida da comunidade",
      "Porque diminuem a convivência entre moradores",
      "Porque devem ser utilizados apenas por determinados grupos",
      "Porque substituem o transporte público"
    ],
    correct: 0,
    explanation: "Praças, parques, calçadas e outros espaços públicos devem ser planejados para que diferentes pessoas possam utilizá-los com segurança e autonomia."
  }
],

9: [
  {
    type: "multiple",
    question: "Qual é um dos principais objetivos da ODS 11?",
    options: [
      "Incentivar o crescimento desorganizado das cidades",
      "Tornar as cidades e comunidades mais inclusivas, seguras, resilientes e sustentáveis",
      "Aumentar a quantidade de veículos particulares",
      "Concentrar a população nas grandes cidades"
    ],
    correct: 1,
    explanation: "A ODS 11 faz parte dos 17 Objetivos de Desenvolvimento Sustentável da ONU e busca melhorar a forma como as cidades são planejadas e vividas."
  },

  {
    type: "truefalse",
    question: "Uma cidade sustentável deve equilibrar qualidade de vida, desenvolvimento e proteção ambiental.",
    correct: true,
    explanation: "A sustentabilidade urbana busca atender às necessidades da população sem comprometer os recursos e as condições de vida das futuras gerações."
  },

  {
    type: "multiple",
    question: "Qual atitude pode contribuir para reduzir os impactos ambientais de uma cidade?",
    options: [
      "Aumentar o desperdício de recursos",
      "Incentivar o uso eficiente de recursos e práticas sustentáveis",
      "Reduzir áreas verdes",
      "Aumentar o descarte irregular de resíduos"
    ],
    correct: 1,
    explanation: "O uso eficiente de água, energia e materiais pode ajudar as cidades a reduzir desperdícios e diminuir seus impactos sobre o meio ambiente."
  }
],
};

// ─── Achievements ─────────────────────────────────────────────────────────────


const ACHIEVEMENTS = [
  { id: "first_mission", name: "Primeira Missão", desc: "Completou sua primeira missão da ODS 11", emoji: "🚀", color: "#4ade80" },
  { id: "eco_warrior", name: "Guerreiro Urbano", desc: "Completou 5 missões da ODS 11", emoji: "🏙️", color: "#56C02B" },
  { id: "water_saver", name: "Guardião do Saneamento", desc: "Completou a missão Saneamento Básico com 3 estrelas", emoji: "💧", color: "#26BDE2" },
  { id: "climate_hero", name: "Herói da Resiliência", desc: "Completou a missão Resiliência Climática com pontuação máxima", emoji: "🌍", color: "#3F7E44" },
  { id: "quiz_master", name: "Mestre do Quiz", desc: "Acertou 10 questões seguidas", emoji: "🧠", color: "#fbbf24" },
  { id: "perfect_score", name: "Pontuação Perfeita", desc: "Conseguiu 100% em qualquer missão da ODS 11", emoji: "⭐", color: "#FD6925" },
  { id: "global_citizen", name: "Cidadão da Cidade", desc: "Completou todas as 9 missões da ODS 11", emoji: "🌐", color: "#19486A" },
  { id: "speed_runner", name: "Velocista Urbano", desc: "Completou uma missão em menos de 2 minutos", emoji: "⚡", color: "#FCC30B" },
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
    <h1
      className="text-5xl md:text-6xl font-black tracking-tight"
      style={{
        fontFamily: "Fredoka One, sans-serif",
        color: "#4ade80",
        textShadow: "0 0 40px #4ade8066"
      }}
    >
      Missão ODS
    </h1>

    <p
      className="text-white/70 mt-2 text-base"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      Aprenda sobre a ODS 11 — Cidades e Comunidades Sustentáveis
    </p>
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
          <p className="text-white/60 text-sm mt-1" style={{ fontFamily: "Nunito, sans-serif" }}>{completedPhases.length}/9 missões concluídas · {totalXP} XP conquistados</p>
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
