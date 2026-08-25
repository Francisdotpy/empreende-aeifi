# Continuidade do projeto AEIFI

Atualizado em: 24 de agosto de 2026.

Este documento registra o estado técnico do projeto e as decisões tomadas nas últimas alterações. Leia este arquivo antes de modificar a aplicação.

## Estado atual

- Stack: React 19, TypeScript, Vite 8, TanStack Router/Start, Nitro, Tailwind CSS 4 e Supabase.
- Branch principal: `main`.
- Repositório remoto: `https://github.com/Francisdotpy/empreende-aeifi.git`.
- O frontend possui renderização pelo servidor; não deve ser tratado como um Vite puramente estático.
- A aplicação mantém a identidade visual azul/dourada da AEIFI.
- Não reescreva o histórico publicado com `force push`, rebase, amend ou squash.

## Alterações funcionais realizadas

### Header e imagens institucionais

- O header exibe somente a logo, sem os textos “AEIFI” ou o nome completo ao lado dela.
- A logo usada pelo header é `src/assets/logo-header.jpeg`.
- A mesma imagem é usada como favicon em `src/routes/__root.tsx`.
- A imagem principal da home é `src/assets/hero-aeifi.jpg`.
- A página `/buscamei` não possui imagem estática.
- A página `/noticias` não possui imagem estática de abertura. Fotos individuais de notícias ainda podem ser exibidas de forma condicional quando cadastradas no painel, pelas chaves `noticias.{indice}.foto`.

### Footer e conteúdo administrativo

- O footer consome os dados carregados por `useSite()`/Supabase e não possui uma segunda fonte de dados independente.
- Os campos administrativos usados são:
  - `org.razaoSocial`
  - `org.cnpj`
  - `org.sede`
  - `org.telefone`
  - `org.email`
- Valores vazios ou marcados como pendentes não devem produzir `undefined`, `null` ou linhas vazias no footer.
- O LinkedIn foi removido. As redes configuráveis que permanecem são Instagram e Facebook.

### Solicitação de associação

- A chamada principal do header é “Quero me associar” e aponta para `/associe-se`.
- O botão redundante “Associe-se” foi removido.
- O formulário contém Nome, CNPJ e Telefone/WhatsApp, todos obrigatórios.
- Há estado de carregamento, bloqueio de envio duplicado, sucesso e erro.
- O envio é realizado no servidor por `src/lib/association.functions.ts`, usando a API da Resend.
- Destinatário fixado pela regra de negócio: `aeififoz@gmail.com`.
- Assunto: `Nova solicitação de associação`.
- Nenhuma credencial de e-mail é exposta no frontend.

Variáveis necessárias para o envio:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

### WhatsApp flutuante

- Não existem contatos iniciais ou contatos fixos no componente.
- O botão mostra exclusivamente os contatos cadastrados no painel administrativo.
- A seção “WhatsApp flutuante” do painel possui os campos Nome, Função e Número, além do botão “Adicionar”.
- Adicionar ou remover um contato persiste imediatamente no Supabase e invalida a consulta `site_content`, atualizando o componente flutuante.
- Números duplicados são bloqueados.
- O número é normalizado para somente dígitos e deve ter entre 10 e 15 dígitos, incluindo o código internacional.
- Os links usam `https://wa.me/NUMERO`.
- Quando não há contatos, nenhum exemplo é mostrado.

Fonte de dados:

- Tabela: `site_content`.
- Chave: `whatsapp.contatos`.
- Valor: JSON no formato abaixo.

```json
[
  {
    "nome": "Nome do contato",
    "funcao": "Função",
    "numero": "5545999999999"
  }
]
```

Arquivos principais desse fluxo:

- `src/routes/admin.tsx`
- `src/components/site/WhatsAppFloatingButton.tsx`
- `src/content/useSite.ts`

### Revisão visual

