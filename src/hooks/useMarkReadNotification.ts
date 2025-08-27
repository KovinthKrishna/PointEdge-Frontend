import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../services/apiClient";
import useCustomToast from "./useCustomToast";

const useMarkReadNotification = () => {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  return useMutation({
    mutationFn: (id: number) =>
      axios.put(`${baseURL}/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Marked as read");
    },
    onError: () => {
      toast.error("Could not mark read");
    },
  });
};

export default useMarkReadNotification;
