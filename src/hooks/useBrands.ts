import { useQuery } from "@tanstack/react-query";
import Brand from "../models/Brand";
import APIClient from "../services/apiClient";

const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: new APIClient<Brand>("/brands").getAll,
  });
};

export default useBrands;
