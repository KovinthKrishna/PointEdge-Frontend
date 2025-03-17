import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { IoClose, IoSearch } from "react-icons/io5";
import useSearchStore from "../store/useSearchStore";
import theme from "../theme";

const SearchBox = () => {
  const search = useSearchStore((s) => s.search);
  const setSearch = useSearchStore((s) => s.setSearch);

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
      {search && (
        <InputRightElement cursor="pointer">
          <IoClose color={theme.colors.gray} onClick={() => setSearch("")} />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchBox;
