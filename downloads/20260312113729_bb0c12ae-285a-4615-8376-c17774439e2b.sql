
CREATE TABLE public.expression_of_interest (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  country_code TEXT NOT NULL DEFAULT '+91',
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  moving_interest TEXT NOT NULL,
  receive_updates BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Allow anonymous inserts (public form, no auth required)
ALTER TABLE public.expression_of_interest ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts"
ON public.expression_of_interest
FOR INSERT
TO anon
WITH CHECK (true);
