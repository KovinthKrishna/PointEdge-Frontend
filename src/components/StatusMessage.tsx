import { Text } from "@chakra-ui/react";

interface Props {
  message: string;
}

const StatusMessage = ({ message }: Props) => {
  return (
    <Text textAlign="center" fontSize={20} fontWeight="bold" my={8}>
      {message}
    </Text>
  );
};

export default StatusMessage;
