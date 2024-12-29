import { Text, VStack } from "@chakra-ui/react";
import LogoutButton from "./LogoutButton";
import ProfileMenuLinks from "./ProfileMenuLinks";

const ProfileMenu = () => {
  return (
    <VStack color="lightBlue" paddingX={4} paddingY={4} spacing={6}>
      <Text color="darkBlue" fontSize={20}>
        Naruto Uzumaki
      </Text>
      <ProfileMenuLinks label="Account Settings" />
      <LogoutButton />
    </VStack>
  );
};

export default ProfileMenu;