- O fundo global passou a usar off-white, reservando branco para cards e superfícies.
- Cards usam bordas discretas, cantos arredondados e sombras sutis.
- Os níveis de sombra estão centralizados em `src/styles.css`:
  - `--shadow-sm`
  - `--shadow-md`
  - `--shadow-lg`
  - `--shadow-xl`
  - `--shadow-card`
  - `--shadow-lift`
- Inputs, botões, menus, tabelas e modais reutilizam os tokens do tema.
- Preserve esse sistema; não crie um segundo conjunto paralelo de estilos.

## Deploy na Vercel

O erro anterior era:

```text
No Output Directory named "dist" found after the Build completed
```

A causa era a Vercel esperando uma saída Vite estática (`dist`) enquanto o projeto gera uma aplicação Nitro SSR.

Correção aplicada:

- `vercel.json` define `framework` como `nitro`, usa `npm run build` e limpa a antiga expectativa de diretório estático com `outputDirectory: null`.
- `vite.config.ts` usa o preset `vercel` quando `process.env["VERCEL"]` está presente.
- Fora da Vercel, o build continua usando `cloudflare-module`.
- O build da Vercel gera `.vercel/output` no padrão Build Output API v3.
- `.vercel/` é artefato gerado e está no `.gitignore`; nunca deve ser commitido.
- `.output/` e `.wrangler/` também são saídas locais ignoradas.

Variáveis Supabase usadas pela aplicação, conforme o ambiente:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` para operações exclusivamente do servidor
- `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` quando exigidas no cliente/build

Nunca registre valores dessas variáveis neste arquivo ou no repositório.

## Git e histórico recente

- O README foi editado diretamente no GitHub, criando o commit remoto `a66c252`.
- As alterações locais estavam no commit `16cabb3`.
- Os dois ramos foram integrados por merge normal no commit `07137d7`, sem rebase e sem force push.
- O commit `38bf9c0` retirou `.vercel/output` do versionamento e adicionou `.vercel/` ao `.gitignore`.
- Após esse processo, `main` e `origin/main` estavam sincronizadas.
- Arquivos gerados chegaram a existir em um commit local anterior, mas foram removidos do estado atual sem reescrever o histórico.

## Lovable e autoria antiga

- Referências de código/configuração da Lovable e referências textuais a `rennanlucas` foram removidas do estado atual do projeto.
- Uma busca no working tree não encontrou referências restantes.
- Nomes de autores em commits antigos são metadados do Git. Removê-los exigiria reescrever o histórico publicado, o que não deve ser feito neste projeto.

## Validação já realizada

As últimas alterações foram verificadas com:

```powershell
npx.cmd tsc --noEmit
npm.cmd run build
```

Também foi testado o build com `VERCEL=1`, confirmando:

- `.vercel/output/config.json` com Build Output API versão 3;
- função SSR em `.vercel/output/functions/__server.func`;
- arquivos públicos em `.vercel/output/static`.

O build Cloudflare padrão também continuou funcionando.

Avisos conhecidos que não impediram o build:

- `vite-tsconfig-paths` é apontado como redundante pelo Vite atual;
- `inputValidator()` em `src/lib/uploads.functions.ts` está depreciado e pode ser migrado para `validator()`;
- existe aviso de chunk principal maior que 500 kB.

## Cuidados para próximas alterações

1. Antes de editar, execute `git status` e `git fetch` para verificar divergências com o GitHub.
2. Se o README ou outro arquivo tiver sido editado no GitHub, integre com merge normal.
3. Não execute mensagens de erro como `[rejected] main -> main`; elas não são comandos PowerShell.
4. Não volte a configurar a Vercel para procurar `dist`.
5. Não versione `.vercel/output`, `.output`, `.wrangler` ou outros artefatos de build.
6. Preserve os fluxos dinâmicos do painel; não reintroduza contatos de WhatsApp ou dados do footer fixos no frontend.
7. Rode TypeScript e build antes de finalizar mudanças.
