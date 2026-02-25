import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface Order {
  id: number;
  produkt: string;
  nazev: string;
  pocet: string;
  barva: string;
  datum: string;
}

const getOrders = (): Order[] => {
  try {
    return JSON.parse(localStorage.getItem("orders") || "[]");
  } catch {
    return [];
  }
};

export const addOrder = (order: Omit<Order, "id" | "datum">) => {
  const orders = getOrders();
  orders.push({ ...order, id: Date.now(), datum: new Date().toLocaleString("cs-CZ") });
  localStorage.setItem("orders", JSON.stringify(orders));
};

const OrdersDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const orders = authenticated ? getOrders() : [];

  const handleLogin = () => {
    if (password === "123456") {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleClose = (v: boolean) => {
    if (!v) {
      setAuthenticated(false);
      setPassword("");
      setError(false);
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ color: "hsl(var(--foreground))" }}>Objednávky</DialogTitle>
        </DialogHeader>

        {!authenticated ? (
          <div className="flex flex-col gap-3 mt-2">
            <Label htmlFor="admin-pass">Zadejte heslo</Label>
            <Input
              id="admin-pass"
              type="password"
              placeholder="Heslo"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            {error && <p className="text-sm" style={{ color: "hsl(var(--destructive))" }}>Nesprávné heslo</p>}
            <Button onClick={handleLogin}>Potvrdit</Button>
          </div>
        ) : orders.length === 0 ? (
          <p style={{ color: "hsl(var(--muted-foreground))" }}>Zatím žádné objednávky.</p>
        ) : (
          <div className="flex flex-col gap-3 mt-2">
            {orders.map((o) => (
              <div
                key={o.id}
                className="rounded-lg p-3 text-sm flex flex-col gap-1"
                style={{ background: "hsl(var(--secondary))", border: "1px solid hsl(var(--border))" }}
              >
                <div className="font-semibold" style={{ color: "hsl(var(--primary))" }}>{o.produkt}</div>
                <div style={{ color: "hsl(var(--foreground))" }}>Název: {o.nazev} · Počet: {o.pocet} · Barva: {o.barva}</div>
                <div style={{ color: "hsl(var(--muted-foreground))" }}>{o.datum}</div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrdersDialog;
