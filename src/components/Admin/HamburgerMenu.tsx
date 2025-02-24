import {
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import theme from "../../theme";
import Navbar from "./Navbar";

const HamburgerMenu = () => {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMenu(false), [pathname]);

  return (
    <Popover
      isOpen={menu}
      onOpen={() => setMenu(true)}
      onClose={() => setMenu(false)}
      placement="bottom-start"
      offset={[0, 12]}
    >
      <PopoverTrigger>
        <IconButton
          aria-label="Hamburger menu"
          icon={
            <GiHamburgerMenu
              color={menu ? theme.colors.white : theme.colors.lightBlue}
              size={32}
            />
          }
          bgColor={menu && theme.colors.lightBlue}
        />
      </PopoverTrigger>
      <PopoverContent
        width="fit-content"
        border="2px"
        borderColor="lightBlue"
        minWidth="240px"
      >
        <PopoverBody padding={0}>
          <Navbar />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default HamburgerMenu;
