import { Button, HStack, Select } from "@chakra-ui/react";
import { useState } from "react";
import Brand from "../../../models/Brand";
import Category from "../../../models/Category";
import useProductFormStore from "../../../store/useProductFormStore";
import AddNewOption from "./AddNewOption";

interface Props {
  name: "brand" | "category";
  fetchedOptions: (Brand | Category)[];
}

const FormSelect = ({ name, fetchedOptions }: Props) => {
  const [isAddNew, setIsAddNew] = useState(false);
  const [customOption, setCustomOption] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const options = [
    ...(fetchedOptions || []),
    ...(customOption ? [customOption] : []),
  ];

  const value = useProductFormStore((s) => s[name]);
  const setFormData = useProductFormStore((s) => s.setFormData);

  return (
    <HStack>
      {!isAddNew ? (
        <>
          <Select
            name={name}
            placeholder={`Select a ${name}`}
            value={value}
            onChange={(e) => setFormData(name, e.target.value)}
            borderRadius="full"
            border="2px"
            borderColor="darkBlue"
            bgColor="lightGray"
            _invalid={{ border: "2px", borderColor: "darkBlue" }}
          >
            {options?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
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
            onClick={() => setIsAddNew(true)}
          >
            New
          </Button>
        </>
      ) : (
        <AddNewOption
          name={name}
          setIsAddNew={setIsAddNew}
          setCustomOption={setCustomOption}
        />
      )}
    </HStack>
  );
};

export default FormSelect;
