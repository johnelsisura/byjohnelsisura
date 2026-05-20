import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = router.pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${
        scrolled ? "border-b border-white/5 backdrop-blur-md bg-ink/70" : ""
      }`}
    >
      <Link href="/" className="font-bebas text-accent tracking-widest text-lg">
        JE
      </Link>
      <div className="flex gap-8">
        <Link
          href="/#works"
          className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors"
        >
          Works
        </Link>
        <Link
          href="/about"
          className={`text-xs tracking-widest uppercase transition-colors ${
            router.pathname === "/about"
              ? "text-accent"
              : "text-white/50 hover:text-white"
          }`}
        >
          About
        </Link>
        <a
          href="mailto:your@email.com"
          className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
