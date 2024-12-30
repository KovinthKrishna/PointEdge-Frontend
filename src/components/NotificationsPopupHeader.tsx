import { Heading, HStack, IconButton } from "@chakra-ui/react";
import { IoTrashBin } from "react-icons/io5";
import theme from "../theme";

const NotificationsPopupHeader = () => {
  return (
    <HStack justifyContent="space-between">
      <Heading fontSize={24} color="darkBlue">
        Notifications
      </Heading>
      <IconButton
        aria-label="Clear all"
        icon={<IoTrashBin color={theme.colors.red} size={24} />}
        borderRadius="full"
      />
    </HStack>
  );
};

export default NotificationsPopupHeader;
