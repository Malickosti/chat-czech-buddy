import { useState } from "react";

const MapSection = () => {
  const [start, setStart] = useState("Brno");
  const [end, setEnd] = useState("Zbýšov, okres Vyškov");
  const [mapUrl, setMapUrl] = useState(
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d41600!2d16.7!3d49.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x4712943ac03f21ad%3A0x400af0f6614b1b0!2sBrno!3m2!1d49.1950602!2d16.6068371!4m5!1s0x47129f0a2b2b2b2b%3A0x400af0f6614b580!2sZb%C3%BD%C5%A1ov%2C%20okres%20Vy%C5%A1kov!3m2!1d49.1483!2d16.8833!5e0!3m2!1scs!2scz!4v1700000000000"
  );

  const handleSearch = () => {
    if (!start.trim() || !end.trim()) return;
    const origin = encodeURIComponent(start.trim());
    const destination = encodeURIComponent(end.trim());
    const url = `https://www.google.com/maps/embed/v1/directions?key=&origin=${origin}&destination=${destination}&mode=driving`;
    // Without API key, use the regular embed approach
    const fallbackUrl = `https://www.google.com/maps?saddr=${origin}&daddr=${destination}&output=embed`;
    setMapUrl(fallbackUrl);
  };

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label
            className="text-sm font-medium"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Start
          </label>
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Zadejte výchozí místo..."
            className="w-full h-10 rounded-lg px-3 text-sm outline-none transition-colors"
            style={{
              background: "hsl(var(--muted))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label
            className="text-sm font-medium"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Cíl
          </label>
          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="Zadejte cílové místo..."
            className="w-full h-10 rounded-lg px-3 text-sm outline-none transition-colors"
            style={{
              background: "hsl(var(--muted))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="h-10 px-6 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            Najít trasu
          </button>
        </div>
      </div>
      <div
        className="w-full rounded-xl overflow-hidden"
        style={{ border: "1px solid hsl(var(--border))" }}
      >
        <iframe
          src={mapUrl}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa s trasou"
        />
      </div>
    </div>
  );
};

export default MapSection;
