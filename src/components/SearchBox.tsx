import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import useProductQueryStore from "../store/useProductQueryStore";
import theme from "../theme";

const SearchBox = () => {
  const { pathname } = useLocation();
  const setSearch = useProductQueryStore((s) => s.setSearch);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
    setSearch();
  }, [pathname, setSearch]);

  const handleSearch = () => {
    const cleaned = inputValue.trim().replace(/\s+/g, " ");
    if (cleaned !== "") {
      setSearch(cleaned);
    }
  };

  return (
    <InputGroup size="lg">
      <InputLeftElement cursor="pointer" onClick={handleSearch}>
        <IoSearch
          color={inputValue.trim() ? theme.colors.lightBlue : theme.colors.gray}
        />
      </InputLeftElement>
      <Input
        value={inputValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search"
        _placeholder={{ color: "gray" }}
        _focus={{ borderColor: "lightBlue", boxShadow: "none" }}
        border="2px"
        borderColor="lightBlue"
        borderRadius="full"
        bgColor="white"
      />
      {inputValue && (
        <InputRightElement
          cursor="pointer"
          onClick={() => {
            setInputValue("");
            setSearch();
          }}
        >
          <IoClose color={theme.colors.gray} />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchBox;
