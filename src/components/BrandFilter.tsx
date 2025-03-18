import useBrands from "../hooks/useBrands";
import useProductQueryStore from "../store/useProductQueryStore";
import FilterMenu from "./FilterMenu";

const BrandFilter = () => {
  const { data: brandsData } = useBrands();
  const brandId = useProductQueryStore((s) => s.productQuery.brandId);
  const setBrandId = useProductQueryStore((s) => s.setBrandId);

  return (
    <FilterMenu
      filterType="Brand"
      options={brandsData ?? []}
      selectedOptionId={brandId}
      setSelectedOptionId={setBrandId}
    />
  );
};

export default BrandFilter;
