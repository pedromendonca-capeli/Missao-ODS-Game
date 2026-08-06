import { useState, useEffect, useRef } from "react";

// ─── SDG Data ────────────────────────────────────────────────────────────────
const SDGs
 = [
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
  {
    type: "multiple",
    question: "Qual é o principal objetivo do ODS 1 - Erradicação da Pobreza?",
    options: [
      "Aumentar a produção industrial mundial",
      "Acabar com a pobreza em todas as suas formas e lugares",
      "Garantir energia limpa para todos",
      "Proteger os oceanos"
    ],
    correct: 1,
    explanation: "O ODS 1 busca eliminar a pobreza extrema e reduzir a pobreza em todas as suas formas."
  },
  {
    type: "truefalse",
    question: "A pobreza envolve apenas a falta de dinheiro, sem relação com acesso à educação, saúde e moradia.",
    correct: false,
    explanation: "A pobreza é multidimensional e envolve também falta de oportunidades, serviços básicos e qualidade de vida."
  },
  {
    type: "multiple",
    question: "Qual medida contribui diretamente para reduzir a pobreza?",
    options: [
      "Diminuir investimentos em educação",
      "Aumentar desigualdades sociais",
      "Ampliar acesso à educação e oportunidades de trabalho",
      "Limitar serviços públicos"
    ],
    correct: 2,
    explanation: "Educação, emprego e acesso a serviços básicos são fundamentais para combater a pobreza."
  }
],

2: [
  {
    type: "multiple",
    question: "O ODS 2 tem como principal objetivo combater qual problema mundial?",
    options: [
      "A poluição dos oceanos",
      "A fome e a insegurança alimentar",
      "A falta de energia elétrica",
      "O excesso de tecnologia"
    ],
    correct: 1,
    explanation: "O ODS 2 busca acabar com a fome, garantir segurança alimentar e promover agricultura sustentável."
  },
  {
    type: "truefalse",
    question: "A agricultura sustentável busca produzir alimentos sem destruir os recursos naturais.",
    correct: true,
    explanation: "A agricultura sustentável procura equilibrar produção de alimentos, preservação ambiental e uso responsável dos recursos."
  },
  {
    type: "multiple",
    question: "Qual ação ajuda a combater o desperdício de alimentos?",
    options: [
      "Comprar mais alimentos do que o necessário",
      "Descartar alimentos próximos da validade",
      "Planejar compras e aproveitar melhor os alimentos",
      "Evitar qualquer tipo de agricultura"
    ],
    correct: 2,
    explanation: "Planejamento e aproveitamento dos alimentos reduzem desperdícios e ajudam na segurança alimentar."
  }
],

3: [
  {
    type: "multiple",
    question: "O ODS 3 busca garantir principalmente:",
    options: [
      "Saúde e bem-estar para todas as pessoas",
      "Construção de novas cidades",
      "Aumento do consumo mundial",
      "Expansão industrial"
    ],
    correct: 0,
    explanation: "O ODS 3 tem como objetivo promover vidas saudáveis e bem-estar em todas as idades."
  },
  {
    type: "truefalse",
    question: "A vacinação é uma das formas mais importantes de prevenção de doenças.",
    correct: true,
    explanation: "Vacinas ajudam a proteger indivíduos e comunidades contra diversas doenças."
  },
  {
    type: "multiple",
    question: "Qual atitude contribui para uma vida mais saudável?",
    options: [
      "Ignorar sintomas de doenças",
      "Manter alimentação equilibrada e praticar atividades físicas",
      "Evitar consultas médicas preventivas",
      "Usar medicamentos sem orientação"
    ],
    correct: 1,
    explanation: "Hábitos saudáveis e acompanhamento médico ajudam na prevenção de problemas de saúde."
  }
],
4: [
  {
    type: "multiple",
    question: "Qual é o principal objetivo do ODS 4 - Educação de Qualidade?",
    options: [
      "Garantir educação inclusiva, equitativa e de qualidade para todos",
      "Aumentar apenas o número de escolas particulares",
      "Substituir professores por tecnologia",
      "Reduzir o acesso ao ensino superior"
    ],
    correct: 0,
    explanation: "O ODS 4 busca garantir oportunidades de aprendizagem para todas as pessoas durante toda a vida."
  },
  {
    type: "truefalse",
    question: "A educação de qualidade contribui para reduzir desigualdades sociais e ampliar oportunidades.",
    correct: true,
    explanation: "A educação ajuda no desenvolvimento pessoal, profissional e social, diminuindo diferenças entre grupos."
  },
  {
    type: "multiple",
    question: "Qual atitude ajuda a melhorar a qualidade da educação?",
    options: [
      "Diminuir investimentos em escolas",
      "Garantir formação adequada para professores",
      "Impedir o uso de novas tecnologias",
      "Reduzir o acesso dos estudantes"
    ],
    correct: 1,
    explanation: "Professores preparados e boas condições de ensino são fundamentais para uma educação de qualidade."
  }
],

