# Guapi A&B — Publicar o app GRÁTIS com banco de dados compartilhado

Pacote com 4 arquivos: `app.html` (o app v2.0), `server.js` (banco compartilhado), `Dockerfile`, `data.json`.

Resultado: um endereço único (link) que todo mundo abre no celular/navegador, todos
entrando com seu perfil (Gerente / Validação e Auditoria / Diretoria / Colaborador)
e TODOS vendo a MESMA base de dados, atualizada em tempo real.

---

## OPÇÃO RECOMENDADA — Hugging Face Spaces (100% grátis, sem cartão, ~10 min)

### Passo a passo
1. **Criar conta** em https://huggingface.co/join (grátis; só e-mail).
2. **Novo Space**: clique no seu avatar (canto sup. direito) → **New Space**.
   - Space name: `guapi-ab-qualidade`
   - SDK: escolha **Docker** (blank template)
   - Visibilidade: **Private** (só quem tem o link + login vê; pode deixar Public se quiser link livre pra equipe)
   - Clique **Create Space**.
3. **Subir os 4 arquivos** deste pacote: na aba **Files** do Space, clique
   **Add file → Upload files** e arraste `app.html`, `server.js`, `Dockerfile`, `data.json`.
   - **NÃO envie o `publicar-guapi-ab.zip`** (é só o pacote de transporte).
   - Clique **Commit changes** — o Space vai construir (build) sozinho, 2–4 min.
4. **Pronto.** O app fica no ar em:
   `https://SEU-USUARIO-guapi-ab-qualidade.hf.space`
   (o link exato aparece na aba **App** do Space)
5. **Teste**: abra no celular, escolha o perfil e use. Abra em outro aparelho —
   os dados são os mesmos. Cada alteração é salva no servidor automaticamente.

### No celular (app instalável — PWA)
- iPhone: Safari → compartilhar → **Adicionar à Tela de Início**.
- Android: Chrome → menu ⋮ → **Instalar aplicativo**.

---

## OPÇÃO B — Railway (também grátis, sem cartão no plano trial)

1. Acesse https://railway.app → entrar com Google.
2. **New Project → Deploy from GitHub repo** — para isso, primeiro suba os 4 arquivos
   a um repositório seu no GitHub (github.com → New repository → upload dos arquivos).
3. No serviço criado: **Settings → Start Command**: `node server.js`
4. **Settings → Networking → Generate Domain** → copie o link gerado.
5. Dica: adicione um **Volume** montado em `/app` para o `data.json` sobreviver a reinícios.

---

## OPÇÃO C — Render (grátis, serviço dorme após 15 min de inatividade)

1. https://render.com → entrar → **New → Web Service** → conecte o repositório do GitHub (mesmos 4 arquivos).
2. Runtime: **Docker** (ele lê o Dockerfile sozinho) — ou Node com Start Command `node server.js`.
3. **Create Web Service** → link em `algo.onrender.com`.
   - No plano free o serviço "acorda" ao abrir o link (leva ~30 s no 1º acesso do dia).

---

## Como funciona o compartilhamento (sem mistério)
- O `server.js` guarda tudo num arquivo `data.json` no servidor.
- O app, ao abrir num endereço publicado, **carrega a base do servidor** e **envia cada alteração**.
- Quem estiver offline continua usando normalmente; ao voltar, a próxima alteração sincroniza.
- O `data.json` enviado neste pacote está vazio de propósito: no 1º acesso o app cria a
  carga inicial (PDVs, quadro funcional v2.0, histórico 2.2/2025).

## Backup (IMPORTANTE)
- No app: **Relatórios → Exportar backup (JSON)** baixa um arquivo com tudo.
- Guarde uma cópia semanal no Drive. Para restaurar: **Restaurar backup**.
- O `data.json` do Space também pode ser baixado pela aba **Files** (a qualquer momento).

## Segurança (recomendo como próximo passo)
- O servidor atual é aberto: quem tiver o link acessa. Para uso interno MVP é aceitável,
  mas o ideal é adicionar **PIN por perfil** (posso incluir na próxima versão) e,
  no HF Space **Private**, só a equipe com conta HF consegue abrir.

## Atualizar o app no futuro
- HF Space: aba **Files** → substitua o `app.html` (Add file → Upload) → Commit →
  o Space reconstrói em ~2 min com os dados preservados (o `data.json` não é tocado).
