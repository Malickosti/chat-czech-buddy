import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Order {
  id: string;
  produkt: string;
  nazev: string;
  pocet: string;
  barva: string;
  vyrizeno: boolean;
  datum: string;
}

export const addOrder = async (order: { produkt: string; nazev: string; pocet: string; barva: string }) => {
  await supabase.from("orders").insert(order);
};

const OrdersDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("datum", { ascending: false });
    setOrders((data as Order[]) || []);
  };

  useEffect(() => {
    if (authenticated && open) fetchOrders();
  }, [authenticated, open]);

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
      setDeletingId(null);
      setDeletePassword("");
      setDeleteError(false);
    }
    onOpenChange(v);
  };

  const toggleVyrizeno = async (id: string, current: boolean) => {
    await supabase.from("orders").update({ vyrizeno: !current }).eq("id", id);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, vyrizeno: !current } : o)));
  };

  const handleDelete = async () => {
    if (deletePassword !== "123456") {
      setDeleteError(true);
      return;
    }
    if (!deletingId) return;
    await supabase.from("orders").delete().eq("id", deletingId);
    setOrders((prev) => prev.filter((o) => o.id !== deletingId));
    setDeletingId(null);
    setDeletePassword("");
    setDeleteError(false);
    toast({ title: "Objednávka smazána" });
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
                className={`rounded-lg p-3 text-sm flex flex-col gap-2 ${o.vyrizeno ? "opacity-60" : ""}`}
                style={{ background: "hsl(var(--secondary))", border: "1px solid hsl(var(--border))" }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold" style={{ color: "hsl(var(--primary))" }}>{o.produkt}</div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                      <Checkbox
                        checked={o.vyrizeno}
                        onCheckedChange={() => toggleVyrizeno(o.id, o.vyrizeno)}
                      />
                      Vyřízeno
                    </label>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={() => { setDeletingId(o.id); setDeletePassword(""); setDeleteError(false); }}
                    >
                      Smazat
                    </Button>
                  </div>
                </div>
                <div style={{ color: "hsl(var(--foreground))" }}>
                  Název: {o.nazev} · Počet: {o.pocet} · Barva: {o.barva}
                </div>
                <div style={{ color: "hsl(var(--muted-foreground))" }}>
                  {new Date(o.datum).toLocaleString("cs-CZ")}
                </div>

                {deletingId === o.id && (
                  <div className="flex items-center gap-2 mt-1 p-2 rounded" style={{ background: "hsl(var(--background))" }}>
                    <Input
                      type="password"
                      placeholder="Heslo pro smazání"
                      value={deletePassword}
                      onChange={(e) => { setDeletePassword(e.target.value); setDeleteError(false); }}
                      onKeyDown={(e) => e.key === "Enter" && handleDelete()}
                      className="h-8 text-sm"
                    />
                    <Button size="sm" variant="destructive" className="h-8" onClick={handleDelete}>OK</Button>
                    <Button size="sm" variant="ghost" className="h-8" onClick={() => setDeletingId(null)}>✕</Button>
                    {deleteError && <span className="text-xs" style={{ color: "hsl(var(--destructive))" }}>Špatné heslo</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrdersDialog;
