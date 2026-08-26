export const TBD = "[INFORMAÇÃO A SER FORNECIDA PELA AEIFI]";

export const org = {
  sigla: "AEIFI",
  nome: "Associação dos Empreendedores Individuais",
  razaoSocial: TBD,
  cnpj: TBD,
  fundacao: TBD,
  sede: TBD,
  cidade: "Foz do Iguaçu, Paraná",
  telefone: TBD,
  whatsapp: TBD,
  email: TBD,
  horario: TBD,
  redes: [
    { nome: "Instagram", url: TBD },
    { nome: "Facebook", url: TBD },
  ],
  missao:
    "Apoiar, representar e conectar microempreendedores individuais e pequenos negócios, criando oportunidades reais de desenvolvimento para quem empreende na cidade.",
  visao:
    "Ser a referência associativa do microempreendedorismo, reconhecida pela seriedade, pela capacidade de articulação e pelo impacto concreto na vida de quem empreende.",
  valores: [
    {
      titulo: "Coletividade",
      texto:
        "Acreditamos que empreendedores avançam mais longe quando caminham juntos. A associação existe para transformar esforços individuais em força coletiva.",
    },
    {
      titulo: "Transparência",
      texto:
        "Documentos, decisões e resultados são apresentados de forma aberta a associados, parceiros e à comunidade.",
    },
    {
      titulo: "Compromisso local",
      texto:
        "Nossa atuação é enraizada em Foz do Iguaçu. Fortalecer o pequeno negócio é fortalecer os bairros, as famílias e a economia da cidade.",
    },
    {
      titulo: "Respeito e inclusão",
      texto:
        "Atendemos empreendedores de todos os perfis, setores e regiões da cidade, sem distinção.",
    },
    {
      titulo: "Inovação com propósito",
      texto:
        "Desenvolvemos soluções práticas — como o BuscaMEI — sempre a serviço da missão institucional, nunca como um fim em si mesmas.",
    },
  ],
  objetivos: [
    "Representar os interesses dos microempreendedores individuais junto ao poder público, entidades e instituições.",
    "Promover capacitação continuada e acesso à informação de qualidade para pequenos negócios.",
    "Estimular conexões entre empreendedores, consumidores, empresas e instituições da cidade.",
    "Criar e divulgar oportunidades de negócio, formalização e crescimento.",
    "Desenvolver projetos e ferramentas que ampliem a visibilidade e a competitividade do pequeno negócio local.",
    "Manter uma gestão transparente, participativa e prestadora de contas.",
  ],
  publico: [
    "Microempreendedores individuais (MEI) formalizados",
    "Empreendedores em processo de formalização",
    "Pequenos negócios e empresas de pequeno porte",
    "Autônomos e profissionais que atuam por conta própria",
    "Instituições, empresas e órgãos públicos parceiros",
  ],
};

export type Area = {
  slug: string;
  titulo: string;
  resumo: string;
  descricao: string;
  praticas: string[];
};

