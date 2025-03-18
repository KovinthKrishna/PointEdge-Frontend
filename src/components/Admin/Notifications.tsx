import {
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa6";
import theme from "../../theme";
import NotificationsPopoverBody from "./NotificationsPopoverBody";
import NotificationsPopoverHeader from "./NotificationsPopoverHeader";

const Notifications = () => {
  return (
    <Popover offset={[0, 12]}>
      <PopoverTrigger>
        <IconButton
          aria-label="Notifications"
          icon={<FaBell color={theme.colors.lightBlue} size={24} />}
          borderRadius="full"
        />
      </PopoverTrigger>
      <PopoverContent
        width="fit-content"
        maxWidth={{ base: "calc(100vw - 16px)", lg: "none" }}
        border="2px"
        borderColor="lightBlue"
        marginX={{ base: 2, lg: 4 }}
      >
        <PopoverHeader borderBottom="2px" borderColor="lightBlue">
          <NotificationsPopoverHeader />
        </PopoverHeader>
        <PopoverBody>
          <NotificationsPopoverBody />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
