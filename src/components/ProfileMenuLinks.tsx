import { Text } from "@chakra-ui/react";

interface Props {
  label: string;
}

const ProfileMenuLinks = ({ label }: Props) => {
  return (
    <Text as="button" fontSize={20} _hover={{ textDecoration: "underline" }}>
      {label}
    </Text>
  );
};

export default ProfileMenuLinks;
