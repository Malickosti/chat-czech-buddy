
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  produkt TEXT NOT NULL,
  nazev TEXT NOT NULL,
  pocet TEXT NOT NULL,
  barva TEXT NOT NULL,
  vyrizeno BOOLEAN NOT NULL DEFAULT false,
  datum TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Public insert (anyone can place an order)
CREATE POLICY "Anyone can insert orders" ON public.orders FOR INSERT WITH CHECK (true);

-- Public select (password check is on frontend)
CREATE POLICY "Anyone can read orders" ON public.orders FOR SELECT USING (true);

-- Public update for marking as done
CREATE POLICY "Anyone can update orders" ON public.orders FOR UPDATE USING (true);

-- Public delete
CREATE POLICY "Anyone can delete orders" ON public.orders FOR DELETE USING (true);
