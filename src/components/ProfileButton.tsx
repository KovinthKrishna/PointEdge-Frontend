import {
  Box,
  HStack,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import profilePicture from "../assets/profile-picture.jpg";
import theme from "../theme";
import ProfileMenu from "./ProfileMenu";
import { fetchCurrentUser } from "../services/userService";

const ProfileButton = () => {
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState<{ avatar?: string } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    getUser();
  }, []);

  return (
    <HStack
      padding={0.5}
      borderRadius="full"
      border="2px"
      borderColor="lightBlue"
      spacing={0}
    >
      <Box height={12} width={12} borderRadius="full" overflow="hidden">
        <Image
          src={user?.avatar || profilePicture}
          height="100%"
          width="100%"
          objectFit="cover"
        />
      </Box>
      <Popover
        onOpen={() => setMenu(true)}
        onClose={() => setMenu(false)}
        placement="bottom-end"
      >
        <PopoverTrigger>
          <IconButton
            aria-label="Toggle menu"
            boxSize={12}
            borderRadius="full"
            icon={
              menu ? (
                <FaChevronUp size={20} color={theme.colors.lightBlue} />
              ) : (
                <FaChevronDown size={20} color={theme.colors.lightBlue} />
              )
            }
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            width="fit-content"
            border="2px"
            borderColor="lightBlue"
          >
            <PopoverBody>
              <ProfileMenu />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </HStack>
  );
};

export default ProfileButton;