5: [
  {
    type: "multiple",
    question: "Qual é o principal objetivo do ODS 5 - Igualdade de Gênero?",
    options: [
      "Garantir igualdade de direitos e oportunidades entre gêneros",
      "Criar diferenças maiores entre homens e mulheres",
      "Eliminar a participação feminina na sociedade",
      "Diminuir o acesso à educação"
    ],
    correct: 0,
    explanation: "O ODS 5 busca alcançar a igualdade de gênero e fortalecer a autonomia de mulheres e meninas."
  },
  {
    type: "truefalse",
    question: "Garantir que meninas e mulheres tenham acesso à educação é uma ação relacionada ao ODS 5.",
    correct: true,
    explanation: "A igualdade de acesso à educação é essencial para ampliar oportunidades e combater desigualdades."
  },
  {
    type: "multiple",
    question: "Qual situação representa uma desigualdade de gênero?",
    options: [
      "Todas as pessoas recebem as mesmas oportunidades",
      "Mulheres e homens têm os mesmos direitos",
      "Uma pessoa é impedida de estudar ou trabalhar por causa do gênero",
      "Empresas promovem igualdade salarial"
    ],
    correct: 2,
    explanation: "Impedir oportunidades com base no gênero é uma forma de desigualdade."
  }
],

6: [
  {
    type: "multiple",
    question: "Qual é o objetivo principal do ODS 6 - Água Potável e Saneamento?",
    options: [
      "Garantir acesso à água potável e saneamento para todos",
      "Aumentar o consumo de água sem controle",
      "Eliminar rios e lagos",
      "Usar água apenas na indústria"
    ],
    correct: 0,
    explanation: "O ODS 6 busca garantir disponibilidade e gestão sustentável da água e saneamento básico."
  },
  {
    type: "truefalse",
    question: "O tratamento de esgoto ajuda a proteger a saúde das pessoas e o meio ambiente.",
    correct: true,
    explanation: "O saneamento adequado reduz doenças e evita a contaminação de rios e fontes de água."
  },
  {
    type: "multiple",
    question: "Qual atitude contribui para o uso sustentável da água?",
    options: [
      "Deixar torneiras abertas sem necessidade",
      "Desperdiçar água potável",
      "Reutilizar água quando possível e evitar desperdícios",
      "Jogar lixo em rios"
    ],
    correct: 2,
    explanation: "O uso consciente da água ajuda a preservar esse recurso essencial para as futuras gerações."
  }
],
7: [
  {
    type: "multiple",
    question: "Qual é o principal objetivo do ODS 7 - Energia Limpa e Acessível?",
    options: [
      "Garantir acesso a energia sustentável e confiável para todos",
      "Aumentar o uso de combustíveis poluentes",
      "Impedir o desenvolvimento de novas tecnologias",
      "Eliminar todas as fontes de energia"
    ],
    correct: 0,
    explanation: "O ODS 7 busca ampliar o acesso à energia limpa, renovável e eficiente."
  },
  {
    type: "truefalse",
    question: "Fontes de energia renovável, como solar e eólica, podem ajudar a reduzir impactos ambientais.",
    correct: true,
    explanation: "Energias renováveis emitem menos gases de efeito estufa e ajudam na transição energética."
  },
  {
    type: "multiple",
    question: "Qual fonte de energia é considerada renovável?",
    options: [
      "Carvão mineral",
      "Petróleo",
      "Energia solar",
      "Gás natural"
    ],
    correct: 2,
    explanation: "A energia solar é renovável porque utiliza a luz do Sol, um recurso naturalmente disponível."
  }
],

