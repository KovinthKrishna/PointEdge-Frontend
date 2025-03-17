import { Input } from "@chakra-ui/react";
import useProductFormErrorStore from "../../../store/useProductFormErrorStore";
import useProductFormStore from "../../../store/useProductFormStore";

interface Props {
  name: "name" | "price" | "quantity" | "minimum";
}

const FormInput = ({ name }: Props) => {
  const value = useProductFormStore((s) => s[name]);
  const setFormData = useProductFormStore((s) => s.setFormData);
  const setFormError = useProductFormErrorStore((s) => s.setFormError);

  return (
    <Input
      name={name}
      placeholder={`Enter the ${name}`}
      value={value}
      onChange={(e) => {
        setFormData(name, e.target.value);
        setFormError(name, "");
      }}
      borderRadius="full"
      border="2px"
      borderColor="darkBlue"
      bgColor="lightGray"
      _placeholder={{ color: "gray" }}
      _invalid={{ borderColor: "darkBlue" }}
    />
  );
};

export default FormInput;
