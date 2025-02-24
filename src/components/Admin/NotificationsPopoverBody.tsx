import { VStack } from "@chakra-ui/react";
import NotificationBanner from "./NotificationBanner";

const NotificationsPopoverBody = () => {
  return (
    <VStack spacing={2}>
      <NotificationBanner
        heading="Low stock alert"
        content="There are only 25 items of Product X in stock."
      />
      <NotificationBanner
        heading="Sold out alert"
        content="Product Y is sold out."
      />
    </VStack>
  );
};

export default NotificationsPopoverBody;
