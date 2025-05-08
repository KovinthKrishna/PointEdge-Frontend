import { useLocation } from "react-router-dom";

const usePathSegment = (index: number) => {
  const { pathname } = useLocation();
  const parts = pathname.replace(/^\/+|\/+$/g, "").split("/");

  return parts[index] || "";
};

export default usePathSegment;
