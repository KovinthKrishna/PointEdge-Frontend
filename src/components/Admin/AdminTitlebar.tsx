import { Hide, HStack, Show, SimpleGrid } from "@chakra-ui/react";
import useExtractSecondPathSegment from "../../hooks/useExtractSecondPathSegment";
import ProfileButton from "../ProfileButton";
import SearchBox from "../SearchBox";
import HamburgerMenu from "./HamburgerMenu";
import Notifications from "./Notifications";
import PageTitle from "./PageTitle";
import SearchButton from "./SearchButton";

const AdminTitlebar = () => {
  const show = useExtractSecondPathSegment() !== "analysis";

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
        <Hide above="lg">{show && <SearchButton />}</Hide>
      </HStack>
      <HStack
        justifyContent={{ base: "space-between", lg: "end" }}
        order={{ base: 1, lg: 2 }}
      >
        <Hide above="lg">
          <HamburgerMenu />
        </Hide>
        <HStack
          spacing={{ base: 2, lg: 5 }}
          width={{ base: "auto", lg: "full" }}
        >
          <Show above="lg">{show && <SearchBox />}</Show>
          <Notifications />
          <ProfileButton />
        </HStack>
      </HStack>
    </SimpleGrid>
  );
};

export default AdminTitlebar;
