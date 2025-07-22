import { Heading, HStack, IconButton } from "@chakra-ui/react";
import { IoTrashBin } from "react-icons/io5";
import { Notification } from "../../hooks/useNotifications";
import useRemoveNotification from "../../hooks/useRemoveNotification";
import theme from "../../theme";

interface Props {
  data: Notification[] | undefined;
}

const NotificationsPopoverHeader = ({ data }: Props) => {
  const removeNotification = useRemoveNotification();

  return (
    <HStack justifyContent="space-between">
      <Heading fontSize={24} color="darkBlue">
        Notifications
      </Heading>
      <IconButton
        aria-label="Clear all"
        icon={<IoTrashBin color={theme.colors.red} size={24} />}
        borderRadius="full"
        onClick={() => removeNotification.mutate(0)}
        isDisabled={!data || !data.length || removeNotification.isPending}
      />
    </HStack>
  );
};

export default NotificationsPopoverHeader;