8: [
  {
    type: "multiple",
    question: "O ODS 8 busca promover principalmente:",
    options: [
      "Trabalho decente e crescimento econômico sustentável",
      "Apenas aumento do consumo",
      "Redução de empregos",
      "Fim das atividades econômicas"
    ],
    correct: 0,
    explanation: "O ODS 8 incentiva empregos dignos, direitos trabalhistas e crescimento econômico inclusivo."
  },
  {
    type: "truefalse",
    question: "Trabalho decente envolve condições seguras, direitos trabalhistas e respeito aos trabalhadores.",
    correct: true,
    explanation: "O trabalho decente garante dignidade, segurança e oportunidades para os trabalhadores."
  },
  {
    type: "multiple",
    question: "Qual situação está de acordo com o ODS 8?",
    options: [
      "Trabalhadores sem direitos",
      "Ambientes de trabalho inseguros",
      "Empregos com proteção e condições adequadas",
      "Exploração de mão de obra"
    ],
    correct: 2,
    explanation: "O ODS 8 defende empregos produtivos, seguros e com respeito aos direitos humanos."
  }
],

9: [
  {
    type: "multiple",
    question: "Qual é o foco principal do ODS 9 - Indústria, Inovação e Infraestrutura?",
    options: [
      "Construir infraestruturas resilientes e incentivar inovação",
      "Diminuir todo desenvolvimento tecnológico",
      "Evitar novas descobertas científicas",
      "Acabar com a indústria"
    ],
    correct: 0,
    explanation: "O ODS 9 busca promover infraestrutura sustentável, industrialização inclusiva e inovação."
  },
  {
    type: "truefalse",
    question: "A inovação tecnológica pode ajudar a criar soluções para problemas sociais e ambientais.",
    correct: true,
    explanation: "Novas tecnologias podem melhorar transportes, energia, saúde e comunicação."
  },
  {
    type: "multiple",
    question: "Qual exemplo representa uma infraestrutura sustentável?",
    options: [
      "Transportes públicos eficientes",
      "Construções sem planejamento",
      "Desperdício de recursos",
      "Uso excessivo de materiais poluentes"
    ],
    correct: 0,
    explanation: "Infraestruturas sustentáveis melhoram a qualidade de vida reduzindo impactos ambientais."
  }
],

10: [
  {
    type: "multiple",
    question: "Qual é o objetivo do ODS 10 - Redução das Desigualdades?",
    options: [
      "Diminuir desigualdades dentro dos países e entre eles",
      "Aumentar diferenças sociais",
      "Limitar oportunidades",
      "Reduzir direitos"
    ],
    correct: 0,
    explanation: "O ODS 10 busca promover inclusão social, econômica e política para todos."
  },
  {
    type: "truefalse",
    question: "A desigualdade pode estar relacionada ao acesso diferente a educação, saúde e oportunidades.",
    correct: true,
    explanation: "Diferenças no acesso a recursos e direitos podem gerar desigualdades sociais."
  },
  {
    type: "multiple",
    question: "Qual ação ajuda a reduzir desigualdades?",
    options: [
      "Garantir acesso igualitário a oportunidades",
      "Impedir grupos de participarem da sociedade",
      "Aumentar preconceitos",
      "Reduzir investimentos sociais"
    ],
    correct: 0,
    explanation: "Políticas de inclusão e igualdade de oportunidades ajudam a diminuir desigualdades."
  }
],

