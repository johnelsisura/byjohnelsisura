import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Nav from "../components/Nav";
import WorkCard from "../components/WorkCard";
import { works, filterTags } from "../data/works";

const DISCIPLINES = ["Campaign", "Copy", "Jingle", "Case Study", "PR", "Graphics", "Accounts"];

export default function Home() {
  const [discipline, setDiscipline] = useState("Campaign");
  const [fade, setFade] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const canvasRef = useRef(null);

  // Rotating discipline
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        i = (i + 1) % DISCIPLINES.length;
        setDiscipline(DISCIPLINES[i]);
        setDisciplineIndex(i);
        setFade(true);
      }, 400);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  // Grain canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawGrain = () => {
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 18;
      }
      ctx.putImageData(imageData, 0, 0);
      animFrame = requestAnimationFrame(drawGrain);
    };
    drawGrain();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const filtered =
    activeFilter === "all"
      ? works
      : works.filter((w) => w.type.includes(activeFilter));

  return (
    <>
      <Head>
        <title>Weave by John Elsisura</title>
        <meta name="description" content="Portfolio of John Elsisura — campaigns, copies, jingles, case studies, PR, graphics, and accounts." />
        <meta property="og:title" content="Weave by John Elsisura" />
        <meta property="og:description" content="Campaigns, copies, jingles, and more. Grounded in human truth." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --ink: #0a0907;
            --accent: #c9a84c;
            --muted: #6b6560;
            --cream: #ede8df;
          }
          html { background: var(--ink); }
          body { background: var(--ink); margin: 0; }

          .font-bebas { font-family: 'Bebas Neue', sans-serif; }
          .font-serif-italic { font-family: 'Playfair Display', serif; font-style: italic; }

          /* Grain overlay */
          .grain-canvas {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 1;
            mix-blend-mode: overlay;
            opacity: 0.6;
          }

          /* Hero */
          .hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 0 3rem 4rem;
            overflow: hidden;
            background: var(--ink);
          }

          .hero-bg-text {
            position: absolute;
            top: 50%;
            left: -2rem;
            transform: translateY(-50%);
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(18rem, 35vw, 32rem);
            line-height: 0.85;
            color: transparent;
            -webkit-text-stroke: 1px rgba(201,168,76,0.07);
            pointer-events: none;
            user-select: none;
            white-space: nowrap;
            letter-spacing: -0.02em;
          }

          .hero-rule {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 30%, rgba(201,168,76,0.15) 70%, transparent);
            margin-bottom: 2.5rem;
          }

          .discipline-wrap {
            display: flex;
            align-items: flex-end;
            gap: 0;
            flex-wrap: wrap;
            line-height: 0.88;
            margin-bottom: 1.5rem;
          }

          .discipline-rotating {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(5rem, 14vw, 13rem);
            color: var(--accent);
            transition: opacity 0.4s, transform 0.4s;
            display: block;
            letter-spacing: -0.01em;
          }

          .discipline-by {
            font-family: 'Playfair Display', serif;
            font-style: italic;
            font-size: clamp(2rem, 5vw, 5rem);
            color: rgba(237,232,223,0.4);
            margin: 0 1.2rem 0.5rem;
            line-height: 1;
          }

          .discipline-name {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(5rem, 14vw, 13rem);
            color: var(--cream);
            letter-spacing: -0.01em;
            display: block;
          }

          .hero-meta {
            display: flex;
            align-items: flex-start;
            gap: 4rem;
            margin-top: 2rem;
          }

          .hero-tagline {
            max-width: 420px;
            font-size: 0.8rem;
            line-height: 1.75;
            color: var(--muted);
            letter-spacing: 0.02em;
            border-left: 1px solid rgba(201,168,76,0.3);
            padding-left: 1.25rem;
          }

          .hero-tagline span {
            color: var(--cream);
          }

          .hero-scroll {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.5rem;
            margin-left: auto;
          }

          .hero-scroll a {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 0.75rem;
            letter-spacing: 0.25em;
            color: var(--muted);
            text-decoration: none;
            text-transform: uppercase;
            transition: color 0.2s;
            writing-mode: vertical-rl;
          }

          .hero-scroll a:hover { color: var(--accent); }

          .counter {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 0.65rem;
            color: rgba(201,168,76,0.4);
            letter-spacing: 0.15em;
          }

          /* Stamp mark */
          .stamp {
            position: absolute;
            top: 7rem;
            right: 3rem;
            width: 100px;
            height: 100px;
            border: 1.5px solid rgba(201,168,76,0.25);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transform: rotate(12deg);
          }

          .stamp p {
            margin: 0;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 0.55rem;
            letter-spacing: 0.2em;
            color: rgba(201,168,76,0.4);
            text-transform: uppercase;
            line-height: 1.6;
          }

          /* Section label */
          .section-label {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 0.65rem;
            letter-spacing: 0.25em;
            color: var(--accent);
            text-transform: uppercase;
          }

          /* Reel section */
          .reel-section {
            padding: 5rem 3rem;
            border-top: 1px solid rgba(255,255,255,0.04);
            position: relative;
            z-index: 2;
          }

          .reel-header {
            display: flex;
            align-items: baseline;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .reel-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(3rem, 7vw, 6rem);
            color: var(--cream);
            line-height: 1;
            margin: 0;
          }

          .reel-title em {
            font-family: 'Playfair Display', serif;
            font-style: italic;
            color: var(--accent);
          }

          .reel-frame {
            position: relative;
            aspect-ratio: 16/9;
            background: #0d0b09;
            border: 1px solid rgba(255,255,255,0.04);
            overflow: hidden;
          }

          .reel-placeholder {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
          }

          .play-btn {
            width: 64px;
            height: 64px;
            border: 1px solid rgba(201,168,76,0.4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: border-color 0.2s, background 0.2s;
          }

          .play-btn:hover {
            border-color: var(--accent);
            background: rgba(201,168,76,0.08);
          }

          /* Works section */
          .works-section {
            padding: 0 3rem 6rem;
            border-top: 1px solid rgba(255,255,255,0.04);
            position: relative;
            z-index: 2;
          }

          .works-header {
            padding: 2.5rem 0 0;
            margin-bottom: 0;
            border-bottom: 1px solid rgba(255,255,255,0.04);
            padding-bottom: 2rem;
          }

          .works-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(2.5rem, 6vw, 5rem);
            color: var(--cream);
            line-height: 1;
            margin: 0.25rem 0 0;
          }

          /* Filters */
          .filters {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            padding: 1.5rem 0;
          }

          .filter-btn {
            padding: 0.35rem 1rem;
            border: 1px solid rgba(255,255,255,0.08);
            background: transparent;
            color: var(--muted);
            font-size: 0.65rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.2s;
            font-family: 'Bebas Neue', sans-serif;
          }

          .filter-btn:hover {
            border-color: rgba(255,255,255,0.25);
            color: rgba(237,232,223,0.7);
          }

          .filter-btn.active {
            border-color: var(--accent);
            color: var(--accent);
          }

          /* Grid */
          .works-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }

          @media (max-width: 640px) {
            .hero { padding: 0 1.5rem 3rem; }
            .stamp { display: none; }
            .hero-meta { flex-direction: column; gap: 1.5rem; }
            .hero-scroll { display: none; }
            .reel-section, .works-section { padding-left: 1.5rem; padding-right: 1.5rem; }
            .works-grid { grid-template-columns: 1fr; }
            .hero-bg-text { font-size: 40vw; }
          }

          /* Footer */
          .footer {
            padding: 2rem 3rem;
            border-top: 1px solid rgba(255,255,255,0.04);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            z-index: 2;
          }

          .footer-brand {
            font-family: 'Bebas Neue', sans-serif;
            color: var(--accent);
            letter-spacing: 0.15em;
            font-size: 1.1rem;
          }

          .footer-links {
            display: flex;
            gap: 1.5rem;
          }

          .footer-links a {
            font-size: 0.65rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--muted);
            text-decoration: none;
            transition: color 0.2s;
          }

          .footer-links a:hover { color: var(--cream); }
        `}</style>
      </Head>

      {/* Animated grain */}
      <canvas ref={canvasRef} className="grain-canvas" />

      <Nav />

      {/* ===== HERO ===== */}
      <section className="hero">
        {/* Ghost bg text */}
        <div className="hero-bg-text" aria-hidden="true">WEAVE</div>

        {/* Stamp */}
        <div className="stamp" aria-hidden="true">
          <p>Est.<br/>MMXXV<br/>Manila</p>
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-rule" />

          {/* Rotating discipline */}
          <div className="discipline-wrap">
            <span
              className="discipline-rotating"
              style={{
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0) skewX(0deg)" : "translateY(12px) skewX(-2deg)",
              }}
            >
              {discipline}
            </span>
            <span className="discipline-by">by</span>
            <span className="discipline-name">John Elsisura</span>
          </div>

          {/* Counter */}
          <div style={{ marginBottom: "1rem" }}>
            <span className="counter">
              {String(disciplineIndex + 1).padStart(2, "0")} / {String(DISCIPLINES.length).padStart(2, "0")}
            </span>
          </div>

          <div className="hero-meta">
            <p className="hero-tagline">
              <span>I'm a weaver.</span> The most fundamental thing in advertising,
              marketing, and PR is a good stitch — a weave grounded in human truth.
              Some of the greatest ideas came from the best weave behind the scenes.
            </p>

            <div className="hero-scroll">
              <a href="#works">Explore the works</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DEMO REEL ===== */}
      <section className="reel-section" style={{ position: "relative", zIndex: 2 }}>
        <div className="reel-header">
          <p className="section-label">Showreel</p>
        </div>
        <h2 className="reel-title">Demo <em>Reel</em></h2>
        <div className="reel-frame" style={{ marginTop: "1.5rem" }}>
          {/* PASTE YOUTUBE EMBED HERE */}
          {/* <iframe src="https://www.youtube.com/embed/YOUR_REEL_ID" style={{position:"absolute",inset:0,width:"100%",height:"100%"}} allowFullScreen /> */}
          <div className="reel-placeholder">
            <div className="play-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 3l14 9-14 9V3z" fill="rgba(201,168,76,0.8)" />
              </svg>
            </div>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", margin: 0 }}>
              Replace with YouTube embed
            </p>
          </div>
        </div>
      </section>

      {/* ===== WORKS ===== */}
      <section className="works-section" id="works">
        <div className="works-header">
          <p className="section-label">Selected work</p>
          <h2 className="works-title">What I've Done<br /><em style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "var(--accent)" }}>(So Far)</em></h2>
        </div>

        {/* Filters */}
        <div className="filters">
          {filterTags.map((tag) => (
            <button
              key={tag.value}
              onClick={() => setActiveFilter(tag.value)}
              className={`filter-btn${activeFilter === tag.value ? " active" : ""}`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="works-grid">
          {filtered.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
          {filtered.length === 0 && (
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", gridColumn: "1/-1", textAlign: "center", padding: "3rem 0" }}>
              No works under this category yet.
            </p>
          )}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <span className="footer-brand">byjohnelsisura.website</span>
        <div className="footer-links">
          <a href="https://linkedin.com/in/YOUR_HANDLE" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:your@email.com">Email</a>
        </div>
      </footer>
    </>
  );
}
