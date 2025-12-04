export type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
};

export type CartItem = Product & {
  qty: number;
};
