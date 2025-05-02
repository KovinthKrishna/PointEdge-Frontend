import { Text, VStack } from "@chakra-ui/react";
import LogoutButton from "./LogoutButton";
import ProfileMenuLink from "./ProfileMenuLink";

const ProfileMenu = () => {
  return (
    <VStack color="lightBlue" padding={2} spacing={4}>
      <Text color="darkBlue" fontSize={20}>
        Naruto Uzumaki
      </Text>
      <ProfileMenuLink label="Account Settings" />
      <LogoutButton />
    </VStack>
  );
};

export default ProfileMenu;
