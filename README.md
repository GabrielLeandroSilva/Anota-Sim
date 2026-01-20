# 📝 AnotaSim

**AnotaSim** é um aplicativo simples, rápido e moderno para organizar tarefas do dia a dia.  
Funciona como um **Todo App diário**, com foco em clareza, fluidez e uso offline.

👉 Ideal para quem quer anotar, acompanhar e concluir tarefas sem complexidade.

---

## ✨ Funcionalidades

- ✅ Criar tarefas com data
- 📅 Agrupamento de tarefas por data
- 🟢 Badge **Hoje** para tarefas do dia atual
- 🔄 Alternar tarefas entre **A Fazer** e **Feitas**
- 🗑️ Excluir tarefas
- 📊 Contador de tarefas por aba
- 🎨 Tema **Dark / Light**
- 📱 Interface mobile-first
- 📦 Persistência com **localStorage**
- 🌐 Possibilidade de instalação (PWA)

---

## 🧭 Navegação

O app possui uma navegação fixa no rodapé com 3 seções:

1. **Feitas**
2. **A Fazer** (aba inicial)
3. **Nova tarefa**

A troca entre abas possui animações suaves e suporte a swipe no mobile.

---

## 🧑‍💻 Tecnologias Utilizadas

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS v4
- Lucide Icons
- next-themes
- PWA (Service Worker + Manifest)
- localStorage

---

## 🚀 Deploy

O projeto está hospedado na **Vercel**:

🔗 https://anotasim.vercel.app

Pode ser instalado como aplicativo no celular (PWA).

---

## 📦 Instalação local

```bash
git clone https://github.com/seu-usuario/anotasim.git
cd anotasim
npm install
npm run dev
```

Acesse: http://localhost:3000

---

## 🗂️ Estrutura do Projeto (resumo)

```
app/
components/
hooks/
providers/
types/
```

---

## 🧠 Decisões de Projeto

- Sem backend (localStorage)
- Foco em simplicidade e performance
- PWA para instalação da aplicação

---

## 📄 Licença

MIT

Feito com 💚 para organizar o dia.