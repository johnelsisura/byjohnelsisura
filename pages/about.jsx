import Head from "next/head";
import Link from "next/link";
import Nav from "../components/Nav";

export default function About() {
  return (
    <>
      <Head>
        <title>About — John Elsisura</title>
        <meta name="description" content="John Elsisura is a weaver — a creative in advertising, marketing, PR, copywriting, and jingles." />
      </Head>

      <Nav />

      <main className="min-h-screen px-8 md:px-12 pt-36 pb-24">
        {/* Header */}
        <div className="mb-16 border-b border-white/5 pb-12">
          <p className="text-accent text-[11px] tracking-[.2em] uppercase mb-4">The Weaver</p>
          <h1 className="font-bebas leading-none" style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
            Weave by<br />John Elsisura
          </h1>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl">
          <div>
            <p className="text-cream text-lg leading-relaxed font-light mb-6">
              I'm a weaver. And I believe that the most fundamental thing you need in advertising, marketing, and PR is a good stitch — a good weave based in human truth.
            </p>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Some of the greatest ideas came from the best weave behind the scenes. The loom is the brief. The threads are the insight. The fabric is what moves people.
            </p>
            <p className="text-muted text-sm leading-relaxed">
              I work across <span className="text-cream">campaigns, copywriting, jingles, case studies, PR, graphics, and accounts</span> — every discipline stitched together by one conviction: the work only lands when it's rooted in something real.
            </p>

            <div className="mt-12">
              <p className="text-accent text-[11px] tracking-[.2em] uppercase mb-4">What I do</p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                {[
                  "Campaign", "Copy", "Jingle",
                  "Case Study", "PR", "Graphics",
                  "Accounts",
                ].map((d) => (
                  <div key={d} className="flex items-center gap-2 text-sm text-muted">
                    <span className="w-3 h-px bg-accent inline-block" />
                    {d} by John Elsisura
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* Weave badge */}
            <div className="border border-accent/20 p-12 text-center">
              <p className="font-bebas text-8xl text-accent leading-none">WEAVE</p>
              <p className="text-[11px] tracking-[.2em] uppercase text-muted mt-3">
                By John Elsisura
              </p>
            </div>

            {/* Contact block */}
            <div className="mt-8 border border-white/5 p-6">
              <p className="text-accent text-[11px] tracking-[.2em] uppercase mb-4">Get in touch</p>
              <a
                href="mailto:your@email.com"
                className="font-bebas text-2xl tracking-widest text-white hover:text-accent transition-colors"
              >
                your@email.com
              </a>
              <div className="mt-4 flex gap-4">
                <a href="https://linkedin.com/in/YOUR_HANDLE" target="_blank" rel="noreferrer" className="text-[11px] tracking-widest uppercase text-muted hover:text-white transition-colors">LinkedIn →</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5">
          <Link href="/" className="text-[11px] tracking-widest uppercase text-muted hover:text-accent transition-colors flex items-center gap-3">
            <span className="w-6 h-px bg-muted" />
            Back to works
          </Link>
        </div>
      </main>
    </>
  );
}
