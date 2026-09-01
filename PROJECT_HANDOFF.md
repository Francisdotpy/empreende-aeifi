# Continuidade do projeto AEIFI

Atualizado em: 29 de agosto de 2026.

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
- A logo usada pelo header é `src/assets/logo-header.png`.
- A mesma imagem é usada como favicon em `src/routes/__root.tsx`.
- A imagem padrão do destaque inicial da home é `src/assets/foto-inicial.webp`, exibida na coluna direita ao lado do título principal.
- O painel possui o grupo “Página inicial”, com o campo de imagem `home.imagemPrincipal`; quando vazio, a home usa a imagem padrão do projeto.
- A página `/buscamei` não possui imagem estática.
- A página `/noticias` não possui imagem estática de abertura. Cada notícia usa a capa cadastrada no sistema administrável.

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
- O formulário contém Nome e CNPJ, ambos obrigatórios.
- Ao enviar, o navegador abre `https://wa.me/5545998462423` com uma mensagem de interesse já preenchida com os dados informados.
- O formulário não persiste os dados e não depende de serviço de e-mail nem de credenciais no servidor.

### Notícias administráveis

- O painel `/admin` possui a seção “Notícias” com cadastro, edição e exclusão de publicações.
- Os campos são Título, Subtítulo, Capa, Texto, Links das fontes, Data da notícia, Categoria e Status.
- Os links de fontes são opcionais, aceitam um endereço HTTP/HTTPS por linha e aparecem em “Fontes:” ao fim da notícia.
- O status pode ser `publicado` ou `rascunho`; somente notícias publicadas são visíveis ao público.
- A tabela `noticias` é a única fonte de gestão e publicação de notícias.
- As notícias fixas anteriores e os campos “Notícias (datas)” e “Notícias (fotos)” foram removidos do código e do painel.
- A rota `/noticias`, a rota `/noticias/$slug` e o bloco de notícias da home consomem exclusivamente as notícias publicadas desse sistema.
- Na página individual `/noticias/$slug`, a capa aparece acima da categoria, da data e do título; os cards de `/noticias` mantêm a composição própria.
- Chaves legadas `noticias.*` que já existam em `site_content` não são mais lidas nem exibidas; elas não foram apagadas do banco.
- A capa é obrigatória no cadastro e opcional na edição; uma nova capa substitui e remove a anterior.
- As capas aceitam JPG, JPEG, PNG e WEBP até 5 MB, com validação de extensão, MIME e assinatura binária no servidor.
- Os arquivos usam o bucket privado `arquivos`, no prefixo `noticias/capas/`, e são servidos por `/api/public/arquivo/`.

Banco de dados:

- Tabela: `noticias`.
- Migration: `supabase/migrations/20260829120000_create_noticias.sql`.
- Campos: `id`, `slug`, `titulo`, `subtitulo`, `capa_url`, `texto`, `fontes`, `data_noticia`, `categoria`, `status`, `created_at` e `updated_at`.
- RLS permite leitura pública somente de registros publicados e restringe todo o gerenciamento a administradores.
- Em 29/08/2026, `supabase db push` aplicou essa migration ao projeto remoto vinculado.

Arquivos principais desse fluxo:

- `src/components/admin/NoticiasAdmin.tsx`
- `src/lib/noticias.ts`
- `src/lib/uploads.functions.ts`
- `src/routes/noticias.index.tsx`
- `src/routes/noticias.$slug.tsx`
- `src/routes/admin.tsx`
- `src/integrations/supabase/types.ts`

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

## Editais de credenciamento

