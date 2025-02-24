import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import useSearchStore from "../store/useSearchStore";
import theme from "../theme";

const SearchBox = () => {
  const { search, setSearch } = useSearchStore();

  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <IoSearch color={theme.colors.gray} />
      </InputLeftElement>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        _placeholder={{ color: "gray" }}
        _focus={{ borderColor: "lightBlue", boxShadow: "none" }}
        border="2px"
        borderColor="lightBlue"
        borderRadius="full"
        bgColor="white"
      />
    </InputGroup>
  );
};

export default SearchBox;
