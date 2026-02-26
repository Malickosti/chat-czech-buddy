import { useState } from "react";
import foto1 from "@/assets/foto1.jpeg";
import foto2 from "@/assets/foto2.jpeg";
import foto3 from "@/assets/foto3.jpg";
import foto4 from "@/assets/foto4.jpg";
import ProductsSection from "@/components/ProductsSection";
import MapSection from "@/components/MapSection";
import OrdersDialog from "@/components/OrdersDialog";

const galleryPhotos = [
  { src: foto1, alt: "Gravírování dřevěné desky" },
  { src: foto2, alt: "Laserový řez překližky" },
  { src: foto3, alt: "Reklamní cedule" },
  { src: foto4, alt: "Dřevěný přívěsek" },
];

const tabs = [
  {
    id: 1,
    label: "Galerie",
    title: "Ukázky naší práce",
    content: null,
    icon: "",
  },
  {
    id: 2,
    label: "O nás",
    title: "O nás",
    content: "Jsme malá dílna specializující se na laserové gravírování a řezání. Pracujeme převážně se dřevem, překližkou a dalšími materiály. Vytváříme reklamní produkty, personalizované dárky, cedule, klíčenky, dekorace a mnoho dalšího. Každý kus je zpracován s maximální přesností a péčí.",
    icon: "",
  },
  {
    id: 3,
    label: "Služby",
    title: "Naše služby",
    content: "Nabízíme laserové gravírování textu, log a obrázků do dřeva, kůže i plastu. Dále laserové řezání překližky, akrylátu a papíru. Vyrábíme reklamní předměty, firemní dárky, jmenovky, podtácky, klíčenky, ozdoby, svatební dekorace a zakázkovou výrobu podle vašeho návrhu.",
    icon: "",
  },
  {
    id: 4,
    label: "Produkty",
    title: "Naše produkty",
    content: null,
    icon: "",
  },
  {
    id: 5,
    label: "Kontakt",
    title: "Kde nás najdete",
    content: null,
    icon: "",
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [ordersOpen, setOrdersOpen] = useState(false);

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <div
      className="min-h-screen flex flex-col items-center relative"
      style={{ background: "var(--hero-gradient)" }}
    >
      {/* Tlačítko Objednávky */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setOrdersOpen(true)}
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
          style={{
            background: "hsl(var(--secondary))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
          }}
        >
          Objednávky
        </button>
      </div>

      <OrdersDialog open={ordersOpen} onOpenChange={setOrdersOpen} />

      {/* Hero */}
      <header className="w-full flex flex-col items-center pt-16 pb-10 px-4">
        {/* Horní ornament */}
        <div className="flex items-center gap-3 mb-6 opacity-70">
          <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, hsl(25 70% 50%))" }} />
          <span style={{ color: "hsl(25 70% 55%)", fontSize: "1.1rem", letterSpacing: "0.3em" }}>◆ ◆ ◆</span>
          <div className="h-px w-16" style={{ background: "linear-gradient(90deg, hsl(25 70% 50%), transparent)" }} />
        </div>

        {/* Rámeček s názvem */}
        <div
          className="relative px-10 py-4"
          style={{
            border: "2px solid hsl(25 50% 35% / 0.5)",
            outline: "1px solid hsl(25 40% 30% / 0.25)",
            outlineOffset: "6px",
          }}
        >
          <span className="absolute top-1 left-1 text-xs" style={{ color: "hsl(25 60% 45%)", lineHeight: 1 }}>◈</span>
          <span className="absolute top-1 right-1 text-xs" style={{ color: "hsl(25 60% 45%)", lineHeight: 1 }}>◈</span>
          <span className="absolute bottom-1 left-1 text-xs" style={{ color: "hsl(25 60% 45%)", lineHeight: 1 }}>◈</span>
          <span className="absolute bottom-1 right-1 text-xs" style={{ color: "hsl(25 60% 45%)", lineHeight: 1 }}>◈</span>

          <h1
            className="tom-title font-bold select-none"
            style={{ fontSize: "clamp(3rem, 14vw, 10rem)", lineHeight: 1 }}
          >
            Laser Tom
          </h1>
        </div>

        {/* Podnázev */}
        <p
          className="mt-4 text-center max-w-lg"
          style={{ color: "hsl(30 15% 55%)", fontSize: "1rem", letterSpacing: "0.08em", fontFamily: "Georgia, serif" }}
        >
          Gravírování & řezání laserem · Reklamní a dřevěné produkty
        </p>

        {/* Spodní ornament */}
        <div className="flex items-center gap-3 mt-5 opacity-70">
          <div className="h-px w-24" style={{ background: "linear-gradient(90deg, transparent, hsl(25 70% 50%))" }} />
          <span style={{ color: "hsl(25 60% 50%)", fontSize: "0.7rem", letterSpacing: "0.5em", fontFamily: "Georgia, serif" }}>EST. MMXXIV</span>
          <div className="h-px w-24" style={{ background: "linear-gradient(90deg, hsl(25 70% 50%), transparent)" }} />
        </div>
      </header>

      {/* Záložky */}
      <nav className="w-full max-w-4xl px-4">
        <ul className="flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => (
            <li key={tab.id} className="flex-1 min-w-[100px] max-w-[160px]">
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
                        boxShadow: "var(--shadow-amber)",
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
        <h2
          className="text-3xl font-bold"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {current.title}
        </h2>

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
                  loading="lazy"
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        ) : current.id === 4 ? (
          <ProductsSection />
        ) : current.id === 5 ? (
          <MapSection />
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
          {current.label} · Laser Tom
        </p>
      </main>

      <footer
        className="mt-12 mb-8 text-xs tracking-widest uppercase"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        © 2024 Laser Tom — Gravírování & řezání laserem
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
