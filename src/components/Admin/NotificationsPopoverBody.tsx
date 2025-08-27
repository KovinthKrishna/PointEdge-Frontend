import { Text, VStack } from "@chakra-ui/react";
import { Notification } from "../../hooks/useNotifications";
import NotificationBanner from "./NotificationBanner";

interface Props {
  data: Notification[] | undefined;
}

const NotificationsPopoverBody = ({ data }: Props) => {
  if (!data || !data.length) {
    return (
      <Text textAlign="center" padding={4}>
        No notifications
      </Text>
    );
  }

  return (
    <VStack spacing={2} align="stretch">
      {data.map((n) => {
        return <NotificationBanner key={n.id} notification={n} />;
      })}
    </VStack>
  );
};

export default NotificationsPopoverBody;
