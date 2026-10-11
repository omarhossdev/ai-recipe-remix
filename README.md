# 🍳 AI Recipe Remix

Turn a photo of your fridge into recipes you can cook **right now**.

## ✨ What it does

- 📸 Upload a photo of your ingredients
- 🤖 AI detects what's in the picture
- 🍽️ Get 3 recipes you can make immediately
- 💾 Save your favorites
- 🔗 Share recipes with friends

## 🛠️ Tech Stack

- **Next.js** — React framework (App Router)
- **TypeScript** — type safety
- **Tailwind CSS** — styling
- **Hugging Face Interface API** — vision + recipe generation
- **Supabase** — auth + database
- **Vercel** — deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Install

```bash
pnpm install
```

### Run dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file:

```
HF_TOKEN=your_hugging_face_token_here
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## 📦 Build

```bash
pnpm build
pnpm start
```

## 📸 Screenshots

_Coming soon..._

## 🗺️ Roadmap

- [x] Project setup
- [x] Upload UI
- [x] Connect HF
- [x] Implement API route
- [ ] AI ingredient detection
- [ ] Recipe generation
- [ ] User accounts
- [ ] Save favorites
- [ ] Deploy

## 📄 License

[MIT](./LICENSE)