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
  const [idx, setIdx] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        i = (i + 1) % DISCIPLINES.length;
        setDiscipline(DISCIPLINES[i]);
        setIdx(i);
        setFade(true);
      }, 380);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let af;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const { width, height } = canvas;
      const img = ctx.createImageData(width, height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 18;
      }
      ctx.putImageData(img, 0, 0);
      af = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(af); window.removeEventListener("resize", resize); };
  }, []);

  const filtered = activeFilter === "all" ? works : works.filter(w => w.type.includes(activeFilter));

  return (
    <>
      <Head>
        <title>Weave by John Elsisura</title>
        <meta name="description" content="Portfolio of John Elsisura — campaigns, copies, jingles, case studies, PR, graphics, and accounts." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,900&family=Barlow:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          :root {
            --black: #161412;
            --red: #E8001C;
            --white: #F0EDE8;
            --grey: #3a3835;
            --muted: #6e6b66;
          }
          html,body { background: var(--black); color: var(--white); }

          .grain {
            position: fixed; inset: 0; pointer-events: none;
            z-index: 1; mix-blend-mode: soft-light; opacity: 0.65;
          }

          body::before {
            content: '';
            position: fixed; inset: 0;
            pointer-events: none; z-index: 0;
            background-image:
              radial-gradient(ellipse 80% 60% at 20% 10%, rgba(232,0,28,0.04) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 90%, rgba(240,237,232,0.02) 0%, transparent 60%);
          }

          nav { z-index: 50 !important; }

          /* ── NAV OVERRIDE ── */
          nav, header {
            position: fixed !important;
            top: 0 !important; left: 0 !important; right: 0 !important;
            z-index: 50 !important;
            background: rgba(22,20,18,0.72) !important;
            backdrop-filter: blur(14px) saturate(160%) !important;
            -webkit-backdrop-filter: blur(14px) saturate(160%) !important;
            border-bottom: 1px solid rgba(58,56,53,0.6) !important;
            padding: 0 3rem !important;
            height: 56px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
          }

          @media(max-width:768px){
            nav, header { padding: 0 1.5rem !important; }
          }

          /* brand / logo inside nav */
          nav a:first-child, header a:first-child {
            font-family: 'Barlow Condensed', sans-serif !important;
            font-weight: 900 !important;
            font-size: 1rem !important;
            letter-spacing: 0.14em !important;
            text-transform: uppercase !important;
            color: var(--white) !important;
            text-decoration: none !important;
          }

          /* nav links */
          nav a:not(:first-child), header a:not(:first-child) {
            font-family: 'Barlow', sans-serif !important;
            font-size: 0.68rem !important;
            letter-spacing: 0.18em !important;
            text-transform: uppercase !important;
            color: var(--muted) !important;
            text-decoration: none !important;
            transition: color 0.2s !important;
          }
          nav a:not(:first-child):hover, header a:not(:first-child):hover {
            color: var(--white) !important;
          }

          /* red dot accent */
          .nav-dot {
            display: inline-block;
            width: 6px; height: 6px;
            border-radius: 50%;
            background: var(--red);
            margin-left: 0.5rem;
            vertical-align: middle;
          }

          .hero {
            position: relative;
            min-height: 100vh;
            display: grid;
            grid-template-columns: 1fr 280px;
            grid-template-rows: 1fr auto;
            padding: 7rem 3rem 3rem;
            overflow: hidden;
          }

          @media(max-width:768px){
            .hero { grid-template-columns: 1fr; padding: 6rem 1.5rem 2.5rem; }
            .hero-right { display: none; }
          }

          .hero::before {
            content: '';
            position: absolute;
            left: 3rem;
            top: 0;
            width: 3px;
            height: 45vh;
            background: var(--red);
          }

          @media(max-width:768px){ .hero::before { left: 1.5rem; } }

          .hero-left {
            grid-column: 1;
            grid-row: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding-left: 1.5rem;
          }

          .hero-eyebrow {
            font-family: 'Barlow', sans-serif;
            font-size: 0.7rem;
            font-weight: 500;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: var(--red);
            margin-bottom: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .hero-eyebrow::before {
            content: '';
            display: block;
            width: 24px;
            height: 1px;
            background: var(--red);
          }

          .hero-type {
            font-family: 'Barlow Condensed', sans-serif;
            font-weight: 900;
            line-height: 0.88;
            letter-spacing: -0.01em;
          }

          .hero-type .line-discipline {
            display: block;
            font-size: clamp(6rem, 16vw, 15rem);
            color: var(--red);
            transition: opacity 0.38s cubic-bezier(.4,0,.2,1), transform 0.38s cubic-bezier(.4,0,.2,1);
            text-transform: uppercase;
          }

          .hero-type .line-by {
            display: block;
            font-size: clamp(2.5rem, 6vw, 5.5rem);
            color: var(--muted);
            font-style: italic;
            font-weight: 700;
            text-transform: lowercase;
            line-height: 1;
            margin: 0.1em 0;
          }

          .hero-type .line-name {
            display: block;
            font-size: clamp(5rem, 13vw, 12rem);
            color: var(--white);
            text-transform: uppercase;
          }

          .hero-bottom {
            grid-column: 1 / -1;
            grid-row: 2;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding-top: 2.5rem;
            border-top: 1px solid var(--grey);
            margin-top: 2rem;
            gap: 2rem;
          }

          @media(max-width:768px){
            .hero-bottom { flex-direction: column; align-items: flex-start; }
          }

          .hero-counter {
            font-family: 'Barlow Condensed', sans-serif;
            font-weight: 700;
            font-size: 0.75rem;
            letter-spacing: 0.2em;
            color: var(--muted);
            text-transform: uppercase;
            white-space: nowrap;
          }

          .hero-counter span { color: var(--red); }

          .hero-tagline {
            font-family: 'Barlow', sans-serif;
            font-size: 0.8rem;
            line-height: 1.8;
            color: var(--muted);
            max-width: 380px;
            text-align: right;
          }

          @media(max-width:768px){ .hero-tagline { text-align: left; } }
          .hero-tagline strong { color: var(--white); font-weight: 500; }

          .hero-cta {
            font-family: 'Barlow Condensed', sans-serif;
            font-weight: 700;
            font-size: 0.7rem;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: var(--muted);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            transition: color 0.2s;
            white-space: nowrap;
          }
          .hero-cta:hover { color: var(--white); }
          .hero-cta::after {
            content: '';
            display: block;
            width: 32px;
            height: 1px;
            background: currentColor;
          }

          .hero-right {
            grid-column: 2;
            grid-row: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding-bottom: 0.25rem;
            padding-left: 2rem;
            border-left: 1px solid var(--grey);
          }

          .disc-list { list-style: none; display: flex; flex-direction: column; gap: 0.1rem; }

          .disc-list li {
            font-family: 'Barlow Condensed', sans-serif;
            font-weight: 700;
            font-size: 0.95rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--grey);
            transition: color 0.3s;
            padding: 0.2rem 0;
            border-bottom: 1px solid transparent;
          }

          .disc-list li.active {
            color: var(--red);
            border-bottom-color: rgba(232,0,28,0.2);
          }

          .reel {
            padding: 5rem 3rem;
            border-top: 1px solid var(--grey);
            position: relative; z-index: 2;
          }

          @media(max-width:768px){ .reel { padding: 3.5rem 1.5rem; } }

          .section-label {
            font-family: 'Barlow', sans-serif;
            font-size: 0.65rem;
            font-weight: 500;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: var(--red);
          }

          .section-title {
            font-family: 'Barlow Condensed', sans-serif;
            font-weight: 900;
            font-size: clamp(3rem, 7vw, 7rem);
            text-transform: uppercase;
            color: var(--white);
            line-height: 0.9;
            letter-spacing: -0.01em;
          }

          .section-title em { font-style: italic; color: var(--red); }

          .reel-frame {
            aspect-ratio: 16/9;
            background: #111009;
            border: 1px solid var(--grey);
            border-radius: 12px;
            position: relative;
            overflow: hidden;
          }

          .reel-placeholder {
            position: absolute; inset: 0;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 1rem;
          }

          .play-ring {
            width: 68px; height: 68px;
            border: 1px solid rgba(232,0,28,0.5);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer;
            transition: border-color 0.2s, background 0.2s;
          }
          .play-ring:hover { border-color: var(--red); background: rgba(232,0,28,0.07); }

          .works {
            padding: 0 3rem 6rem;
            border-top: 1px solid var(--grey);
            position: relative; z-index: 2;
          }

          @media(max-width:768px){ .works { padding: 0 1.5rem 4rem; } }

          .works-head {
            padding: 3rem 0 2rem;
            border-bottom: 1px solid var(--grey);
          }

          .filters { display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 1.5rem 0 2rem; }

          .filter-btn {
            font-family: 'Barlow Condensed', sans-serif;
            font-weight: 700;
            font-size: 0.7rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            padding: 0.35rem 1rem;
            border: 1px solid var(--grey);
            border-radius: 4px;
            background: transparent;
            color: var(--muted);
            cursor: pointer;
            transition: all 0.18s;
          }
          .filter-btn:hover { border-color: var(--white); color: var(--white); }
          .filter-btn.active { border-color: var(--red); color: var(--red); }

          .works-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }

          @media(max-width:640px){ .works-grid { grid-template-columns: 1fr; } }
          .works-grid > * {
            background: var(--black);
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--grey);
          }

          .footer {
            padding: 2rem 3rem;
            border-top: 1px solid var(--grey);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative; z-index: 2;
          }

          @media(max-width:768px){ .footer { padding: 2rem 1.5rem; } }

          .footer-brand {
            font-family: 'Barlow Condensed', sans-serif;
            font-weight: 900;
            font-size: 1rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--red);
          }

          .footer-links { display: flex; gap: 1.5rem; }
          .footer-links a {
            font-family: 'Barlow', sans-serif;
            font-size: 0.65rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--muted);
            text-decoration: none;
            transition: color 0.2s;
          }
          .footer-links a:hover { color: var(--white); }
        `}</style>
      </Head>

      <canvas ref={canvasRef} className="grain" />
      <Nav />

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">Portfolio</p>
          <div className="hero-type">
            <span
              className="line-discipline"
              style={{
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0)" : "translateY(10px)",
              }}
            >
              {discipline}
            </span>
            <span className="line-by">by</span>
            <span className="line-name">John Elsisura</span>
          </div>
        </div>

        <div className="hero-right">
          <ul className="disc-list">
            {DISCIPLINES.map((d, i) => (
              <li key={d} className={i === idx ? "active" : ""}>{d}</li>
            ))}
          </ul>
        </div>

        <div className="hero-bottom">
          <span className="hero-counter">
            <span>{String(idx + 1).padStart(2, "0")}</span> / {String(DISCIPLINES.length).padStart(2, "0")}
          </span>
          <p className="hero-tagline">
            <strong>I'm a weaver.</strong> The most fundamental thing in advertising,
            marketing, and PR is a good stitch — a weave grounded in human truth.
          </p>
          <a href="#works" className="hero-cta">Explore the works</a>
        </div>
      </section>

      {/* REEL */}
      <section className="reel">
        <p className="section-label" style={{ marginBottom: "0.75rem" }}>Showreel</p>
        <h2 className="section-title">Demo <em>Reel</em></h2>
        <div className="reel-frame" style={{ marginTop: "1.5rem" }}>
          {/* <iframe src="https://www.youtube.com/embed/YOUR_REEL_ID" style={{position:"absolute",inset:0,width:"100%",height:"100%"}} allowFullScreen /> */}
          <div className="reel-placeholder">
            <div className="play-ring">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 3l14 9-14 9V3z" fill="#E8001C" />
              </svg>
            </div>
            <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#6e6b66" }}>
              Replace with YouTube embed
            </p>
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section className="works" id="works">
        <div className="works-head">
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>Selected work</p>
          <h2 className="section-title">What I've Done<br /><em>(So Far)</em></h2>
        </div>

        <div className="filters">
          {filterTags.map(tag => (
            <button
              key={tag.value}
              onClick={() => setActiveFilter(tag.value)}
              className={`filter-btn${activeFilter === tag.value ? " active" : ""}`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        <div className="works-grid">
          {filtered.map(work => <WorkCard key={work.id} work={work} />)}
          {filtered.length === 0 && (
            <p style={{ color:"#6e6b66", fontSize:"0.85rem", gridColumn:"1/-1", textAlign:"center", padding:"3rem 0" }}>
              No works under this category yet.
            </p>
          )}
        </div>
      </section>

      {/* FOOTER */}
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
