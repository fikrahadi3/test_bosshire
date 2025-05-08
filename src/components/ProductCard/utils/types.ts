import { ProductDetail } from "../../../types/carts";

export type ProductCardProps = ProductDetail & {
  isEditable: boolean;
  defaultCount?: number;
  handleAddProduct?: (
    productId: number,
    quantity: number,
    title: string,
    price: number
  ) => void;
};
