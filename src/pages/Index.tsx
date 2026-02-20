import { useState } from "react";
import foto1 from "@/assets/foto1.jpeg";
import foto2 from "@/assets/foto2.jpeg";
import foto3 from "@/assets/foto3.jpg";
import foto4 from "@/assets/foto4.jpg";

const galleryPhotos = [
  { src: foto1, alt: "Foto 1" },
  { src: foto2, alt: "Foto 2" },
  { src: foto3, alt: "Foto 3" },
  { src: foto4, alt: "Foto 4" },
];

const tabs = [
  {
    id: 1,
    label: "Foto",
    title: "Moje fotky",
    content: null,
    icon: "",
  },
  {
    id: 2,
    label: "Záložka 2",
    title: "Druhá stránka",
    content: "Toto je obsah druhé záložky. Každá záložka představuje samostatnou sekci vašeho webu s vlastním obsahem.",
    icon: "②",
  },
  {
    id: 3,
    label: "Záložka 3",
    title: "Třetí stránka",
    content: "Toto je obsah třetí záložky. Navigace mezi záložkami je plynulá a přehledná.",
    icon: "③",
  },
  {
    id: 4,
    label: "Záložka 4",
    title: "Čtvrtá stránka",
    content: "Toto je obsah čtvrté záložky. Sem přidejte svůj vlastní text, fotografie nebo jiný obsah dle potřeby.",
    icon: "④",
  },
  {
    id: 5,
    label: "Mapa",
    title: "Trasa z Brna do Zbýšova u Křenovic",
    content: null,
    icon: "",
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ background: "var(--hero-gradient)" }}
    >
      {/* Hero – velký nápis TOM */}
      <header className="w-full flex flex-col items-center pt-16 pb-10 px-4">
        {/* Vintage horní ornament */}
        <div className="flex items-center gap-3 mb-6 opacity-70">
          <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, hsl(40 60% 55%))" }} />
          <span style={{ color: "hsl(40 60% 60%)", fontSize: "1.1rem", letterSpacing: "0.3em" }}>✦ ✦ ✦</span>
          <div className="h-px w-16" style={{ background: "linear-gradient(90deg, hsl(40 60% 55%), transparent)" }} />
        </div>

        {/* Vintage rámeček */}
        <div
          className="relative px-12 py-4"
          style={{
            border: "2px solid hsl(40 50% 45% / 0.5)",
            outline: "1px solid hsl(40 50% 35% / 0.25)",
            outlineOffset: "6px",
            background: "radial-gradient(ellipse at center, hsl(35 25% 12% / 0.6) 0%, transparent 70%)",
          }}
        >
          {/* Rohové ozdoby */}
          <span className="absolute top-1 left-1 text-xs" style={{ color: "hsl(40 60% 55%)", lineHeight: 1 }}>◈</span>
          <span className="absolute top-1 right-1 text-xs" style={{ color: "hsl(40 60% 55%)", lineHeight: 1 }}>◈</span>
          <span className="absolute bottom-1 left-1 text-xs" style={{ color: "hsl(40 60% 55%)", lineHeight: 1 }}>◈</span>
          <span className="absolute bottom-1 right-1 text-xs" style={{ color: "hsl(40 60% 55%)", lineHeight: 1 }}>◈</span>

          <h1
            className="tom-title font-bold select-none"
            style={{ fontSize: "clamp(5rem, 18vw, 14rem)", lineHeight: 1 }}
          >
            TOM
          </h1>
        </div>

        {/* Vintage spodní ornament */}
        <div className="flex items-center gap-3 mt-6 opacity-70">
          <div className="h-px w-24" style={{ background: "linear-gradient(90deg, transparent, hsl(40 60% 55%))" }} />
          <span style={{ color: "hsl(40 60% 60%)", fontSize: "0.7rem", letterSpacing: "0.5em", fontFamily: "Georgia, serif" }}>EST. MMXXIV</span>
          <div className="h-px w-24" style={{ background: "linear-gradient(90deg, hsl(40 60% 55%), transparent)" }} />
        </div>
      </header>

      {/* Záložky – vodorovný řádek */}
      <nav className="w-full max-w-4xl px-4">
        <ul className="flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => (
            <li key={tab.id} className="flex-1 min-w-[120px] max-w-[180px]">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full py-3 px-2 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200 ${
                  activeTab === tab.id ? "tab-active" : "tab-inactive"
                }`}
                style={
                  activeTab === tab.id
                    ? {
                        background: "hsl(var(--tab-active-bg))",
                        color: "hsl(var(--primary-foreground))",
                        boxShadow: "var(--shadow-gold)",
                      }
                    : {
                        background: "hsl(var(--tab-inactive-bg))",
                        color: "hsl(var(--muted-foreground))",
                      }
                }
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Obsah záložky */}
      <main
        className="w-full max-w-4xl mt-6 mx-4 rounded-2xl px-10 py-12 flex flex-col gap-4"
        style={{
          background: "hsl(var(--card))",
          boxShadow: "var(--shadow-card)",
          border: "1px solid hsl(var(--border))",
        }}
      >
        <div
          className="text-5xl font-bold mb-2"
          style={{ color: "hsl(var(--primary))" }}
        >
          {current.icon}
        </div>
        <h2
          className="text-3xl font-bold"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {current.title}
        </h2>

        {/* Galerie pro záložku Foto */}
        {current.id === 1 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {galleryPhotos.map((photo, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl cursor-pointer group"
                style={{ border: "1px solid hsl(var(--border))" }}
                onClick={() => setLightbox(photo.src)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        ) : current.id === 5 ? (
          <div className="w-full mt-2 rounded-xl overflow-hidden" style={{ border: "1px solid hsl(var(--border))" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d83200!2d16.6!3d49.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x4712943ac03f21ad%3A0x400af0f6614b1b0!2sBrno!3m2!1d49.1950602!2d16.6068371!4m5!1s0x471294e5c7e3e7d5%3A0x400af0f6614b580!2sZb%C3%BD%C5%A1ov%20u%20K%C5%99enovic!3m2!1d49.1647!2d16.8283!5e0!3m2!1scs!2scz!4v1700000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Trasa z Brna do Zbýšova u Křenovic"
            />
          </div>
        ) : (
          <p
            className="text-lg leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {current.content}
          </p>
        )}

        {/* Dekorativní oddělovač */}
        <div
          className="mt-6 h-0.5 w-24 rounded-full"
          style={{ background: "var(--gold-gradient)" }}
        />
        <p
          className="text-sm"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Záložka {current.id} z {tabs.length}
        </p>
      </main>

      <footer
        className="mt-12 mb-8 text-xs tracking-widest uppercase"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        © 2024 TOM
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Náhled"
            className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl object-contain"
          />
          <button
            className="absolute top-6 right-8 text-white text-4xl font-bold hover:opacity-70 transition-opacity"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
