import Head from "next/head";
import Link from "next/link";
import Nav from "../../components/Nav";
import { works } from "../../data/works";

// Next.js needs to know all possible [id] values at build time
export async function getStaticPaths() {
  return {
    paths: works.map((w) => ({ params: { id: w.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const work = works.find((w) => w.id === params.id) || null;
  return { props: { work } };
}

export default function WorkPage({ work }) {
  if (!work) return null;

  return (
    <>
      <Head>
        <title>{work.title} — John Elsisura</title>
        <meta name="description" content={work.brief} />
        <meta property="og:title" content={`${work.title} — John Elsisura`} />
        <meta property="og:description" content={work.brief} />
      </Head>

      <Nav />

      {/* ===== PROJECT HERO ===== */}
      <section className="relative min-h-[55vh] flex flex-col justify-end px-8 md:px-12 pt-36 pb-12 border-b border-white/5 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${work.thumbBg} opacity-10`} />
        <div className="thread-line" />
        <div className="hero-overlay" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4 text-accent text-[11px] tracking-[.2em] uppercase">
            <span className="w-6 h-px bg-accent" />
            {work.client}
          </div>
          <h1 className="font-bebas leading-none" style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
            {work.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            {work.brief}
          </p>
          <p className="mt-3 text-[11px] tracking-widest uppercase text-white/30">
            {work.typeLabel}
          </p>
        </div>
      </section>

      {/* ===== VIDEO ===== */}
      <section className="px-8 md:px-12 py-12 border-b border-white/5">
        <div className="relative aspect-video bg-[#0d0c0a] border border-white/5 overflow-hidden">
          {work.videoUrl ? (
            <iframe
              src={work.videoUrl}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              title={work.title}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full border border-white/25 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
              </div>
              <p className="text-[11px] tracking-[.12em] uppercase text-muted">Video coming soon</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== BACKGROUND + IDEA ===== */}
      <section className="px-8 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-white/5">
        <div>
          <p className="text-accent text-[11px] tracking-[.2em] uppercase mb-3">Context</p>
          <h2 className="font-bebas text-3xl tracking-wide mb-5">Background</h2>
          <p className="text-muted text-sm leading-relaxed">{work.background}</p>
        </div>
        <div>
          <p className="text-accent text-[11px] tracking-[.2em] uppercase mb-3">Creative</p>
          <h2 className="font-bebas text-3xl tracking-wide mb-5">The Idea</h2>
          <p className="text-muted text-sm leading-relaxed">{work.idea}</p>
        </div>
      </section>

      {/* ===== CREDITS ===== */}
      <section className="px-8 md:px-12 py-12 border-b border-white/5">
        <p className="text-accent text-[11px] tracking-[.2em] uppercase mb-3">Team</p>
        <h2 className="font-bebas text-3xl tracking-wide mb-8">Credits</h2>
        <div className="flex flex-wrap gap-x-12 gap-y-6">
          {work.credits.map((c, i) => (
            <div key={i}>
              <p className="text-[11px] tracking-widest uppercase text-muted">{c.role}</p>
              <p className="text-white text-sm mt-1">{c.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BACK NAV ===== */}
      <div className="px-8 md:px-12 py-10">
        <Link
          href="/#works"
          className="text-[11px] tracking-widest uppercase text-muted hover:text-accent transition-colors flex items-center gap-3"
        >
          <span className="w-6 h-px bg-muted" />
          Back to all works
        </Link>
      </div>
    </>
  );
}