export const areas: Area[] = [
  {
    slug: "representatividade",
    titulo: "Representatividade",
    resumo: "Fortalecimento e representação dos interesses dos empreendedores.",
    descricao:
      "A AEIFI existe para que o microempreendedor individual não precise falar sozinho. Reunimos demandas comuns, organizamos a pauta do segmento e levamos essa voz a espaços de decisão, entidades e instituições que influenciam o dia a dia de quem empreende na cidade.",
    praticas: [
      "Escuta permanente das demandas dos associados",
      "Articulação com poder público, entidades e instituições locais",
      "Participação em fóruns, conselhos e reuniões de interesse do segmento",
      "Posicionamento institucional sobre temas que afetam o pequeno negócio",
    ],
  },
  {
    slug: "capacitacao",
    titulo: "Capacitação",
    resumo: "Cursos, palestras, oficinas e iniciativas para o desenvolvimento dos empreendedores.",
    descricao:
      "Conhecimento aplicado é o que separa uma ideia de um negócio que se sustenta. A AEIFI promove e viabiliza ações formativas voltadas à realidade do microempreendedor: gestão simples, formalização, atendimento, precificação, presença digital e organização financeira.",
    praticas: [
      "Oficinas e cursos práticos para MEIs e pequenos negócios",
      "Palestras e encontros temáticos com especialistas e parceiros",
      "Orientação sobre formalização e obrigações do MEI",
      "Conteúdos e materiais de apoio para os associados",
    ],
  },
  {
    slug: "conexoes",
    titulo: "Conexões",
    resumo: "Aproximação entre empreendedores, consumidores, empresas, instituições e parceiros.",
    descricao:
      "Boa parte das oportunidades nasce de um encontro. A associação cria pontes: entre empreendedores que podem comprar e vender entre si, entre pequenos negócios e consumidores da cidade, e entre a base empreendedora e instituições capazes de apoiá-la.",
    praticas: [
      "Encontros e reuniões de associados",
      "Aproximação entre empreendedores e consumidores locais",
      "Intermediação de contatos com empresas e instituições",
      "Rede de parceiros à disposição dos associados",
    ],
  },
  {
    slug: "oportunidades",
    titulo: "Oportunidades",
    resumo: "Criação e divulgação de oportunidades para o fortalecimento dos pequenos negócios.",
    descricao:
      "Identificamos, organizamos e divulgamos oportunidades que muitas vezes não chegam ao microempreendedor: editais, feiras, ações de divulgação, chamadas de parceiros e espaços de comercialização.",
    praticas: [
      "Divulgação de editais, feiras e chamadas públicas",
      "Espaços de exposição e comercialização para associados",
      "Ações conjuntas de divulgação dos pequenos negócios",
      "Encaminhamento de demandas de compradores para associados",
    ],
  },
  {
    slug: "projetos-e-inovacao",
    titulo: "Projetos e inovação",
    resumo: "Desenvolvimento de soluções que contribuam para o crescimento dos empreendedores.",
    descricao:
      "A AEIFI desenvolve projetos e ferramentas próprias quando identifica um problema concreto que o mercado não resolve. É desse trabalho que nasceu o BuscaMEI, plataforma criada pela associação para ampliar a visibilidade dos microempreendedores da cidade.",
    praticas: [
      "Diagnóstico de dificuldades recorrentes dos associados",
      "Desenvolvimento de soluções próprias, como o BuscaMEI",
      "Projetos em parceria com instituições e empresas",
      "Acompanhamento de resultados e melhoria contínua",
    ],
  },
];

export type Iniciativa = {
  slug: string;
  titulo: string;
  etiqueta: string;
  resumo: string;
  problema: string;
  objetivo: string;
  publico: string;
  funcionamento: string[];
  resultados: string;
  parceiros: string;
  destaque?: boolean;
  href?: string;
};

