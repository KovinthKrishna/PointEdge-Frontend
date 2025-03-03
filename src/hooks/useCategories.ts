import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import Category from "../models/Category";
import APIClient from "../services/apiClient";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: new APIClient<Category>("/categories").getAll,
    staleTime: ms("1d"),
  });
};

export default useCategories;
