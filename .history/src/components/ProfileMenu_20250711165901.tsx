import { useEffect, useState } from "react";
import { Text, VStack } from "@chakra-ui/react";
import LogoutButton from "./LogoutButton";
import ProfileMenuLink from "./ProfileMenuLink";
import { fetchCurrentUser } from "../services/userService";

const ProfileMenu = () => {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchCurrentUser();
        console.log("User fetched:", user);
        setFullName(`${user.firstName} ${user.lastName}`);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <VStack color="lightBlue" padding={2} spacing={4}>
      <Text color="darkBlue" fontSize={20}>
        {fullName || "Loading..."}
      </Text>
      <ProfileMenuLink label="Account Settings" />
      <LogoutButton />
    </VStack>
  );
};

export default ProfileMenu;