export const iniciativas: Iniciativa[] = [
  {
    slug: "buscamei",
    titulo: "BuscaMEI",
    etiqueta: "Um produto da AEIFI",
    resumo:
      "Plataforma criada pela AEIFI para ampliar a visibilidade dos microempreendedores e facilitar a conexão entre quem oferece e quem procura produtos e serviços.",
    problema:
      "Muitos microempreendedores prestam serviços de qualidade, mas são pouco encontrados por quem procura. A ausência de presença digital organizada limita o alcance do negócio.",
    objetivo:
      "Ampliar a visibilidade dos microempreendedores e facilitar que consumidores encontrem produtos e serviços locais.",
    publico:
      "Microempreendedores individuais e pequenos negócios; e a comunidade que procura produtos e serviços na cidade.",
    funcionamento: [
      "O empreendedor cadastra seu negócio, atividades e formas de contato.",
      "As informações ficam organizadas por tipo de produto ou serviço.",
      "Quem procura faz a busca e encontra empreendedores locais.",
      "O contato acontece diretamente entre consumidor e empreendedor.",
    ],
    resultados: TBD,
    parceiros: TBD,
    destaque: true,
    href: "/buscamei",
  },
  {
    slug: "programa-de-capacitacao",
    titulo: "Programa de capacitação de empreendedores",
    etiqueta: "Formação",
    resumo:
      "Ciclo de oficinas, cursos e palestras voltados às necessidades práticas de quem toca um pequeno negócio.",
    problema:
      "O microempreendedor costuma aprender na tentativa e erro, sem acesso a formação acessível e aplicada à sua realidade.",
    objetivo:
      "Oferecer formação prática e gratuita ou de baixo custo em temas essenciais para a sustentação do negócio.",
    publico: "MEIs, empreendedores em formalização e pequenos negócios da cidade.",
    funcionamento: [
      "Levantamento das necessidades formativas junto aos associados.",
      "Organização das turmas, temas e parcerias.",
      "Realização das atividades presenciais e/ou on-line.",
      "Acompanhamento e avaliação dos participantes.",
    ],
    resultados: TBD,
    parceiros: TBD,
  },
  {
    slug: "encontros-de-associados",
    titulo: "Encontros de associados",
    etiqueta: "Rede",
    resumo:
      "Reuniões periódicas para troca de experiências, apresentação de oportunidades e construção coletiva da pauta da associação.",
    problema: "Empreender sozinho gera isolamento e reduz o acesso a informação e oportunidades.",
    objetivo:
      "Manter uma rede ativa de empreendedores que se conhecem, se indicam e decidem juntos os rumos da associação.",
    publico: "Associados da AEIFI e empreendedores interessados em participar.",
    funcionamento: [
      "Convocação e divulgação do encontro aos associados.",
      "Pauta com informes institucionais e temas de interesse.",
      "Espaço de apresentação dos negócios participantes.",
      "Registro das deliberações e encaminhamentos.",
    ],
    resultados: TBD,
    parceiros: TBD,
  },
  {
    slug: "apoio-a-formalizacao",
    titulo: "Apoio à formalização e orientação ao MEI",
    etiqueta: "Atendimento",
    resumo:
      "Orientação sobre abertura, obrigações e regularização do MEI, com encaminhamento aos órgãos e parceiros competentes.",
    problema:
      "Dúvidas sobre formalização, declaração anual e obrigações fazem muitos empreendedores permanecerem informais ou irregulares.",
    objetivo:
      "Reduzir barreiras de informação para que mais empreendedores atuem formalmente e com segurança.",
    publico: "Empreendedores informais, MEIs recém-abertos e MEIs em regularização.",
    funcionamento: [
      "Atendimento e escuta da situação do empreendedor.",
      "Orientação sobre os passos e documentos necessários.",
      "Encaminhamento a órgãos e parceiros quando necessário.",
      "Acompanhamento do caso pela associação.",
    ],
    resultados: TBD,
    parceiros: TBD,
  },
];

export const impacto = [
  { valor: TBD, rotulo: "Empreendedores apoiados" },
  { valor: TBD, rotulo: "Associados ativos" },
  { valor: TBD, rotulo: "Capacitações realizadas" },
  { valor: TBD, rotulo: "Eventos e ações institucionais" },
  { valor: TBD, rotulo: "Parceiros e instituições" },
  { valor: TBD, rotulo: "Empreendedores no BuscaMEI" },
];

export const depoimentos = [
  { texto: TBD, autor: TBD, negocio: TBD },
  { texto: TBD, autor: TBD, negocio: TBD },
];

export type Noticia = {
  slug: string;
  titulo: string;
  data: string;
  categoria: string;
  resumo: string;
  corpo: string[];
};

