import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();

  return {
    success: (message: string) =>
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        position: "top",
        containerStyle: {
          bgColor: "green",
          borderRadius: "10px",
        },
      }),

    error: (message: string) =>
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        position: "top",
        containerStyle: {
          bgColor: "red",
          borderRadius: "10px",
        },
      }),
  };
};

export default useCustomToast;
