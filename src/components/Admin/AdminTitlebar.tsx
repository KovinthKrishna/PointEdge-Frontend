import { Heading, Hide, HStack, Show, SimpleGrid } from "@chakra-ui/react";
import navItems from "../../data/navItems";
import usePathSegment from "../../hooks/usePathSegment";
import ProfileButton from "../ProfileButton";
import SearchBox from "../SearchBox";
import HamburgerMenu from "./HamburgerMenu";
import Notifications from "./Notifications";
import SearchButton from "./SearchButton";

const AdminTitlebar = () => {
  const path = usePathSegment(1);
  const currentPage = navItems.find((page) => page.url === path);

  return (
    <SimpleGrid
      padding={{ base: 2, lg: 4 }}
      height={{ lg: 120 }}
      borderBottom="2px"
      borderColor="lightBlue"
      columns={{ base: 1, lg: 2 }}
      spacing={2}
    >
      <HStack justifyContent="space-between" order={{ base: 2, lg: 1 }}>
        <Heading color="darkBlue" fontSize={{ base: 32, lg: 40 }}>
          {currentPage?.label}
        </Heading>
        <Hide above="lg">{currentPage?.isSearchable && <SearchButton />}</Hide>
      </HStack>
      <HStack justifyContent="space-between" order={{ base: 1, lg: 2 }}>
        <Hide above="lg">
          <HamburgerMenu />
        </Hide>
        <HStack
          spacing={{ base: 2, lg: 5 }}
          width={{ base: "auto", lg: "full" }}
          justifyContent="end"
        >
          <Show above="lg">{currentPage?.isSearchable && <SearchBox />}</Show>
          <Notifications />
          <ProfileButton />
        </HStack>
      </HStack>
    </SimpleGrid>
  );
};

export default AdminTitlebar;
