const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");

// Criar e adicionar botão "Voltar"
const botaoVoltar = document.createElement("button");
botaoVoltar.textContent = "Voltar";
botaoVoltar.style.marginTop = "1rem";
botaoVoltar.style.display = "none";
botaoVoltar.classList.add("botao-voltar");
caixaAlternativas.parentElement.appendChild(botaoVoltar);

// Criar e adicionar botão "Avançar"
const botaoAvancar = document.createElement("button");
botaoAvancar.textContent = "Avançar";
botaoAvancar.style.marginTop = "1rem";
botaoAvancar.style.display = "inline-block";
botaoAvancar.classList.add("botao-avancar");
caixaAlternativas.parentElement.appendChild(botaoAvancar);

// Criar e adicionar botão "Tentar Novamente"
const botaoTentarNovamente = document.createElement("button");
botaoTentarNovamente.textContent = "Tentar Novamente";
botaoTentarNovamente.style.marginTop = "1.5rem";
botaoTentarNovamente.style.display = "none";
botaoTentarNovamente.style.marginRight = "0.6rem";
botaoTentarNovamente.classList.add("botao-tentar-novamente");
caixaAlternativas.parentElement.appendChild(botaoTentarNovamente);

// Criar e adicionar botão "Compartilhar Resultado"
const botaoCompartilhar = document.createElement("button");
botaoCompartilhar.textContent = "Compartilhar Resultado";
botaoCompartilhar.style.marginTop = "1.5rem";
botaoCompartilhar.style.display = "none";
botaoCompartilhar.classList.add("botao-compartilhar");
caixaAlternativas.parentElement.appendChild(botaoCompartilhar);

// Criar container da barra de progresso dentro do quiz
const containerBarraProgresso = document.createElement("div");
containerBarraProgresso.classList.add("barra-progresso-container");
containerBarraProgresso.style.marginTop = "1rem";
containerBarraProgresso.style.display = "flex";
containerBarraProgresso.style.alignItems = "center";
containerBarraProgresso.style.gap = "1rem";

// Texto do progresso (ex: Pergunta 1 de 5)
const textoProgresso = document.createElement("div");
textoProgresso.style.fontSize = "1rem";
containerBarraProgresso.appendChild(textoProgresso);

// Barra externa
const barraExterna = document.createElement("div");
barraExterna.style.flexGrow = "1";
barraExterna.style.height = "10px";
barraExterna.style.backgroundColor = "#ccc";
barraExterna.style.borderRadius = "5px";
barraExterna.style.overflow = "hidden";
containerBarraProgresso.appendChild(barraExterna);

// Barra interna (que cresce conforme progresso)
const barraInterna = document.createElement("div");
barraInterna.style.height = "100%";
barraInterna.style.backgroundColor = "#007BFF";
barraInterna.style.width = "0%";
barraInterna.style.transition = "width 0.3s ease";
barraInterna.style.borderRadius = "5px";
barraExterna.appendChild(barraInterna);

// Inserir barra de progresso logo abaixo das alternativas
caixaAlternativas.parentElement.appendChild(containerBarraProgresso);

