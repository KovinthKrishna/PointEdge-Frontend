import useBrands from "../../../hooks/useBrands";
import FormSelect from "./FormSelect";

const BrandSelector = () => {
  const { data: brandsData } = useBrands();

  return <FormSelect name="brand" fetchedOptions={brandsData ?? []} />;
};

export default BrandSelector;
