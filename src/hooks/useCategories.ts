import { useQuery } from "@tanstack/react-query";
import Category from "../models/Category";
import APIClient from "../services/apiClient";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: new APIClient<Category>("/categories").getAll,
  });
};

export default useCategories;
