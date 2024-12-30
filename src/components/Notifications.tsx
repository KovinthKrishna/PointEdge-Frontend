import {
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa6";
import theme from "../theme";
import NotificationsPopupBody from "./NotificationsPopupBody";
import NotificationsPopupHeader from "./NotificationsPopupHeader";

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
          <NotificationsPopupHeader />
        </PopoverHeader>
        <PopoverBody>
          <NotificationsPopupBody />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
