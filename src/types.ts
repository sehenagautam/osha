export type Variant = {
  id: string;
  color: string;
  price: number;
  image: string;
  description?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  material: string;
  sizes: string[];
  variants: Variant[];
};

export type CartItem = {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  color: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
};
