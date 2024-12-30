import { Heading, HStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Notifications from "./Notifications";
import ProfileButton from "./ProfileButton";
import SearchBox from "./SearchBox";

const AdminTitlebar = () => {
  const { pathname } = useLocation();
  const show = pathname !== "/admin/analysis";

  return (
    <HStack
      justifyContent="space-between"
      padding={5}
      height={{ lg: 120 }}
      borderBottom="2px"
      borderColor="lightBlue"
    >
      <Heading color="darkBlue" fontSize={40}>
        Dashboard
      </Heading>
      <HStack spacing={5}>
        {show && <SearchBox />}
        <Notifications />
        <ProfileButton />
      </HStack>
    </HStack>
  );
};

export default AdminTitlebar;
