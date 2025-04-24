import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../services/apiClient";
import useProductQueryStore from "../store/useProductQueryStore";
import useSearchStore from "../store/useSearchStore";

export interface ProductOrderQuantity {
  productId: number;
  productName: string;
  totalQuantity: number;
  pricePerUnit: number;
  imageName: string | null;
}

const useProductOrderQuantities = () => {
  const productQuery = useProductQueryStore((s) => s.productQuery);
  const searchTerm = useSearchStore((s) => s.search)
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

  const { data, ...queryInfo } = useQuery({
    queryKey: ["product-order-quantities", productQuery],
    queryFn: () =>
      new APIClient<ProductOrderQuantity>("/orders/summary").getAll({
        params: productQuery,
      }),
    staleTime: ms("5m"),
  });

  const filteredData = data?.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm)
  );

  return { data: filteredData, ...queryInfo };
};

export default useProductOrderQuantities;
