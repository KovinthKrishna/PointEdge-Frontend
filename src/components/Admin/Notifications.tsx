import {
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa6";
import useNotifications, { Notification } from "../../hooks/useNotifications";
import theme from "../../theme";
import NotificationsPopoverBody from "./NotificationsPopoverBody";
import NotificationsPopoverHeader from "./NotificationsPopoverHeader";

const getUnreadCount = (notifications: Notification[]): number =>
  notifications.reduce((sum, n) => sum + (n.read ? 0 : 1), 0);

const Notifications = () => {
  const { data } = useNotifications();

  return (
    <Popover offset={[0, 12]}>
      <PopoverTrigger>
        <IconButton
          aria-label="Notifications"
          icon={
            <FaBell
              color={
                data && data.length && getUnreadCount(data)
                  ? theme.colors.lightBlue
                  : theme.colors.gray
              }
              size={24}
            />
          }
          borderRadius="full"
        />
      </PopoverTrigger>
      <PopoverContent
        width="fit-content"
        minWidth={300}
        maxWidth={{ base: "calc(100vw - 16px)", lg: "none" }}
        border="2px"
        borderColor="lightBlue"
        marginX={{ base: 2, lg: 4 }}
      >
        <PopoverHeader borderBottom="2px" borderColor="lightBlue">
          <NotificationsPopoverHeader data={data} />
        </PopoverHeader>
        <PopoverBody>
          <NotificationsPopoverBody data={data} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