11: [
  {
    type: "multiple",
    question: "O ODS 11 tem como objetivo tornar as cidades:",
    options: [
      "Mais inclusivas, seguras, resilientes e sustentáveis",
      "Mais poluídas",
      "Menos acessíveis",
      "Sem planejamento"
    ],
    correct: 0,
    explanation: "O ODS 11 busca melhorar a qualidade de vida nas cidades."
  },
  {
    type: "truefalse",
    question: "O planejamento urbano pode ajudar a reduzir problemas como trânsito e falta de áreas verdes.",
    correct: true,
    explanation: "Cidades planejadas conseguem oferecer melhores serviços e qualidade de vida."
  },
  {
    type: "multiple",
    question: "Qual exemplo contribui para uma cidade sustentável?",
    options: [
      "Mais áreas verdes e transporte público eficiente",
      "Aumento do desperdício",
      "Destruição de espaços naturais",
      "Falta de planejamento urbano"
    ],
    correct: 0,
    explanation: "Áreas verdes e mobilidade sustentável tornam as cidades mais equilibradas."
  }
],

12: [
  {
    type: "multiple",
    question: "Qual é o principal objetivo do ODS 12 - Consumo e Produção Responsáveis?",
    options: [
      "Garantir padrões sustentáveis de consumo e produção",
      "Estimular o desperdício",
      "Aumentar a produção sem limites",
      "Ignorar impactos ambientais"
    ],
    correct: 0,
    explanation: "O ODS 12 busca usar recursos naturais de forma eficiente e reduzir desperdícios."
  },
  {
    type: "truefalse",
    question: "Reciclagem e reutilização de materiais ajudam a diminuir impactos ambientais.",
    correct: true,
    explanation: "Essas práticas reduzem a quantidade de resíduos e economizam recursos naturais."
  },
  {
    type: "multiple",
    question: "Qual atitude representa consumo consciente?",
    options: [
      "Comprar apenas o necessário e evitar desperdícios",
      "Descartar produtos ainda úteis",
      "Comprar sem planejamento",
      "Desperdiçar água e energia"
    ],
    correct: 0,
    explanation: "O consumo consciente envolve escolhas responsáveis considerando impactos ambientais e sociais."
  }
],
13: [
  {
    type: "multiple",
    question: "Qual é o principal objetivo do ODS 13 - Ação Contra a Mudança do Clima?",
    options: [
      "Tomar medidas urgentes para combater as mudanças climáticas",
      "Aumentar a emissão de gases poluentes",
      "Reduzir pesquisas ambientais",
      "Eliminar fontes de energia renovável"
    ],
    correct: 0,
    explanation: "O ODS 13 busca combater as mudanças climáticas e seus impactos por meio de ações globais."
  },
  {
    type: "truefalse",
    question: "O desmatamento contribui para o aumento das mudanças climáticas.",
    correct: true,
    explanation: "As florestas armazenam carbono, e sua destruição aumenta a quantidade de gases de efeito estufa na atmosfera."
  },
  {
    type: "multiple",
    question: "Qual atitude ajuda a reduzir a emissão de gases de efeito estufa?",
    options: [
      "Usar transporte coletivo e energias renováveis",
      "Aumentar o consumo de combustíveis fósseis",
      "Desperdiçar energia",
      "Destruir áreas verdes"
    ],
    correct: 0,
    explanation: "Transportes sustentáveis e energias limpas ajudam a diminuir a emissão de carbono."
  }
],

