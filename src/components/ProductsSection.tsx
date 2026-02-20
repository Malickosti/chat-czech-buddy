import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const products = [
  {
    id: 1,
    name: "Produkt 1",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Produkt 2",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Produkt 3",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Produkt 4",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
  },
];

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [formData, setFormData] = useState({ nazev: "", pocet: "", barva: "" });
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!formData.nazev || !formData.pocet || !formData.barva) {
      toast({ title: "Vyplňte všechna pole", variant: "destructive" });
      return;
    }

    console.log("Odeslaná data:", {
      produkt: selectedProduct?.name,
      ...formData,
      email: "ttom159@seznam.cz",
    });

    toast({
      title: "Objednávka přijata",
      description: `Produkt: ${selectedProduct?.name}, Název: ${formData.nazev}, Počet: ${formData.pocet}, Barva: ${formData.barva}. (Email zatím není odesílán)`,
    });

    setFormData({ nazev: "", pocet: "", barva: "" });
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-xl cursor-pointer group"
            style={{ border: "1px solid hsl(var(--border))" }}
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="p-2 text-center text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>
              {product.name}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle style={{ color: "hsl(var(--foreground))" }}>
              {selectedProduct?.name} — Objednávka
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <Label htmlFor="nazev">Název</Label>
              <Input
                id="nazev"
                placeholder="Zadejte název"
                value={formData.nazev}
                onChange={(e) => setFormData((f) => ({ ...f, nazev: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="pocet">Počet</Label>
              <Input
                id="pocet"
                type="number"
                min="1"
                placeholder="Zadejte počet"
                value={formData.pocet}
                onChange={(e) => setFormData((f) => ({ ...f, pocet: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="barva">Barva</Label>
              <Input
                id="barva"
                placeholder="Zadejte barvu"
                value={formData.barva}
                onChange={(e) => setFormData((f) => ({ ...f, barva: e.target.value }))}
              />
            </div>
            <Button onClick={handleSubmit} className="w-full mt-2">
              Odeslat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductsSection;
