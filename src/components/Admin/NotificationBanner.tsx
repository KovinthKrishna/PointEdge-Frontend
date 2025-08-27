import { Heading, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { IoIosRemoveCircle, IoMdDoneAll } from "react-icons/io";
import useMarkReadNotification from "../../hooks/useMarkReadNotification";
import { Notification } from "../../hooks/useNotifications";
import useRemoveNotification from "../../hooks/useRemoveNotification";
import theme from "../../theme";

interface Props {
  notification: Notification;
}

const NotificationBanner = ({ notification }: Props) => {
  const markReadNotification = useMarkReadNotification();
  const removeNotification = useRemoveNotification();

  return (
    <HStack
      width="full"
      justifyContent="space-between"
      spacing={2}
      borderBottom="1px"
      borderColor="gray"
    >
      <VStack alignItems="start" spacing={2}>
        <Heading fontSize={20} color={notification.read ? "gray" : "darkBlue"}>
          {notification.message.endsWith("sold out.")
            ? "Sold out alert"
            : "Low stock alert"}
        </Heading>
        <Text color="black">{notification.message}</Text>
      </VStack>
      <VStack spacing={0}>
        <IconButton
          aria-label="Mark as read"
          icon={<IoMdDoneAll color={theme.colors.green} size={20} />}
          borderRadius="full"
          onClick={() => markReadNotification.mutate(notification.id)}
          isDisabled={notification.read || markReadNotification.isPending}
        />
        <IconButton
          aria-label="Remove"
          icon={<IoIosRemoveCircle color={theme.colors.red} size={20} />}
          borderRadius="full"
          onClick={() => removeNotification.mutate(notification.id)}
          isDisabled={removeNotification.isPending}
        />
      </VStack>
    </HStack>
  );
};

export default NotificationBanner;
