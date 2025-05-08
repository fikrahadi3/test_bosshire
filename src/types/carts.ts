export type Product = {
  productId: number;
  quantity: number;
};

export type Cart = {
  id: number;
  userId: number;
  date: string;
  products: Product[];
};

export type GetCartsByIDReq = {
  id: number;
};
