# Conexão MEI — uso e ativação

## O que já está implementado

- A página `/conexaomei` apresenta a página pública completa do Conexão MEI 2027, adaptada do arquivo `conexao_mei_2027_integrado_v67.html` fornecido pela AEIFI: apresentação, caravana, etapas, eixos, expositores, parceiros e formulário de manifestação de interesse.
- O formulário dessa página substitui o envio externo do protótipo pelo fluxo próprio do servidor descrito abaixo. A página não incorpora a senha fixa nem o painel administrativo embutido no HTML original.
- O painel `/admin` possui uma aba exclusiva **Conexão MEI 2027**. Ela reúne visão geral, etapas, inscritos/presença/relatórios, documentos, parceiros, expositores, comunicação e configurações.
- O destinatário inicial é `aeififoz@gmail.com`.
- O servidor valida os campos, registra a manifestação no Supabase e envia um e-mail pelo Resend com todos os dados. O e-mail preenchido pela pessoa é usado como `Reply-To`.
- Os dados do destinatário e das manifestações ficam em tabelas privadas; a credencial do Resend fica somente no servidor.
- Enquanto o envio não estiver configurado, o botão da página fica desabilitado e nenhum dado é recebido.
- As seis etapas, local, endereço, programação, situação das inscrições e certificados são lidos do Supabase. A tela de cada etapa pode ser compartilhada como `/conexaomei?etapa=missal` (trocando o slug da cidade).
- Inscrição, recuperação de etiqueta e consulta de certificado usam CPF, validação no servidor e limites de tentativas. A etiqueta tem QR com link direto `https://wa.me/` para o WhatsApp informado pela pessoa. O CPF não aparece no QR; o número de telefone aparece no link lido pela câmera e pode ser visto por quem tiver acesso à etiqueta. O certificado só é emitido após presença confirmada e liberação da etapa.

## Como usar depois da ativação

1. Acesse `/admin` com a conta administrativa e abra a aba **Conexão MEI 2027**.
2. Em **Etapas**, selecione a cidade, preencha local, endereço e programação e salve. O conteúdo aparece na página pública sem novo deploy. Só marque **Inscrições abertas** quando o backend estiver ativado e testado.
3. Em **Configurações**, edite os dados do encontro regional, WhatsApp, assinantes e visibilidade das áreas. Em **Documentos**, **Parceiros** e **Expositores**, cadastre e publique os itens confirmados.
4. Em **Inscritos e presença**, confirme a presença após o evento, imprima etiquetas/certificados autorizados e gere relatórios PDF ou Excel.
5. Em **Comunicação**, confira o destinatário. Para alterá-lo, digite o novo e-mail e clique em **Salvar destinatário**. Essa alteração não precisa de novo deploy.
6. Compartilhe o endereço `/conexaomei`. A pessoa informa nome, telefone, e-mail e forma de participação; empresa, cidade e mensagem são opcionais. Em seguida, clica em **Enviar manifestação de interesse**.
7. A equipe recebe em `aeififoz@gmail.com` (ou no destinatário configurado) o aviso com todos os campos. Ao responder ao aviso, a resposta é endereçada ao e-mail informado pela pessoa.
8. O painel mostra as últimas 50 manifestações e o status `enviado` ou `falhou`. `enviado` significa que o Resend aceitou o e-mail; a entrega final deve ser conferida na caixa de entrada e nos registros do Resend.

## Segunda etapa: ativar o envio

Esta etapa depende de acesso à conta Resend, ao DNS do domínio e às configurações do ambiente de produção. Nenhum domínio, chave ou registro DNS foi configurado nesta implementação.

1. As migrations `20261003120000_create_conexao_mei.sql`, `20261004120000_expand_conexao_mei.sql` e `20261004121000_conexao_mei_rate_limit.sql` já aparecem no histórico remoto do Supabase (conferido em 05/10/2026). O usuário confirmou o bucket privado `arquivos` e o acesso ao admin. Conferir as seis etapas e manter inscrições fechadas até o teste completo.
2. Na conta Resend, adicionar o domínio que a AEIFI já possui. Inserir no DNS os registros de autenticação que o Resend mostrar e aguardar o status de domínio verificado. Não é necessário criar uma caixa postal no endereço de remetente para este fluxo.
3. Gerar uma chave de API do Resend e configurar no ambiente de produção, sem adicioná-la ao Git:

   - `RESEND_API_KEY`: chave privada do Resend.
   - `CONEXAO_MEI_FROM_EMAIL`: remetente do domínio verificado, por exemplo `Conexão MEI <conexao@seudominio.com.br>`.

4. Gerar 32 bytes aleatórios em base64 para `CONEXAO_MEI_CPF_KEY`, exclusiva do servidor. Ela protege o índice de busca e o CPF usado nos relatórios. Guardar cópia segura: perder ou trocar esta chave sem migração impede localizar/decifrar inscrições existentes. Nunca usar prefixo `VITE_`.

5. Fazer um novo deploy após configurar as variáveis. Testar com uma manifestação real e conferir o recebimento em `aeififoz@gmail.com`, o `Reply-To`, o registro no painel e o status no Resend. Testar também inscrição numa etapa, recuperação por CPF em outro dispositivo, etiqueta impressa, presença e certificado.

A manifestação exige `RESEND_API_KEY`, `CONEXAO_MEI_FROM_EMAIL` e `SUPABASE_SERVICE_ROLE_KEY`. Inscrição, recuperação de etiqueta e consulta de certificado exigem `CONEXAO_MEI_CPF_KEY` e `SUPABASE_SERVICE_ROLE_KEY`. Sem esses requisitos, os respectivos formulários continuam indisponíveis. Nenhum fluxo do Conexão MEI exige chaves de Turnstile.

## Diferenças de segurança em relação ao protótipo

O HTML original guarda tudo apenas no navegador e usa senha fixa. A implementação atual usa o login administrativo existente, RLS e funções no servidor. A consulta apenas por CPF foi uma escolha explícita; ela não comprova identidade. Os limites de tentativa no servidor reduzem abuso, mas não substituem a verificação de identidade: qualquer pessoa que conheça um CPF válido ainda pode obter a etiqueta ou certificado liberado. Sem o desafio contra robôs, há maior risco de consultas automatizadas e envio excessivo de manifestações; monitorar os registros e revisar os limites antes da abertura pública. O QR contém diretamente o link do WhatsApp, portanto revela o telefone a qualquer pessoa que possa escanear a etiqueta. Ele não contém CPF. O consentimento da inscrição informa esse uso. Etiquetas já emitidas com o QR antigo continuam mostrando apenas o código da inscrição; é preciso reimprimi-las para usar o link direto. Antes da ativação pública, revisar a política de privacidade e executar testes completos com dados fictícios.

O HTML original admite vários e-mails destinatários; esta implementação mantém **um único destinatário** porque a ampliação do envio de dados pessoais exige autorização específica.

## Manutenção

- Não usar `site_content` para o destinatário: essa tabela possui leitura pública.
- Nunca colocar `RESEND_API_KEY`, `CONEXAO_MEI_CPF_KEY` ou `SUPABASE_SERVICE_ROLE_KEY` em variáveis com prefixo `VITE_`.
- O registro no banco preserva a manifestação mesmo se o envio de e-mail falhar. O status `falhou` pede investigação no Resend e eventual contato manual com a pessoa; esta versão não faz reenvio automático.
