import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useProductQueryStore from "../store/useProductQueryStore";
import useSearchStore from "../store/useSearchStore";

const useExtractSecondPathSegment = () => {
  const { pathname } = useLocation();
  const productQueryReset = useProductQueryStore((s) => s.resetAll);
  const setSearch = useSearchStore((s) => s.setSearch);

  useEffect(() => {
    productQueryReset();
    setSearch("");
  }, [pathname, productQueryReset, setSearch]);

  const parts = pathname.replace(/^\/+|\/+$/g, "").split("/");
  return parts.length > 1 ? parts[1] : "";
};

export default useExtractSecondPathSegment;
