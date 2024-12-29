import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import theme from "../theme";

const SearchBox = () => {
  return (
    <InputGroup size="lg" maxWidth={320}>
      <InputLeftElement pointerEvents="none">
        <IoSearch color={theme.colors.gray} />
      </InputLeftElement>
      <Input
        placeholder="Search"
        _placeholder={{ color: "gray" }}
        _focus={{ borderColor: "lightBlue", boxShadow: "none" }}
        border="2px"
        borderColor="lightBlue"
        borderRadius="full"
      />
    </InputGroup>
  );
};

export default SearchBox;
