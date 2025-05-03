import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../services/apiClient";
import useProductQueryStore from "../store/useProductQueryStore";

export interface ProductOrderQuantity {
  productId: number;
  productName: string;
  totalQuantity: number;
  pricePerUnit: number;
  imageName: string | null;
}

const useProductOrderQuantities = () => {
  const productQuery = useProductQueryStore((s) => s.productQuery);

  return useQuery({
    queryKey: ["product-order-quantities", productQuery],
    queryFn: () =>
      new APIClient<ProductOrderQuantity>("/orders/summary").getPaginated({
        params: productQuery,
      }),
    staleTime: ms("5m"),
  });
};

export default useProductOrderQuantities;
