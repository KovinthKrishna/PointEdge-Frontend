import { useEffect } from "react";
import { fetchCurrentEmployee } from "../services/employeeInfoService";
import { useEmployeeStore } from "../store/useEmployeeStore";
import { useToast } from "@chakra-ui/react";

const useLoadEmployee = () => {
  const { setEmployee } = useEmployeeStore();
  const toast = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const emp = await fetchCurrentEmployee();
        setEmployee(emp);
      } catch (e) {
        toast({
          title: "Failed to load employee",
          description: "Please login again.",
          status: "error",
          isClosable: true,
        });
      }
    };
    load();
  }, [setEmployee, toast]);
};
export default useLoadEmployee;