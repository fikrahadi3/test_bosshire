import { Product } from "../../../../../types/carts";

export const isLessThanZero = (quantity: number) => quantity <= 0;

export const isDuplicate = (productId: number, datas: Product[]) => {
  return datas.some((item) => item.productId === productId);
};

export const renderPrice = (value: string) => {
  return `$ ${value}`;
};
