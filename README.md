<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
=======
# Weave by John Elsisura — Portfolio

Built with **Next.js** + **Tailwind CSS**.

---

## Setup (first time)

```bash
# 1. Go into the project folder
cd john-portfolio

# 2. Install dependencies
npm install

# 3. Run locally (dev server)
npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## Pages

| Page | File | What it is |
|---|---|---|
| `/` | `pages/index.jsx` | Home — hero, demo reel, works grid |
| `/about` | `pages/about.jsx` | About / The Weaver |
| `/work/[id]` | `pages/work/[id].jsx` | Individual project page |

---

## How to add a new work

Open `data/works.js` — this is the ONLY file you edit to add projects.

Copy one object and fill in:

```js
{
  id: "my-project-slug",           // URL: /work/my-project-slug
  client: "Brand Name",
  title: "Campaign Title",
  brief: "One-liner description.",
  type: ["campaign", "copy"],      // for filter tags
  typeLabel: "Campaign · Copy",
  thumb: "/images/my-thumb.jpg",   // put in /public/images/
  thumbBg: "from-amber-950 to-yellow-900", // fallback gradient
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
  background: "Context paragraph.",
  idea: "The creative idea.",
  credits: [
    { role: "Copywriter", name: "John Elsisura" },
  ],
}
```

---

## How to add your demo reel

In `pages/index.jsx`, find the comment:
```
{/* PASTE YOUTUBE EMBED HERE */}
```
Replace the placeholder `<div>` with:
```jsx
<iframe src="https://www.youtube.com/embed/YOUR_REEL_ID" className="w-full h-full" allowFullScreen />
```

---

## How to add thumbnail images

1. Put your image inside `/public/images/` (e.g. `thumb-campaign.jpg`)
2. In `data/works.js`, set `thumb: "/images/thumb-campaign.jpg"`

---

## Build for production

```bash
npm run build
npm run start
```

---

## Deploy to GitHub + Namecheap

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/john-portfolio.git
git push -u origin main
```

### 2. Deploy options

**Option A — Vercel (free, easiest)**
- Go to vercel.com, connect your GitHub repo
- It auto-deploys on every push
- Add your custom domain in Vercel Dashboard → Settings → Domains
- In Namecheap DNS, add CNAME: `www` → `cname.vercel-dns.com`

**Option B — Namecheap Hosting**
- Run `npm run build` then `npm run export` (add `output: 'export'` to next.config.js)
- Upload the `/out` folder via cPanel File Manager or FTP

---

## Folder structure

```
john-portfolio/
├── components/
│   ├── Nav.jsx          ← navigation
│   └── WorkCard.jsx     ← work thumbnail card
├── data/
│   └── works.js         ← ALL YOUR WORKS GO HERE
├── pages/
│   ├── _app.jsx
│   ├── index.jsx        ← home page
│   ├── about.jsx        ← about page
│   └── work/
│       └── [id].jsx     ← individual project page
├── public/
│   └── images/          ← put thumbnails here
└── styles/
    └── globals.css
```
>>>>>>> 8d72a8ab6b213b842d5eef404c2496c3ba44e9f6
