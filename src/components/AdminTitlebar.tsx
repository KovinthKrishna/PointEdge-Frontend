import { Heading, HStack } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa6";
import theme from "../theme";
import ProfileButton from "./ProfileButton";
import SearchBox from "./SearchBox";

const AdminTitlebar = () => {
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
        <SearchBox />
        <FaBell color={theme.colors.lightBlue} size={30} />
        <ProfileButton />
      </HStack>
    </HStack>
  );
};

export default AdminTitlebar;
