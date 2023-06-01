export interface ProductItem {
  id: number;
  name: string;
  cost: number;
  details: string;
  image: string;
}
export type ProductList = ProductItem[];
