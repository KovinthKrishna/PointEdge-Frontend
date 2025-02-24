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
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import profilePicture from "../assets/profile-picture.jpg";
import theme from "../theme";
import ProfileMenu from "./ProfileMenu";

const ProfileButton = () => {
  const [menu, setMenu] = useState(false);

  return (
    <HStack
      padding={0.5}
      borderRadius="full"
      border="2px"
      borderColor="lightBlue"
      spacing={0}
    >
      <Box height={12} width={12} borderRadius="full" overflow="hidden">
        <Image src={profilePicture} />
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
