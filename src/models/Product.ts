import Brand from "./Brand";
import Category from "./Category";

export default interface Product {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
  minimumQuantity: number;
  hidden: boolean;
  brand: Brand;
  category: Category;
  imageName: string | null;
}
