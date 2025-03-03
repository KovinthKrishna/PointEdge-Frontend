import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useProductFormStore from "../../../store/useProductFormStore";

interface Props {
  name: "brand" | "category";
  setIsAddNew: (value: boolean) => void;
  setCustomOption: (value: { id: string; name: string }) => void;
}

const AddNewOption = ({ name, setIsAddNew, setCustomOption }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const setFormData = useProductFormStore((s) => s.setFormData);

  const handleAddOption = () => {
    if (inputValue.trim()) {
      const formattedName = inputValue.trim().replace(/\s+/g, " ");
      setCustomOption({ id: formattedName, name: formattedName });
      setFormData(name, formattedName);
      setInputValue("");
    }
    setIsAddNew(false);
  };

  return (
    <>
      <Input
        placeholder={`Enter new ${name}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        borderRadius="full"
        border="2px"
        borderColor="darkBlue"
        bgColor="lightGray"
        _placeholder={{ color: "gray" }}
        _invalid={{ borderColor: "red" }}
      />
      <Button
        variant="outline"
        color="darkBlue"
        border="2px"
        _hover={{
          bg: "darkBlue",
          color: "white",
          borderColor: "darkBlue",
        }}
        minWidth={16}
        onClick={handleAddOption}
      >
        Add
      </Button>
    </>
  );
};

export default AddNewOption;
