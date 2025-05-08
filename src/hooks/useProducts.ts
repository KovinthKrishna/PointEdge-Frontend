import { useQuery } from "@tanstack/react-query";
import productService from "../services/productService";
import useProductQueryStore from "../store/useProductQueryStore";

const useProducts = (hidden?: boolean) => {
  const productQuery = useProductQueryStore((s) => s.productQuery);

  return useQuery({
    queryKey: ["products", { ...productQuery, hidden }],
    queryFn: () =>
      productService.getPaginated({
        params: { ...productQuery, hidden },
      }),
  });
};

export default useProducts;
