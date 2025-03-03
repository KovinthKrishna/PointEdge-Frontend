import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import Product from "../models/Product";
import APIClient from "../services/apiClient";
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
      new APIClient<Product>("/products").getAll({
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
