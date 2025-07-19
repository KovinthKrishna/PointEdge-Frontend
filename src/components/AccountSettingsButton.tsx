import { Text } from "@chakra-ui/react";
import { useState } from "react";
import AccountSetting from "./Account/AccountSetting";

const AccountSettingsButton = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const handleOpen = () => setIsSettingsOpen(true);
  const handleClose = () => setIsSettingsOpen(false);

  return (
    <>
      <Text
        as="button"
        onClick={handleOpen}
        fontSize={20}
        _hover={{ textDecoration: "underline" }}
      >
        Account Settings
      </Text>
      <AccountSetting isOpen={isSettingsOpen} onClose={handleClose} />
    </>
  );
};

export default AccountSettingsButton;
