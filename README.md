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
