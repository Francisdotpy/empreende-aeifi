# Checklist de correção de responsividade

Atualizado em: 30 de agosto de 2026.

## Objetivo

Este checklist consolida a auditoria de responsividade do projeto AEIFI e substitui o plano
descritivo anterior por uma lista executável de verificação.

O trabalho deve preservar:

- [ ] Arquitetura React, TanStack Start, Tailwind CSS 4 e Supabase.
- [ ] Dados dinâmicos administrados pelo Supabase.
- [ ] Identidade visual azul e dourada existente.
- [ ] Fluxos atuais de notícias, editais, associação e administração.
- [ ] Deploy SSR com Nitro e Vercel.
- [ ] Tokens de cores, bordas, raios e sombras de `src/styles.css`.
- [ ] Ausência de artefatos de build versionados.

## Estado da auditoria de código

Auditoria feita sem alterar código-fonte. O único arquivo alterado nesta etapa é este checklist.

Legenda:

- `[x]` confirmado por leitura do código.
- `[ ]` ainda pendente de implementação ou validação.
- `Validar` significa que o código sugere a correção, mas falta teste visual/manual nas viewports.

## Viewports obrigatórias

- [ ] 360 x 640 px.
- [ ] 390 x 844 px.
- [ ] 428 x 926 px.
- [ ] 640 x 360 px, celular em orientação horizontal.
- [ ] 768 x 1024 px.
- [ ] 1024 x 768 px.
- [ ] 1280 x 800 px.
- [ ] 1440 x 900 px.
- [ ] 1536 px ou mais.
- [ ] Telas com pouca altura.
- [ ] Texto ampliado para 200%.
- [ ] Teclado virtual aberto em formulários.

## P0 - Segurança de uso

### Controles fixos no administrador

Arquivos:

- `src/routes/__root.tsx`
- `src/content/inline-edit.tsx`
- `src/components/site/WhatsAppFloatingButton.tsx`
- `src/routes/admin.tsx`

Checklist:

- [x] Detectar rota `/admin` no shell global.
- [x] Não renderizar WhatsApp flutuante dentro de `/admin`.
- [x] Não renderizar editor inline dentro de `/admin`.
- [x] Manter a barra "Salvar e publicar" como único controle inferior persistente no admin.
- [x] Usar `bottom-[max(...,env(safe-area-inset-bottom))]` na barra de publicação.
- [x] Definir z-index explícito na barra do admin.
- [ ] Validar que "Salvar e publicar" fica visível e clicável em 360 px.
- [ ] Validar que mensagens de status não ficam cobertas.
- [ ] Validar páginas públicas com WhatsApp e editor inline conforme permissões.

### Menu móvel em telas baixas

Arquivo:

- `src/components/site/Header.tsx`

Checklist:

- [x] Aplicar `max-h-[calc(100dvh-4.5rem)]` ao menu móvel.
- [x] Aplicar `overflow-y-auto`.
- [x] Aplicar `overscroll-contain`.
- [x] Considerar safe area no padding inferior.
- [x] Fechar menu ao clicar em link.
- [x] Fechar menu com `Escape`.
- [x] Bloquear rolagem do body enquanto o menu está aberto.
- [x] Mover foco para o primeiro link ao abrir.
- [x] Devolver foco ao botão ao fechar com `Escape`.
- [ ] Validar que todos os itens são alcançáveis em 640 x 360 px.
- [ ] Validar foco por teclado no menu aberto e fechado.

## P1 - Alto impacto

### WhatsApp flutuante

Arquivo:

- `src/components/site/WhatsAppFloatingButton.tsx`

Checklist:

- [x] Limitar altura do painel com `100dvh`.
- [x] Aplicar rolagem interna ao painel.
- [x] Aplicar `overscroll-contain`.
- [x] Restringir largura com `min(22rem, calc(100vw - 2rem))`.
- [x] Usar `min-w-0`, `max-w-full` e truncamento nos itens.
- [x] Manter botão principal visível fora da área rolável.
- [ ] Validar com nenhum contato.
- [ ] Validar com 1 contato.
- [ ] Validar com 5 contatos.
- [ ] Validar com 15 contatos.
- [ ] Validar nomes e funções longos.
- [ ] Validar viewport baixa.

### Inputs e selects no mobile

Arquivos:

