import { HStack, Show, SimpleGrid } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import Notifications from "./Notifications";
import PageTitle from "./PageTitle";
import ProfileButton from "./ProfileButton";
import SearchBox from "./SearchBox";
import SearchButton from "./SearchButton";

const AdminTitlebar = () => {
  const { pathname } = useLocation();
  const show = pathname !== "/admin/analysis";

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
        <PageTitle />
        <Show below="lg">{show && <SearchButton />}</Show>
      </HStack>
      <HStack
        justifyContent={{ base: "space-between", lg: "end" }}
        order={{ base: 1, lg: 2 }}
      >
        <Show below="lg">
          <HamburgerMenu />
        </Show>
        <HStack spacing={{ base: 2, lg: 5 }}>
          <Show above="lg">{show && <SearchBox />}</Show>
          <Notifications />
          <ProfileButton />
        </HStack>
      </HStack>
    </SimpleGrid>
  );
};

export default AdminTitlebar;
