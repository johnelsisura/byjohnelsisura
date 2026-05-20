import { useState, useEffect } from "react";
import Head from "next/head";
import Nav from "../components/Nav";
import WorkCard from "../components/WorkCard";
import { works, filterTags } from "../data/works";

const DISCIPLINES = ["Campaign", "Copy", "Jingle", "Case Study", "PR", "Graphics", "Accounts"];

export default function Home() {
  const [discipline, setDiscipline] = useState("Campaign");
  const [fade, setFade] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  // Rotating discipline in hero
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        i = (i + 1) % DISCIPLINES.length;
        setDiscipline(DISCIPLINES[i]);
        setFade(true);
      }, 350);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const filtered =
    activeFilter === "all"
      ? works
      : works.filter((w) => w.type.includes(activeFilter));

  return (
    <>
      <Head>
        <title>Weave by John Elsisura</title>
        <meta name="description" content="Portfolio of John Elsisura — campaigns, copies, jingles, case studies, PR, graphics, and accounts. Weave by John Elsisura." />
        <meta property="og:title" content="Weave by John Elsisura" />
        <meta property="og:description" content="Campaigns, copies, jingles, and more. Grounded in human truth." />
      </Head>

      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col justify-end px-8 md:px-12 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1208] to-ink" />
        <div className="thread-line" />
        <div className="thread-line2" />
        <div className="hero-overlay" />

        {/* Demo reel bg video — uncomment when ready */}
        {/*
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 z-0">
          <source src="/videos/demo-reel.mp4" type="video/mp4" />
        </video>
        */}

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-accent" />
            <span className="text-accent text-[11px] tracking-[.2em] uppercase">Portfolio</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-4 md:gap-6">
            <span
              className="font-bebas text-cream leading-none"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0)" : "translateY(8px)",
                transition: "opacity .35s, transform .35s",
              }}
            >
              {discipline}
            </span>
            <span
              className="font-serif italic text-accent"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              by
            </span>
            <span
              className="font-bebas text-white leading-none"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
            >
              John Elsisura
            </span>
          </div>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted font-light">
            <span className="text-cream">I'm a weaver.</span> The most fundamental thing in advertising, marketing, and PR is a good stitch — a weave grounded in human truth. Some of the greatest ideas came from the best weave behind the scenes.
          </p>

          <a
            href="#works"
            className="mt-10 inline-flex items-center gap-4 text-[11px] tracking-[.15em] uppercase text-muted hover:text-white transition-colors"
          >
            Explore the works
            <span className="block w-10 h-px bg-muted" />
          </a>
        </div>
      </section>

      {/* ===== DEMO REEL ===== */}
      <section className="px-8 md:px-12 py-20 border-t border-white/5">
        <div className="mb-6">
          <p className="text-accent text-[11px] tracking-[.2em] uppercase mb-1">Showreel</p>
          <h2 className="font-bebas text-5xl tracking-wide">Demo Reel</h2>
        </div>
        <div className="relative aspect-video bg-[#0d0c0a] border border-white/5 overflow-hidden">
          {/* PASTE YOUTUBE EMBED HERE — replace the placeholder div below */}
          {/* <iframe src="https://www.youtube.com/embed/YOUR_REEL_ID" className="w-full h-full" allowFullScreen /> */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full border border-white/25 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
            </div>
            <p className="text-[11px] tracking-[.12em] uppercase text-muted">
              Replace with YouTube embed
            </p>
          </div>
        </div>
      </section>

      {/* ===== WORKS ===== */}
      <section className="px-8 md:px-12 pb-24 border-t border-white/5" id="works">
        <div className="flex justify-between items-end py-6 mb-0 border-b border-white/5">
          <div>
            <p className="text-accent text-[11px] tracking-[.2em] uppercase mb-1">Selected work</p>
            <h2 className="font-bebas text-5xl tracking-wide">What I've Done (So Far)</h2>
          </div>
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-2 py-6">
          {filterTags.map((tag) => (
            <button
              key={tag.value}
              onClick={() => setActiveFilter(tag.value)}
              className={`px-4 py-1.5 border text-[11px] tracking-widest uppercase transition-all ${
                activeFilter === tag.value
                  ? "border-accent text-accent"
                  : "border-white/10 text-muted hover:border-white/30 hover:text-white/70"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {filtered.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
          {filtered.length === 0 && (
            <p className="text-muted text-sm col-span-2 py-12 text-center">
              No works under this category yet.
            </p>
          )}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="px-8 md:px-12 py-8 border-t border-white/5 flex justify-between items-center">
        <span className="font-bebas text-accent tracking-widest text-xl">byjohnelsisura.website</span>
        <div className="flex gap-6">
          <a href="https://linkedin.com/in/YOUR_HANDLE" target="_blank" rel="noreferrer" className="text-muted text-[11px] tracking-widest uppercase hover:text-white transition-colors">LinkedIn</a>
          <a href="mailto:your@email.com" className="text-muted text-[11px] tracking-widest uppercase hover:text-white transition-colors">Email</a>
        </div>
      </footer>
    </>
  );
}