// Dados das perguntas (com as 7 perguntas, incluindo as 2 novas)
const perguntas = [
  {
    enunciado: "Assim que saiu da escola você se depara com uma nova tecnologia...",
    alternativas: [
      { texto: "Isso é assustador!", afirmacao: "No início ficou com medo do que essa tecnologia pode fazer." },
      { texto: "Isso é maravilhoso!", afirmacao: "Quis saber como usar IA no seu dia a dia." }
    ]
  },
  {
    enunciado: "Com a descoberta desta tecnologia, uma professora propõe um trabalho...",
    alternativas: [
      { texto: "Utiliza IA para encontrar informações e facilitar entendimento.", afirmacao: "Conseguiu utilizar a IA para buscar informações úteis." },
      { texto: "Faz o trabalho com base em pesquisas próprias.", afirmacao: "Sentiu mais facilidade em utilizar seus próprios recursos." }
    ]
  },
  {
    enunciado: "Durante um debate sobre IA e o futuro do trabalho, qual seu posicionamento?",
    alternativas: [
      { texto: "Defende IA como geradora de novas oportunidades.", afirmacao: "Vem impulsionando a inovação e novos caminhos profissionais com IA." },
      { texto: "Preocupado com a perda de empregos para máquinas.", afirmacao: "Criou um grupo para discutir ética na IA." }
    ]
  },
  {
    enunciado: "Como criar uma imagem que represente sua visão de IA?",
    alternativas: [
      { texto: "Usar Paint ou outro editor tradicional.", afirmacao: "Compartilhou conhecimento com quem usa ferramentas tradicionais." },
      { texto: "Utilizar um gerador de imagem com IA.", afirmacao: "Acelerou criações e ajudou quem tem dificuldade em desenhar." }
    ]
  },
  {
    enunciado: "Um colega usou IA para copiar todo o trabalho. O que você faz?",
    alternativas: [
      { texto: "Aceita o texto inteiro como contribuição válida.", afirmacao: "Agora depende da IA para tudo." },
      { texto: "Revê o trabalho e contribui com sua própria perspectiva.", afirmacao: "Entendeu que IA é ferramenta e não produto final." }
    ]
  },
  {
    enunciado: "Você encontra um robô com IA que desenvolve emoções. O que faz?",
    alternativas: [
      { texto: "Testa seus limites, curioso sobre sua consciência.", afirmacao: "Você buscou entender como emoções artificiais funcionam." },
      { texto: "Mantém distância, por não confiar na IA emocional.", afirmacao: "Você preferiu manter uma postura crítica diante da IA emocional." }
    ]
  },
  {
    enunciado: "Você é convidado para um projeto que usa IA para decidir políticas públicas. Qual sua atitude?",
    alternativas: [
      { texto: "Aceita e tenta aplicar IA com responsabilidade social.", afirmacao: "Você se engajou na construção de decisões mais justas com IA." },
      { texto: "Recusa, pois acredita que decisões humanas não devem ser automatizadas.", afirmacao: "Você preferiu preservar o papel humano nas grandes decisões." }
    ]
  }
];

let atual = 0;
let historiaFinal = "";
let respostasEscolhidas = [];

function atualizaBarraProgresso() {
  const total = perguntas.length;
  const atualCorrigido = atual < total ? atual + 1 : total;
  textoProgresso.textContent = `Pergunta ${atualCorrigido} de ${total}`;
  const percentual = (atualCorrigido / total) * 100;
  barraInterna.style.width = percentual + "%";
}

function mostraPergunta() {
  if (atual >= perguntas.length) {
    mostraResultado();
    return;
  }

  const perguntaAtual = perguntas[atual];
  caixaPerguntas.textContent = perguntaAtual.enunciado;
  caixaAlternativas.innerHTML = "";

  perguntaAtual.alternativas.forEach((alternativa, index) => {
    const botao = document.createElement("button");
    botao.textContent = alternativa.texto;
    botao.setAttribute("aria-label", alternativa.texto);

    if (respostasEscolhidas[atual] === index) {
      botao.classList.add("selecionado");
    }

    botao.addEventListener("click", () => {
      respostasEscolhidas[atual] = index;
      const botoes = caixaAlternativas.querySelectorAll("button");
      botoes.forEach(b => b.classList.remove("selecionado"));
      botao.classList.add("selecionado");
    });

    caixaAlternativas.appendChild(botao);
  });

  botaoVoltar.style.display = atual > 0 ? "inline-block" : "none";
  botaoAvancar.style.display = "inline-block";
  botaoTentarNovamente.style.display = "none";
  botaoCompartilhar.style.display = "none";
  textoResultado.textContent = "";

  containerBarraProgresso.style.display = "flex";
  atualizaBarraProgresso();
}

