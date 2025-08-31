import axiosInstance from "./verifyService";

export interface EmployeeInfo {
  id: number;
  name: string;
  role: string;
}

export const fetchCurrentEmployee = async (): Promise<EmployeeInfo> => {
  const response = await axiosInstance.get("/employees/me");
  return response.data;
};