- A rota pública `/editais` exibe somente editais publicados, ordenados da data mais recente para a mais antiga.
- A composição usa cards institucionais responsivos: imagem, título, data de publicação e botão para abrir o PDF.
- O estado sem publicações informa que não há editais disponíveis.
- O header e o sitemap passaram a incluir a página de Editais.
- O painel `/admin` possui a seção “Editais” com cadastro, edição, exclusão, publicação/rascunho, preview de imagem e visualização do PDF.
- Na edição, imagem e PDF existentes são preservados quando nenhum arquivo novo é enviado.
- Uploads de imagens aceitam JPG, JPEG, PNG e WEBP até 5 MB; PDFs aceitam somente PDF até 10 MB.
- A validação ocorre também no servidor e confere extensão, MIME e assinatura binária.
- Os arquivos usam o bucket privado existente `arquivos`, nos prefixos `editais/images/` e `editais/pdfs/`.
- A existência do bucket `arquivos` deve ser confirmada em cada novo projeto Supabase; as migrations atuais aplicam políticas, mas não criam o bucket.

Banco de dados:

- Tabela: `downloads_editais`.
- Migration: `supabase/migrations/20260825120000_create_downloads_editais.sql`.
- Campos: `id`, `titulo`, `imagem_url`, `pdf_url`, `data_publicacao`, `status`, `created_at` e `updated_at`.
- Status válidos: `publicado` e `rascunho`.
- RLS permite leitura pública somente de registros publicados e restringe todo o gerenciamento a administradores.
- Em 25/08/2026, `supabase migration list` confirmou que todas as migrations locais, inclusive a de editais, estavam aplicadas no projeto remoto vinculado.

Arquivos principais desse fluxo:

- `src/routes/editais.tsx`
- `src/components/admin/EditaisAdmin.tsx`
- `src/lib/editais.ts`
- `src/lib/uploads.functions.ts`
- `src/routes/admin.tsx`
- `src/integrations/supabase/types.ts`

## Migração e configuração do Supabase

- O projeto foi trocado para um novo Supabase. A referência vigente deve ser consultada em `supabase/config.toml`; não copie IDs ou chaves para este documento.
- Uma auditoria no working tree em 25/08/2026 não encontrou referências ao projeto Supabase anterior.
- `.env`, `.env.*` e `supabase/.temp/` estão ignorados pelo Git; `.env.example` permanece permitido.
- A publishable key pode ser usada pelo cliente, mas a secret key deve existir somente como `SUPABASE_SERVICE_ROLE_KEY`, sem prefixo `VITE_`.
- Para desenvolvimento local, mantenha a secret key em `.env` ou `.env.local`, ambos não versionados.
- O upload administrativo depende de `SUPABASE_SERVICE_ROLE_KEY`: sem ela, `claimAdmin()` não consegue atribuir o papel e o painel termina exibindo “Sem permissão para enviar arquivos”.
- O usuário autorizado inicialmente é `aeififoz@gmail.com`, cadastrado em `admin_allowlist` pela migration base. Depois de configurar a secret key, saia e entre novamente no `/admin` para que `user_roles` receba o papel `admin`.
- O servidor local que estava na porta `8080` foi encerrado ao final da auditoria de 25/08/2026.

## Incidente de chave no Git

- Uma secret key do Supabase foi adicionada por engano à `.env` no commit local `6df74b6`.
- O GitHub Push Protection bloqueou o envio; esse commit nunca foi publicado.
- O commit local foi recriado sem `.env` e sem `supabase/.temp/`, resultando no commit sanitizado `9a3c3e6`.
- O push de `main` para `origin/main` foi concluído com sucesso após a sanitização.
- A chave que apareceu no commit bloqueado deve ser considerada exposta, revogada no Supabase e substituída localmente e nos ambientes de deploy.
- Nunca use o link de desbloqueio do GitHub para permitir o envio de uma chave real.

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
8. Nunca volte a versionar `.env`, `.env.local` ou `supabase/.temp/`.
9. Ao trocar de projeto Supabase, reinicie o Vite e limpe a sessão de Auth do projeto anterior no navegador.
10. Antes de diagnosticar permissões de upload, confirme: secret key no servidor, usuário na `admin_allowlist`, papel em `user_roles` e bucket `arquivos` existente.
