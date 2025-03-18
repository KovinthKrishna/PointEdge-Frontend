import { Heading } from "@chakra-ui/react";
import navItems from "../../data/navItems";
import useExtractSecondPathSegment from "../../hooks/useExtractSecondPathSegment";

const PageTitle = () => {
  const path = useExtractSecondPathSegment();

  const currentPage = navItems.find((page) => page.url === path);

  return (
    currentPage && (
      <Heading color="darkBlue" fontSize={{ base: 32, lg: 40 }}>
        {currentPage.label}
      </Heading>
    )
  );
};

export default PageTitle;
