import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import productService from "../services/productService";
import useProductQueryStore from "../store/useProductQueryStore";
import useSearchStore from "../store/useSearchStore";

const useProducts = (hidden?: boolean) => {
  const productQuery = useProductQueryStore((s) => s.productQuery);
  const searchTerm = useSearchStore((s) => s.search)
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

  const { data, ...queryInfo } = useQuery({
    queryKey: ["products", { ...productQuery, hidden }],
    queryFn: () =>
      productService.getAll({
        params: { ...productQuery, hidden },
      }),
    staleTime: ms("1h"),
  });

  const filteredData = data?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  return { data: filteredData, ...queryInfo };
};

export default useProducts;
