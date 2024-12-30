import { VStack } from "@chakra-ui/react";
import NotificationsBanner from "./NotificationsBanner";

const NotificationsPopupBody = () => {
  return (
    <VStack spacing={4}>
      <NotificationsBanner
        heading="Low stock alert"
        content="There are only 25 items of Product X in stock."
      />
      <NotificationsBanner
        heading="Sold out alert"
        content="Product Y is sold out."
      />
    </VStack>
  );
};

export default NotificationsPopupBody;
