export type ProductDetail = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
};

export type Product = {
  productId: number;
  quantity: number;
};

export type Cart = {
  id?: number;
  userId?: number;
  date?: string;
  products?: Product[];
};

export type GetCartsByIDReq = {
  id: number;
};

export type AddCartReq = {
  userId: number;
  products: Product[];
};
