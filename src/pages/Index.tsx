import { useState } from "react";

const tabs = [
  {
    id: 1,
    label: "Foto",
    title: "První stránka",
    content: "Toto je obsah první záložky. Zde můžete zobrazit libovolný obsah — text, obrázky, tabulky nebo jiné komponenty.",
    icon: "①",
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
    label: "Záložka 5",
    title: "Pátá stránka",
    content: "Toto je obsah páté záložky. Tato sekce je připravena na váš obsah — kontakty, galerie nebo cokoli jiného.",
    icon: "⑤",
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState(1);

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ background: "var(--hero-gradient)" }}
    >
      {/* Hero – velký nápis TOM */}
      <header className="w-full flex flex-col items-center pt-16 pb-10 px-4">
        <h1
          className="tom-title font-bold tracking-widest select-none"
          style={{ fontSize: "clamp(5rem, 18vw, 14rem)", lineHeight: 1 }}
        >
          TOM
        </h1>
        <div
          className="mt-4 h-0.5 w-40 rounded-full"
          style={{ background: "var(--gold-gradient)" }}
        />
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
        <p
          className="text-lg leading-relaxed"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {current.content}
        </p>

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
    </div>
  );
};

export default Index;