function avancarPergunta() {
  if (atual < perguntas.length) {
    if (respostasEscolhidas[atual] === undefined) {
      alert("Por favor, selecione uma alternativa antes de avançar.");
      return;
    }

    const indice = respostasEscolhidas[atual];
    const alternativa = perguntas[atual].alternativas[indice];
    historiaFinal += alternativa.afirmacao + " ";

    atual++;
    mostraPergunta();
  }
}

function voltarPergunta() {
  if (atual > 0) {
    atual--;
    const indiceAnterior = respostasEscolhidas[atual];
    const altAnterior = perguntas[atual].alternativas[indiceAnterior];
    historiaFinal = historiaFinal.replace(altAnterior.afirmacao + " ", "");
    mostraPergunta();
  }
}

function mostraResultado() {
  caixaPerguntas.textContent = "Em 2049...";
  caixaAlternativas.innerHTML = "";

  const frases = respostasEscolhidas.map((indice, i) => {
    if (indice === undefined) return "";
    return perguntas[i].alternativas[indice].afirmacao;
  }).filter(Boolean);

  const textoFinal = frases.join(". ") + ".";

  // Avaliação automática baseada nas respostas
  const positivos = [
    "Quis saber como usar IA no seu dia a dia.",
    "Conseguiu utilizar a IA para buscar informações úteis.",
    "Vem impulsionando a inovação e novos caminhos profissionais com IA.",
    "Acelerou criações e ajudou quem tem dificuldade em desenhar.",
    "Entendeu que IA é ferramenta e não produto final.",
    "Você buscou entender como emoções artificiais funcionam.",
    "Você se engajou na construção de decisões mais justas com IA."
  ];

  const score = frases.filter(f => positivos.includes(f)).length;
  let avaliacao = "";

  if (score >= 6) {
    avaliacao = "Você é um entusiasta da IA e enxerga nela um caminho para transformar positivamente o mundo.";
  } else if (score >= 4) {
    avaliacao = "Você utiliza a IA de forma equilibrada, avaliando seus limites e possibilidades.";
  } else {
    avaliacao = "Você encara a IA com cautela, priorizando sempre o julgamento humano e ético.";
  }

  textoResultado.innerHTML = `
    <div style="
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background: linear-gradient(135deg, #eaf1ff, #f9fbff);
      border-left: 6px solid #007BFF;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      font-size: 1.15rem;
      line-height: 1.7;
      color: #333;
      text-align: justify;
    ">
      <p style="margin-bottom: 2rem;">${textoFinal}</p>
      <div style="text-align: center; font-weight: bold; font-size: 1.2rem; color: #0056b3;">
        ${avaliacao}
      </div>
    </div>
    <div style="text-align: center; margin-top: 1rem; font-size: 1.1rem; font-weight: bold; color: #007BFF;">
      Obrigado
    </div>
  `;

  botaoVoltar.style.display = "none";
  botaoAvancar.style.display = "none";
  botaoTentarNovamente.style.display = "inline-block";
  botaoCompartilhar.style.display = "inline-block";

  containerBarraProgresso.style.display = "none";
}

function compartilharResultado() {
  const textoParaCompartilhar = textoResultado.textContent.trim();
  if (!textoParaCompartilhar) {
    alert("Nada para compartilhar ainda.");
    return;
  }

  navigator.clipboard.writeText(textoParaCompartilhar)
    .then(() => {
      alert("Resultado copiado para a área de transferência!");
    })
    .catch(() => {
      alert("Não foi possível copiar o texto automaticamente.");
    });
}

function reiniciarQuestionario() {
  atual = 0;
  historiaFinal = "";
  respostasEscolhidas = [];
  textoResultado.textContent = "";
  containerBarraProgresso.style.display = "flex";
  mostraPergunta();
}

botaoVoltar.addEventListener("click", voltarPergunta);
botaoAvancar.addEventListener("click", avancarPergunta);
botaoTentarNovamente.addEventListener("click", reiniciarQuestionario);
botaoCompartilhar.addEventListener("click", compartilharResultado);

mostraPergunta();