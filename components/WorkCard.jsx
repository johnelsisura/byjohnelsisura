import Link from "next/link";
import Image from "next/image";

export default function WorkCard({ work }) {
  return (
    <Link href={`/work/${work.id}`} className="group block overflow-hidden bg-[#141210] cursor-pointer">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {work.thumb ? (
          <Image
            src={work.thumb}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${work.thumbBg} opacity-60 transition-opacity duration-500 group-hover:opacity-90`} />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pb-4">
          <div className="flex items-center gap-2 text-accent text-[10px] tracking-widest uppercase mb-1">
            <span className="block w-4 h-px bg-accent" />
            {work.client}
          </div>
          <h3 className="font-bebas text-3xl leading-none tracking-wide">
            {work.title}
          </h3>
          <p className="text-[10px] tracking-wider uppercase text-white/40 mt-1">
            {work.typeLabel}
          </p>
        </div>

        {/* Arrow */}
        <div className="absolute top-4 right-4 w-9 h-9 border border-white/20 flex items-center justify-center opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
