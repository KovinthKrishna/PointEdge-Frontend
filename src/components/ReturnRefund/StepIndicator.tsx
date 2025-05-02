import { Box, Flex, Text, Circle } from "@chakra-ui/react";

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ["Select Items", "Choose Refund Method", "Refund Result"];

  return (
    <Flex justify="center" align="center" mb={8}>
      {steps.map((label, index) => (
        <Flex key={index} align="center">
          <Circle
            size="30px"
            bg={index <= currentStep ? "darkBlue" : "gray.300"}
            color="white"
            fontSize="sm"
          >
            {index + 1}
          </Circle>
          <Text
            ml={2}
            mr={4}
            fontWeight={index === currentStep ? "bold" : "normal"}
          >
            {label}
          </Text>
          {index < steps.length - 1 && (
            <Box
              h="2px"
              w="40px"
              bg={index < currentStep ? "darkBlue" : "gray.300"}
            />
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default StepIndicator;
