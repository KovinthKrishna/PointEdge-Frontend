import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

export interface Notification {
  id: number;
  message: string;
  read: boolean;
}

const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: new APIClient<Notification>("/notifications").getAll,
  });
};

export default useNotifications;
