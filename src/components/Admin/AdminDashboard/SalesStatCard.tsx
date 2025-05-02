import { Text, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  statValue: string;
  statLabel: string;
}

const SalesStatCard = ({ icon: Icon, statValue, statLabel }: Props) => {
  return (
    <VStack
      backgroundColor="darkBlue"
      width="full"
      color="white"
      paddingX={3}
      paddingY={4}
      borderRadius={4}
      alignItems="start"
      spacing={4}
    >
      <Icon size={24} />
      <VStack alignItems="start" spacing={0}>
        <Text fontWeight="bold" fontSize={20}>
          {statValue}
        </Text>
        <Text>{statLabel}</Text>
      </VStack>
    </VStack>
  );
};

export default SalesStatCard;
