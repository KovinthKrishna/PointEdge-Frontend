import { Input } from "@chakra-ui/react";
import useProductFormStore from "../../../store/useProductFormStore";

interface Props {
  name: "name" | "price" | "quantity";
}

const FormInput = ({ name }: Props) => {
  const value = useProductFormStore((s) => s[name]);
  const setFormData = useProductFormStore((s) => s.setFormData);

  return (
    <Input
      name={name}
      placeholder={`Enter the ${name}`}
      value={value}
      onChange={(e) => setFormData(name, e.target.value)}
      borderRadius="full"
      border="2px"
      borderColor="darkBlue"
      bgColor="lightGray"
      _placeholder={{ color: "gray" }}
      _invalid={{ border: "2px", borderColor: "darkBlue" }}
    />
  );
};

export default FormInput;
