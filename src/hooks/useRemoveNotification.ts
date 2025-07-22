import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../services/apiClient";
import useCustomToast from "./useCustomToast";

const useRemoveNotification = () => {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  return useMutation({
    mutationFn: (id: number) => axios.delete(`${baseURL}/notifications/${id}`),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(
        variables === 0 ? "All notifications deleted" : "Notification deleted"
      );
    },
    onError: () => {
      toast.error("Could not delete");
    },
  });
};

export default useRemoveNotification;
