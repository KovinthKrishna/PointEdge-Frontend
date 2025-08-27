import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa6";
import { IoMdRemoveCircle } from "react-icons/io";
import Brand from "../models/Brand";
import Category from "../models/Category";

interface Props {
  filterType: "Brand" | "Category";
  options: (Brand | Category)[];
  selectedOptionId?: number;
  setSelectedOptionId: (id?: number) => void;
}

const FilterMenu = ({
  filterType,
  options,
  selectedOptionId,
  setSelectedOptionId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(
    (option) => option.id === selectedOptionId
  );

  return (
    <Menu
      placement="bottom-end"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <MenuButton
        as={Button}
        rightIcon={selectedOption ? <IoMdRemoveCircle /> : <FaCaretDown />}
        bg={selectedOption ? "gray" : "darkBlue"}
        color="white"
        textAlign="left"
        onClick={() => {
          if (selectedOption) {
            setSelectedOptionId();
          } else {
            setIsOpen(true);
          }
        }}
      >
        {selectedOption ? selectedOption.name : `By ${filterType}`}
      </MenuButton>
      <MenuList border="2px" borderColor="darkBlue">
        {options.length > 0 ? (
          options.map((option) => (
            <MenuItem
              key={option.id}
              onClick={() => setSelectedOptionId(option.id)}
              color="darkBlue"
              _hover={{ bg: "darkBlue", color: "white" }}
            >
              {option.name}
            </MenuItem>
          ))
        ) : (
          <Text textAlign="center">No options available</Text>
        )}
      </MenuList>
    </Menu>
  );
};

export default FilterMenu;
