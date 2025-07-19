import { Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePathSegment from "../hooks/usePathSegment";
import { fetchCurrentUser } from "../services/userService";
import LogoutButton from "./LogoutButton";
import ProfileMenuLink from "./ProfileMenuLink";

const ProfileMenu = () => {
  const [fullName, setFullName] = useState("");
  const path = usePathSegment(0);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchCurrentUser();
        console.log("User fetched:", user);
        setFullName(`${user.name}`);
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
      {localStorage.getItem("role") === "ADMIN" && (
        <Link to={path === "admin" ? "/dashboard" : "/admin"}>
          <ProfileMenuLink
            label={path === "admin" ? "Sales Portal" : "Manager Portal"}
          />
        </Link>
      )}
      <ProfileMenuLink label="Account Settings" />
      <LogoutButton />
    </VStack>
  );
};

export default ProfileMenu;
