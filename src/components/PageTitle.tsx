import { Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import navigationData from "../data/navigationData";

const PageTitle = () => {
  const { pathname } = useLocation();

  const currentPage = navigationData.find(
    (page) => (page.url ? `/admin/${page.url}` : "/admin") === pathname
  );

  return (
    currentPage && (
      <Heading color="darkBlue" fontSize={{ base: 32, lg: 40 }}>
        {currentPage.label}
      </Heading>
    )
  );
};

export default PageTitle;
