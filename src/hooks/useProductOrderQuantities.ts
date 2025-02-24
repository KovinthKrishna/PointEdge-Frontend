import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import useProductOrderQueryStore from "../store/useProductOrderQueryStore";

export interface ProductOrderQuantity {
  productId: number;
  productName: string;
  totalQuantity: number;
  pricePerUnit: number;
}

const useProductOrderQuantities = () => {
  const productOrderQuery = useProductOrderQueryStore(
    (s) => s.productOrderQuery
  );
  return useQuery({
    queryKey: ["product-order-quantities", productOrderQuery],
    queryFn: () =>
      new APIClient<ProductOrderQuantity>("/orders/summary").getAll({
        params: productOrderQuery,
      }),
  });
};

export default useProductOrderQuantities;
