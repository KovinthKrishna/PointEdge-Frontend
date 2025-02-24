import { useLocation } from "react-router-dom";

const useExtractSecondPathSegment = () => {
  const { pathname } = useLocation();
  const parts = pathname.replace(/^\/+|\/+$/g, "").split("/");
  return parts.length > 1 ? parts[1] : "";
};

export default useExtractSecondPathSegment;
