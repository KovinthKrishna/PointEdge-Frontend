import {
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import theme from "../../theme";
import SearchBox from "../SearchBox";

const SearchButton = () => {
  return (
    <Popover placement="bottom-end" offset={[0, 16]}>
      <PopoverTrigger>
        <IconButton
          aria-label="Search"
          icon={<IoSearch color={theme.colors.lightBlue} size={24} />}
          borderRadius="full"
        />
      </PopoverTrigger>
      <PopoverContent
        border="none"
        bgColor="transparent"
        width="calc(100vw - 16px)"
      >
        <PopoverBody padding={0}>
          <SearchBox />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SearchButton;