- `src/components/site/form-styles.ts`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/select.tsx`
- `src/routes/associe-se.tsx`
- `src/routes/admin.tsx`
- `src/components/admin/NoticiasAdmin.tsx`
- `src/components/admin/EditaisAdmin.tsx`

Checklist:

- [x] Centralizar padrão em `formControlClassName`.
- [x] Usar `min-h-11`.
- [x] Usar `text-base` no layout base.
- [x] Reduzir para `md:text-sm` somente em telas maiores.
- [x] Aplicar `w-full min-w-0 max-w-full`.
- [x] Aplicar padrão em associação.
- [x] Aplicar padrão no login e campos gerais do admin.
- [x] Aplicar padrão em notícias.
- [x] Aplicar padrão em editais.
- [x] Atualizar componentes genéricos `Input`, `Textarea` e `Select`.
- [ ] Validar Safari/iOS sem zoom ao focar inputs.
- [ ] Validar teclado virtual aberto.

### Uploads

Arquivos:

- `src/routes/admin.tsx`
- `src/components/admin/NoticiasAdmin.tsx`
- `src/components/admin/EditaisAdmin.tsx`

Checklist:

- [x] Usar classe compartilhada com `w-full min-w-0 max-w-full` no upload genérico.
- [x] Aplicar o mesmo padrão nos uploads de notícias.
- [x] Aplicar o mesmo padrão nos uploads de editais.
- [ ] Validar nome de arquivo longo em 360 px.
- [ ] Validar ausência de overflow horizontal.
- [ ] Validar acessibilidade por teclado.

### Ações administrativas

Arquivos:

- `src/routes/admin.tsx`
- `src/content/inline-edit.tsx`
- `src/components/admin/NoticiasAdmin.tsx`
- `src/components/admin/EditaisAdmin.tsx`

Checklist:

- [x] Usar `min-h-11` nas ações textuais do admin.
- [x] Usar `size-11` nos botões de fechar formulários.
- [x] Ampliar botão do editor inline.
- [x] Permitir wrap/empilhamento das ações em telas estreitas.
- [ ] Validar "Editar", "Ver", "PDF" e "Excluir" em 360 px.
- [ ] Validar texto de loading, como "Excluindo...", sem overflow.
- [ ] Validar separação visual de ações destrutivas.

### Conteúdo dinâmico sem overflow

Arquivos:

- `src/components/site/Footer.tsx`
- `src/components/site/ui.tsx`
- `src/routes/noticias.index.tsx`
- `src/routes/noticias.$slug.tsx`
- `src/routes/editais.tsx`
- `src/routes/index.tsx`

Checklist:

- [x] Aplicar `min-w-0 break-words` aos valores do footer.
- [x] Aplicar `[overflow-wrap:anywhere]` a dados vulneráveis como e-mail/categoria.
- [x] Proteger títulos públicos com `break-words`.
- [x] Preservar `break-all` nos links de fontes.
- [x] Proteger títulos de editais.
- [ ] Validar strings sem espaços com 100+ caracteres.
- [ ] Validar URLs longas.
- [ ] Validar e-mail longo no footer.

## P2 - Médio impacto e estrutura

### Listagens administrativas entre 640 e 767 px

Arquivos:

- `src/components/admin/NoticiasAdmin.tsx`
- `src/components/admin/EditaisAdmin.tsx`

Checklist:

- [x] Manter layout empilhado no base.
- [x] Usar duas colunas em `sm`: imagem e conteúdo.
- [x] Colocar ações em linha inferior com `sm:col-span-2`.
- [x] Usar três colunas somente em `lg`.
- [x] Usar `min-w-0` e `break-words` no conteúdo.
- [x] Fazer ações ocuparem largura flexível em 360 px.
- [ ] Validar títulos longos em 640 px.
- [ ] Validar títulos longos em 768 px.
- [ ] Validar estado com e sem botão "Ver".

### Links públicos importantes

Arquivos:

- `src/components/site/Header.tsx`
- `src/components/site/Footer.tsx`
- `src/components/site/ui.tsx`
- `src/routes/__root.tsx`
- `src/routes/noticias.index.tsx`
- `src/routes/noticias.$slug.tsx`
- `src/routes/editais.tsx`
- `src/routes/index.tsx`

Checklist:

- [x] Aplicar `min-h-11` ao CTA do header.
- [x] Aplicar `min-h-11` aos links do footer.
- [x] Aplicar `min-h-11` a links de arquivo.
- [x] Aplicar `min-h-11` a ações de erro global.
- [x] Aplicar `min-h-11` a voltar/ler notícia/editais.
- [ ] Revisar `CtaLink` e `ExternalCta`: hoje têm `py-3`, mas sem `min-h-11` explícito.
- [ ] Validar toque no header entre 640 e 1279 px.

### Imagem principal da home em tablets

Arquivo:

- `src/routes/index.tsx`

Checklist:

- [x] Usar proporção `16/10` antes de `lg`.
- [x] Restaurar `4/5` em `lg`.
- [x] Aplicar `md:max-h-[28rem]`.
- [x] Definir `object-center`.
- [ ] Validar 768 x 1024 px.
- [ ] Validar 1024 x 768 px.
- [ ] Validar imagem padrão e imagem enviada pelo painel.

### Imagens responsivas

Arquivos:

- `src/lib/responsive-images.ts`
- `src/routes/api/public/arquivo.$.tsx`
- `src/routes/index.tsx`
- `src/routes/noticias.index.tsx`
- `src/routes/noticias.$slug.tsx`
- `src/routes/editais.tsx`
- `src/components/site/ui.tsx`
- `src/components/admin/NoticiasAdmin.tsx`
- `src/components/admin/EditaisAdmin.tsx`

Checklist:

- [x] Criar helper `responsiveImageProps`.
- [x] Emitir `srcSet` para imagens servidas por `/api/public/arquivo/`.
- [x] Usar larguras 480, 768, 1024 e 1440 px.
- [x] Usar `sizes` por contexto de grid/layout.
- [x] Implementar transformação por `width` na rota pública de arquivo.
- [x] Manter fallback para original quando transformação falhar.
- [x] Manter `loading="lazy"` em imagens fora da dobra.
- [x] Evitar lazy loading na provável imagem LCP da home.
- [ ] Validar suporte real do plano Supabase a transforms.
- [ ] Validar payload baixado no mobile.
- [ ] Validar qualidade em telas de alta densidade.
- [ ] Validar capas antigas.

## P3 - Refinamento e prevenção

### Espaçamentos mobile

Arquivos:

- `src/styles.css`
- `src/components/site/ui.tsx`
- `src/components/site/Footer.tsx`

Checklist:

- [x] Reduzir `section-y` no mobile para `3.5rem`.
- [x] Restaurar `4.5rem` a partir de `md`.
- [x] Usar `p-4` no `Card` base.
- [x] Restaurar `p-6` em `sm`.
- [x] Reduzir padding do footer no mobile.
- [ ] Validar densidade visual em 360 px.
- [ ] Validar que desktop preserva ritmo atual.

### Headings e tipografia dinâmica

Arquivos:

- `src/components/site/ui.tsx`
- `src/routes/index.tsx`
- `src/routes/noticias.$slug.tsx`
- `src/routes/iniciativas.tsx`

Checklist:

- [x] Usar `clamp()` em h1/h2 compartilhados.
- [x] Manter tamanhos maiores em `md` e acima.
- [x] Aplicar `break-words` a headings dinâmicos principais.
- [ ] Validar títulos com 180 caracteres.
- [ ] Validar hierarquia entre h1, h2 e texto de apoio.

### Componentes genéricos

Arquivos:

- `src/components/ui/dialog.tsx`
- `src/components/ui/alert-dialog.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/drawer.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/table.tsx`

Checklist:

- [x] Dialog com `max-h` baseado em `100dvh`.
- [x] Dialog com rolagem interna.
- [x] Dialog com botão de fechar `size-11`.
- [x] AlertDialog com `max-h` baseado em `100dvh`.
- [x] AlertDialog com rolagem interna.
- [x] Sheet com rolagem interna e safe area inferior.
- [x] Sheet com botão de fechar `size-11`.
- [x] Drawer com `max-h` baseado em `100dvh`.
- [x] Drawer com rolagem interna e safe area inferior.
- [x] Button default, `sm`, `lg` e `icon` com pelo menos 44 px de altura.
- [x] Table com wrapper `overflow-auto`.
- [ ] Definir estratégia futura para tabelas extensas: scroll horizontal, colunas por breakpoint ou cards.
- [ ] Validar dialogs/sheets/drawers com conteúdo longo.

## Verificação visual/manual

### Header

- [ ] Menu fechado em todas as viewports.
- [ ] Menu aberto em todas as viewports.
- [ ] Rolagem até o último item no menu mobile.
- [ ] Clique em link fecha o menu.
- [ ] Escape fecha o menu.
- [ ] Foco inicial no primeiro link.
- [ ] Foco retorna ao botão após Escape.
- [ ] Texto ampliado para 200%.

### WhatsApp

- [ ] Sem contatos: não exibir exemplos fixos indesejados.
- [ ] Um contato.
- [ ] Cinco contatos.
- [ ] Quinze contatos.
- [ ] Nomes e funções longos.
- [ ] Painel aberto em viewport baixa.
- [ ] Ausente em `/admin`.
- [ ] Presente nas páginas públicas quando houver contatos.

### Associação

- [ ] Nome vazio.
- [ ] CNPJ vazio.
- [ ] Valores válidos.
- [ ] Teclado virtual aberto.
- [ ] Safari/iOS sem zoom automático.
- [ ] Link do WhatsApp gerado corretamente.

### Admin

- [ ] Login.
- [ ] Edição dos campos gerais.
- [ ] Barra de publicação em 360 px.
- [ ] Editor inline ausente em `/admin`.
- [ ] WhatsApp flutuante ausente em `/admin`.
- [ ] Cadastro e edição de notícia.
- [ ] Cadastro e edição de edital.
- [ ] Upload com nome de arquivo longo.
- [ ] Listas vazias.
- [ ] Listas extensas.
- [ ] Mensagens de erro, sucesso e carregamento.

### Notícias

- [ ] Estado sem notícias.
- [ ] Um card.
- [ ] Vários cards.
- [ ] Título curto.
- [ ] Título de 180 caracteres.
- [ ] Categoria longa.
- [ ] Notícia com texto extenso.
- [ ] Fontes com URLs longas.
- [ ] Capa horizontal.
- [ ] Capa vertical.
- [ ] Capa quadrada.

### Editais

- [ ] Estado vazio.
- [ ] Grid em todos os breakpoints.
- [ ] Título longo.
- [ ] Imagem horizontal.
- [ ] Imagem vertical.
- [ ] Imagem quadrada.
- [ ] Abertura do PDF.
- [ ] Três ações administrativas visíveis.

### Conteúdo geral

- [ ] E-mail longo no footer.
- [ ] URL longa.
- [ ] CNPJ, telefone e endereço preenchidos.
- [ ] Fontes e imagens ausentes.
- [ ] Escala de fonte do sistema aumentada.

## Verificações técnicas obrigatórias

Executar depois de qualquer correção de código:

```powershell
npx.cmd tsc --noEmit
npm.cmd run build
```

Também verificar:

- [ ] Nenhuma rolagem horizontal involuntária nas larguras de referência.
- [ ] Foco visível e navegação por teclado.
- [ ] Orientação horizontal.
- [ ] Teclado virtual aberto.
- [ ] `/admin` autenticado.
- [ ] Rotas públicas sem autenticação.
- [ ] Dados do Supabase preservados e sem valores fixos reintroduzidos.
- [ ] `.output`, `.vercel`, `.wrangler` e outros artefatos não versionados.

## Pendências reais após auditoria de código

- [ ] Rodar validação visual/manual nas viewports obrigatórias.
- [ ] Confirmar Safari/iOS sem zoom em campos de formulário.
- [ ] Confirmar ausência de overflow horizontal com conteúdos extremos.
- [ ] Confirmar funcionamento real das transforms de imagem do Supabase em produção/deploy.
- [ ] Considerar adicionar `min-h-11` explícito a `CtaLink` e `ExternalCta`.
- [ ] Decidir estratégia futura para tabelas extensas no mobile.
- [ ] Executar `npx.cmd tsc --noEmit` e `npm.cmd run build` após mudanças de código.

## Definição de conclusão

- [ ] Nenhuma página apresenta rolagem horizontal involuntária em 360, 390, 428, 768, 1024 e 1440 px.
- [ ] Menu, WhatsApp e painel administrativo permanecem utilizáveis em telas baixas.
- [ ] Controles principais têm área de toque mínima próxima de 44 x 44 px.
- [ ] Inputs mobile usam fonte legível sem provocar zoom automático.
- [ ] Textos e arquivos administráveis não ampliam seus containers.
- [ ] Listagens administrativas mantêm conteúdo e ações legíveis.
- [ ] Imagens carregam versões adequadas à largura quando suportado pelo pipeline.
- [ ] TypeScript e build terminam sem erro.
- [ ] Fluxos dinâmicos do Supabase permanecem funcionando.
- [ ] Validação visual é aprovada nas viewports e estados deste checklist.
