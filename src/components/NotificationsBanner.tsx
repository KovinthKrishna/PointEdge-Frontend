import { Heading, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { IoIosRemoveCircle, IoMdDoneAll } from "react-icons/io";
import theme from "../theme";

interface Props {
  heading: string;
  content: string;
}

const NotificationsBanner = ({ heading, content }: Props) => {
  return (
    <HStack
      width="full"
      justifyContent="space-between"
      spacing={4}
      borderBottom="1px"
      borderColor="gray"
    >
      <VStack alignItems="start" spacing={4}>
        <Heading fontSize={20} color="red">
          {heading}
        </Heading>
        <Text color="black">{content}</Text>
      </VStack>
      <VStack spacing={0}>
        <IconButton
          aria-label="Mark as read"
          icon={<IoMdDoneAll color={theme.colors.green} size={20} />}
          borderRadius="full"
        />
        <IconButton
          aria-label="Remove"
          icon={<IoIosRemoveCircle color={theme.colors.red} size={20} />}
          borderRadius="full"
        />
      </VStack>
    </HStack>
  );
};

export default NotificationsBanner;
