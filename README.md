# Andrea do Val | Psi — Site

Site one-page para Andrea do Val, psicóloga clínica (CRP 06/303379).

## Deploy no Railway — passo a passo

### Opção A — Via GitHub (mais fácil, recomendado)

1. **Crie um repositório no GitHub** com estes arquivos
2. Acesse [railway.app](https://railway.app) e faça login
3. Clique em **New Project → Deploy from GitHub repo**
4. Selecione este repositório
5. Railway detecta o `package.json` e o `railway.json` automaticamente — clica **Deploy**
6. Em **Settings → Networking** clica em **Generate Domain** pra ter uma URL `*.up.railway.app`
7. Pronto! Site está no ar.

### Opção B — Railway CLI (sem GitHub)

```bash
# 1. Instale o CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Na pasta do projeto:
railway init
railway up

# 4. Gere domínio
railway domain
```

### Domínio próprio (opcional)

Em **Settings → Networking → Custom Domain**, você adiciona algo como `andreadovalpsi.com.br` e o Railway te dá um CNAME pra apontar no seu registrador.

## Rodar localmente

```bash
npm install
npm start
# abre em http://localhost:3000
```

## Estrutura

- `index.html` — HTML principal
- `app.jsx` — componente React (one-pager)
- `tweaks-panel.jsx` — painel de tweaks
- `styles.css` — estilos
- `logo-andrea.png` — logo da marca
- `andrea-foto.avif` — foto da Andrea
- `package.json` + `railway.json` — config de deploy

## Customizar conteúdo

Edite `app.jsx` para alterar:
- Bio em "Sobre" (search: "Sou Andrea do Val")
- Áreas de atuação (search: "Ansiedade")
- FAQ (search: "Atendimento online funciona")
- Contato (e-mail no `mailto:`)

## Tecnologia

- HTML estático + React (CDN, sem build)
- `serve` (Node) como servidor HTTP no Railway

Custo no Railway: ~$1-3/mês no plano hobby (sites estáticos consomem muito pouco).
