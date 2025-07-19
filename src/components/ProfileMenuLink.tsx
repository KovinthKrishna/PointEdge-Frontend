import { Text, Button } from "@chakra-ui/react";
import AccountSetting from "./Account/AccountSetting";
import { useState } from "react";

interface Props {
  label: string;
}

const ProfileMenuLink = ({ label }: Props) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleOpen = () => setIsSettingsOpen(true);
  const handleClose = () => setIsSettingsOpen(false);

  return (
    <>
      <Button variant="ghost" onClick={handleOpen}>
        <Text fontSize={20} _hover={{ textDecoration: "underline" }}>
          {label}
        </Text>
      </Button>
      <AccountSetting isOpen={isSettingsOpen} onClose={handleClose} />
    </>
  );
};

export default ProfileMenuLink;
