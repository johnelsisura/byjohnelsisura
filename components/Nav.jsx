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

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: "0 3rem",
        height: "56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "background 0.4s, border-color 0.4s",
        background: scrolled ? "rgba(22,20,18,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(58,56,53,0.5)" : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 900,
        fontSize: "1.05rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "#E8001C",
        textDecoration: "none",
      }}>
        JE
      </Link>

      {/* Links */}
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {[
          { label: "Works", href: "/#works" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "mailto:your@email.com", external: true },
        ].map(({ label, href, external }) => {
          const isActive = !external && router.pathname === href;
          return external ? (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#6e6b66",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.target.style.color = "#F0EDE8"}
              onMouseLeave={e => e.target.style.color = "#6e6b66"}
            >
              {label}
            </a>
          ) : (
            <Link
              key={label}
              href={href}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: isActive ? "#E8001C" : "#6e6b66",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => { if (!isActive) e.target.style.color = "#F0EDE8"; }}
              onMouseLeave={e => { if (!isActive) e.target.style.color = "#6e6b66"; }}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
