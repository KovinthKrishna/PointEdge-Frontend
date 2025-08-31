import { create } from "zustand";
import { EmployeeInfo } from "../services/employeeInfoService";
import { persist } from "zustand/middleware"; 

interface EmployeeStore {
  employee: EmployeeInfo | null;
  setEmployee: (employee: EmployeeInfo) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
    persist(
      (set) => ({
        employee: null,
        setEmployee: (employee) => set({ employee }),
      }),
      {
        name: "employee-storage", // This key will be used in localStorage
      }
    )
  );