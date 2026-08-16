# Site institucional AEIFI — plano de reestruturação

## 1. Diagnóstico da estrutura atual
O projeto está no template padrão: apenas a rota `/` com placeholder, nenhum conteúdo institucional, metadados genéricos ("Lovable App"), nenhum sistema de design próprio. Ou seja, construção do zero — sem risco de quebrar URLs existentes, mas também sem conteúdo aproveitável. Isso é positivo para Google Ad Grants: podemos nascer com missão clara, páginas completas e navegação simples.

## 2. Novo mapa do site
```text
/                     Início (institucional)
/a-aeifi              Quem Somos (história, missão, visão, valores, diretoria, CNPJ, sede)
/o-que-fazemos        Áreas de atuação detalhadas
/iniciativas          Projetos, produtos, eventos e programas
/buscamei             BuscaMEI — um produto da AEIFI (conteúdo original completo)
/noticias             Notícias e atividades
/transparencia        Documentos, estatuto, diretoria, relatórios
/parceiros            Parceiros e "Seja parceiro da AEIFI"
/associe-se           Faça parte da AEIFI
/contato              Contato e atendimento
/politica-de-privacidade
```
Menu: Início | A AEIFI | O que fazemos | Projetos e Iniciativas | BuscaMEI | Notícias | Transparência | Associe-se | Contato.

## 3. Wireframe textual da Home
```text
[Header fixo: logo AEIFI + menu + botão "Quero me associar"]

[Hero]
  H1: Fortalecemos quem empreende. Desenvolvemos nossa comunidade.
  Parágrafo institucional + selo "Associação de Foz do Iguaçu"
  Botões: [Conheça a AEIFI] [Quero me associar]

[Faixa de identidade]  Quem representamos: MEIs e pequenos negócios de Foz do Iguaçu

[O que fazemos]  5 cards: Representatividade | Capacitação | Conexões |
                 Oportunidades | Projetos e inovação  -> link /o-que-fazemos

[Nossa missão]  bloco de texto + link para /a-aeifi

[Nossas iniciativas]  3-4 cards de projetos + destaque BuscaMEI
                      (rótulo "Um produto da AEIFI") -> /buscamei

[Nosso impacto]  contadores com dados reais (placeholders até serem fornecidos)
                 + 1-2 depoimentos

[Notícias recentes]  3 cards -> /noticias

[Parceiros]  logos/lista + CTA "Seja parceiro"

[CTA final]  Faça parte da AEIFI -> /associe-se

[Rodapé institucional]  razão social, CNPJ, endereço, contatos, redes,
                        links institucionais, Transparência, Privacidade,
                        linha "BuscaMEI — um produto da AEIFI"
```

## 4. Estrutura de cada página
- **A AEIFI**: hero curto; história/trajetória; missão, visão, valores; objetivos; público atendido; ficha institucional (razão social, CNPJ, sede, fundação); diretoria; link para Transparência.
- **O que fazemos**: uma seção por área de atuação com descrição, como acontece na prática e exemplos ligados às iniciativas.
- **Iniciativas**: grade de iniciativas; cada card abre bloco/página com problema, objetivo, público, funcionamento, resultados, fotos, parceiros.
- **BuscaMEI**: por que a AEIFI criou; objetivo; como funciona (passo a passo); quem pode participar; benefícios para empreendedores; benefícios para a comunidade; relação com a missão; resultados; como acessar → só então o botão externo "Acessar o BuscaMEI".
- **Notícias**: lista de posts com data, categoria, imagem e texto; página de leitura por notícia.
- **Transparência**: ficha jurídica, estatuto, atas/diretoria, relatórios de atividades, prestação de contas, canal de contato para pedidos de informação.
- **Parceiros**: por que ser parceiro, formatos de parceria, parceiros atuais, formulário/canal específico.
- **Associe-se**: quem pode participar, por que se associar, benefícios, como funciona a associação, passo a passo, canais de atendimento, CTA.
- **Contato**: canais, endereço, horário, mapa/endereço textual, formulário simples.

## 5. Textos institucionais (base sugerida)
Serão redigidos textos originais em português para hero, missão, áreas de atuação, BuscaMEI e associe-se, seguindo os trechos indicados no briefing e sem inventar fatos. Todo dado factual ausente entra como `[INFORMAÇÃO A SER FORNECIDA PELA AEIFI]`.

## 6. Informações que precisamos da AEIFI
Razão social e CNPJ; endereço da sede; telefone/WhatsApp e e-mail; redes sociais; data de fundação e histórico; missão/visão/valores oficiais (se já existirem); composição da diretoria; estatuto e documentos em PDF; lista real de projetos e eventos com fotos; números reais (associados, capacitações, eventos, parceiros, MEIs no BuscaMEI); depoimentos autorizados; lista de parceiros e logos; logotipo em alta resolução e cores da marca.

## 7. Estratégia de apresentação do BuscaMEI
Sempre sob a marca AEIFI, com o rótulo "Um produto da AEIFI"; presente na home apenas como uma das iniciativas; página interna própria com conteúdo original e link externo apenas ao final; no rodapé como linha secundária. Nenhum link externo no hero ou no menu principal.

## 8. Recomendações Google Ad Grants
Missão visível na home e em /a-aeifi; conteúdo original e extenso em todas as páginas (sem páginas vazias); transparência pública; navegação simples e consistente; HTTPS; sem página cujo único objetivo seja redirecionar ao BuscaMEI; links externos em minoria e sempre contextualizados; conteúdo de notícias atualizado periodicamente.

## 9. Recomendações de SEO
Título único (<60 caracteres) e meta description (<160) por página; um H1 por página; termos locais trabalhados naturalmente (associação de empreendedores em Foz do Iguaçu, MEI, capacitação, pequenos negócios); HTML semântico; alt em todas as imagens; JSON-LD `Organization`/`NGO` no root e `Article` nas notícias; canonical relativo por página; sitemap.xml e robots.txt.

## 10. Desempenho e mobile
Layout mobile-first; imagens otimizadas com lazy loading; sem bibliotecas pesadas; tipografia e cores por tokens no design system; menu mobile acessível; botões e áreas de toque confortáveis; contraste adequado.

## Implementação técnica
Rotas em `src/routes/` (TanStack Router), com `head()` próprio em cada rota. Design system em `src/styles.css` com tokens oklch (paleta institucional: azul profundo + verde/âmbar de energia empreendedora), sem cores hardcoded nos componentes. Componentes compartilhados: `Header`, `Footer`, `SectionHeading`, `InitiativeCard`, `ImpactStat`, `Placeholder` (renderiza `[INFORMAÇÃO A SER FORNECIDA PELA AEIFI]` de forma discreta e destacável). Conteúdo em módulos de dados em `src/content/` para facilitar atualização. Imagens de apoio geradas quando não houver fotos próprias, marcadas como substituíveis.
