import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import useProductQueryStore from "../store/useProductQueryStore";
import useSearchStore from "../store/useSearchStore";

export interface ProductOrderQuantity {
  productId: number;
  productName: string;
  totalQuantity: number;
  pricePerUnit: number;
}

const useProductOrderQuantities = () => {
  const productOrderQuery = useProductQueryStore((s) => s.productQuery);
  const searchTerm = useSearchStore((s) => s.search)
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

  const { data, ...queryInfo } = useQuery({
    queryKey: ["product-order-quantities", productOrderQuery],
    queryFn: () =>
      new APIClient<ProductOrderQuantity>("/orders/summary").getAll({
        params: productOrderQuery,
      }),
  });

  const filteredData = data?.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm)
  );

  return { data: filteredData, ...queryInfo };
};

export default useProductOrderQuantities;