14: [
  {
    type: "multiple",
    question: "Qual é o objetivo principal do ODS 14 - Vida na Água?",
    options: [
      "Conservar e utilizar de forma sustentável os oceanos e mares",
      "Aumentar a poluição dos oceanos",
      "Eliminar espécies marinhas",
      "Explorar recursos sem limites"
    ],
    correct: 0,
    explanation: "O ODS 14 busca proteger os ecossistemas marinhos e preservar a biodiversidade dos oceanos."
  },
  {
    type: "truefalse",
    question: "O descarte incorreto de plástico pode prejudicar animais marinhos.",
    correct: true,
    explanation: "Plásticos nos oceanos podem causar danos aos animais e desequilibrar ecossistemas."
  },
  {
    type: "multiple",
    question: "Qual ação ajuda a proteger a vida marinha?",
    options: [
      "Reduzir o uso de plásticos descartáveis",
      "Jogar lixo em rios",
      "Aumentar a pesca ilegal",
      "Destruir habitats marinhos"
    ],
    correct: 0,
    explanation: "Reduzir resíduos e proteger áreas marinhas ajuda na conservação dos oceanos."
  }
],

15: [
  {
    type: "multiple",
    question: "Qual é o foco principal do ODS 15 - Vida Terrestre?",
    options: [
      "Proteger ecossistemas terrestres e biodiversidade",
      "Aumentar o desmatamento",
      "Eliminar áreas naturais",
      "Reduzir espécies existentes"
    ],
    correct: 0,
    explanation: "O ODS 15 busca preservar florestas, combater a degradação do solo e proteger espécies."
  },
  {
    type: "truefalse",
    question: "A biodiversidade é importante porque mantém o equilíbrio dos ecossistemas.",
    correct: true,
    explanation: "Diversas espécies contribuem para o funcionamento saudável dos ambientes naturais."
  },
  {
    type: "multiple",
    question: "Qual atitude ajuda a preservar a vida terrestre?",
    options: [
      "Combater o desmatamento e proteger áreas naturais",
      "Destruir habitats de animais",
      "Aumentar a caça ilegal",
      "Poluir o solo"
    ],
    correct: 0,
    explanation: "A preservação dos habitats é essencial para proteger espécies e recursos naturais."
  }
],

16: [
  {
    type: "multiple",
    question: "O ODS 16 busca promover principalmente:",
    options: [
      "Paz, justiça e instituições eficazes",
      "Conflitos entre países",
      "Aumento da corrupção",
      "Redução dos direitos humanos"
    ],
    correct: 0,
    explanation: "O ODS 16 promove sociedades pacíficas, acesso à justiça e instituições responsáveis."
  },
  {
    type: "truefalse",
    question: "O combate à corrupção contribui para instituições mais justas e eficientes.",
    correct: true,
    explanation: "Instituições transparentes fortalecem a confiança da população e o desenvolvimento sustentável."
  },
  {
    type: "multiple",
    question: "Qual atitude está relacionada ao ODS 16?",
    options: [
      "Respeitar direitos humanos e promover justiça",
      "Impedir participação social",
      "Aumentar violência",
      "Diminuir transparência"
    ],
    correct: 0,
    explanation: "O ODS 16 defende sociedades inclusivas, pacíficas e baseadas em direitos."
  }
],

17: [
  {
    type: "multiple",
    question: "Qual é o principal objetivo do ODS 17 - Parcerias e Meios de Implementação?",
    options: [
      "Fortalecer parcerias globais para alcançar o desenvolvimento sustentável",
      "Separar países e impedir cooperação",
      "Reduzir comunicação internacional",
      "Eliminar projetos conjuntos"
    ],
    correct: 0,
    explanation: "O ODS 17 reconhece que a cooperação entre países, organizações e pessoas é essencial."
  },
  {
    type: "truefalse",
    question: "A colaboração entre governos, empresas e sociedade pode ajudar a alcançar os ODS.",
    correct: true,
    explanation: "Parcerias unem conhecimentos e recursos para solucionar desafios globais."
  },
  {
    type: "multiple",
    question: "Qual exemplo representa uma parceria sustentável?",
    options: [
      "Organizações trabalhando juntas para resolver problemas ambientais",
      "Países recusando qualquer cooperação",
      "Empresas ignorando impactos sociais",
      "Grupos impedindo projetos sustentáveis"
    ],
    correct: 0,
    explanation: "A cooperação entre diferentes setores aumenta as chances de alcançar metas sustentáveis."
  }
]
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
