import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import Brand from "../models/Brand";
import APIClient from "../services/apiClient";

const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: new APIClient<Brand>("/brands").getAll,
    staleTime: ms("1d"),
  });
};

export default useBrands;