export const noticias: Noticia[] = [
  {
    slug: "aeifi-apresenta-o-buscamei-aos-associados",
    titulo: "AEIFI apresenta o BuscaMEI aos associados",
    data: TBD,
    categoria: "Projetos",
    resumo:
      "A associação apresentou aos associados a plataforma desenvolvida para ampliar a visibilidade dos microempreendedores da cidade.",
    corpo: [
      "A AEIFI apresentou aos seus associados o BuscaMEI, plataforma desenvolvida pela própria associação para ampliar a visibilidade dos microempreendedores e facilitar a conexão entre quem oferece e quem procura produtos e serviços.",
      "Durante o encontro foram explicados o funcionamento do cadastro, as informações que ficam visíveis para quem faz a busca e a forma como a ferramenta se articula com as demais ações da associação.",
      `Detalhes da atividade, data, local e número de participantes: ${TBD}.`,
    ],
  },
  {
    slug: "capacitacao-para-microempreendedores",
    titulo: "Capacitação para microempreendedores reúne participantes em Foz do Iguaçu",
    data: TBD,
    categoria: "Capacitação",
    resumo:
      "Atividade formativa abordou temas práticos de gestão para quem toca um pequeno negócio na cidade.",
    corpo: [
      "A AEIFI realizou mais uma atividade de capacitação voltada a microempreendedores individuais e pequenos negócios de Foz do Iguaçu, dentro do seu programa permanente de formação.",
      "A programação tratou de temas práticos do dia a dia do empreendedor, como organização financeira, atendimento ao cliente e presença digital.",
      `Data, local, conteúdo programático, parceiros e número de participantes: ${TBD}.`,
    ],
  },
  {
    slug: "aeifi-amplia-rede-de-parceiros",
    titulo: "AEIFI amplia sua rede de parceiros institucionais",
    data: TBD,
    categoria: "Parcerias",
    resumo:
      "Novas articulações buscam ampliar as oportunidades oferecidas aos empreendedores associados.",
    corpo: [
      "A associação segue ampliando sua rede de parceiros com empresas, entidades, instituições de ensino e órgãos públicos interessados em contribuir com o desenvolvimento do microempreendedorismo em Foz do Iguaçu.",
      "As parcerias viabilizam capacitações, ações de divulgação, espaços de comercialização e apoio técnico às iniciativas da AEIFI.",
      `Relação de parceiros, escopo de cada parceria e datas: ${TBD}.`,
    ],
  },
];

export const diretoria = [
  { id: "presidencia", cargo: "Presidência", nome: TBD },
  { id: "secretaria", cargo: "Secretaria", nome: TBD },
  { id: "tesouraria", cargo: "Tesouraria", nome: TBD },
  { id: "conselho-fiscal", cargo: "Conselho fiscal", nome: TBD },
];

export const documentos = [
  {
    nome: "Estatuto Social",
    descricao:
      "Documento que define a finalidade, a estrutura e as regras de funcionamento da associação.",
    situacao: TBD,
  },
  {
    nome: "Ata de fundação",
    descricao: "Registro da constituição formal da AEIFI.",
    situacao: TBD,
  },
  {
    nome: "Ata de eleição da diretoria vigente",
    descricao: "Registro da composição atual da diretoria e do conselho fiscal.",
    situacao: TBD,
  },
  {
    nome: "Cartão CNPJ",
    descricao: "Comprovante de inscrição e situação cadastral da associação.",
    situacao: TBD,
  },
  {
    nome: "Relatório anual de atividades",
    descricao: "Resumo das ações, projetos e resultados do período.",
    situacao: TBD,
  },
  {
    nome: "Prestação de contas",
    descricao: "Demonstração das receitas e despesas do exercício, quando aplicável.",
    situacao: TBD,
  },
];

export const beneficiosAssociado = [
  "Representação institucional dos seus interesses como microempreendedor.",
  "Participação nas capacitações, oficinas e palestras promovidas pela associação.",
  "Acesso à rede de empreendedores, parceiros e instituições da AEIFI.",
  "Divulgação do seu negócio nas ações e canais da associação.",
  "Cadastro e presença no BuscaMEI, plataforma desenvolvida pela AEIFI.",
  "Orientação sobre formalização, obrigações e regularização do MEI.",
  "Voz e voto nas assembleias, participando das decisões da associação.",
];

export const formatosParceria = [
  {
    titulo: "Apoio a capacitações",
    texto: "Ceder instrutores, conteúdo, espaço ou estrutura para oficinas, cursos e palestras.",
  },
  {
    titulo: "Projetos conjuntos",
    texto: "Desenvolver com a AEIFI projetos voltados ao fortalecimento do pequeno negócio local.",
  },
  {
    titulo: "Oportunidades para associados",
    texto:
      "Oferecer condições, serviços, espaços de comercialização ou vagas de compra a empreendedores associados.",
  },
  {
    titulo: "Apoio institucional",
    texto:
      "Somar-se às ações da associação com apoio técnico, articulação ou patrocínio de iniciativas.",
  },
];
