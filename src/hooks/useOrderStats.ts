import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../services/apiClient";
import useProductQueryStore from "../store/useProductQueryStore";

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
}

const useOrderStats = () => {
  const { brandId, categoryId, startDate, endDate } = useProductQueryStore(
    (s) => s.productQuery
  );

  const statsParams = { brandId, categoryId, startDate, endDate };

  return useQuery({
    queryKey: ["order-stats", statsParams],
    queryFn: () =>
      new APIClient<OrderStats>("/orders/stats").get({
        params: statsParams,
      }),
    staleTime: ms("5m"),
  });
};

export default useOrderStats;
