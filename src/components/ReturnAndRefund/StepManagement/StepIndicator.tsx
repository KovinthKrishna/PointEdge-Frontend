import React from "react";
import { HStack, VStack, Box, Circle, Text } from "@chakra-ui/react";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = ["Select Items", "Choose Refund Method", "Refund Result"];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <HStack spacing={0} justify="center" align="center" mb={8}>
      {steps.map((label, index) => (
        <HStack key={index} spacing={0} align="center">
          <VStack spacing={2}>
            <Circle
              size="40px"
              bg={index <= currentStep ? "darkBlue" : "lightGray"}
              color={index <= currentStep ? "white" : "gray"}
              fontWeight="bold"
              border={index === currentStep ? "2px solid #00669B" : "none"}
              transition="all 0.3s"
            >
              {index + 1}
            </Circle>
            <Text
              fontSize="sm"
              color={index <= currentStep ? "darkBlue" : "gray"}
              fontWeight={index === currentStep ? "semibold" : "normal"}
            >
              {label}
            </Text>
          </VStack>

          {index < steps.length - 1 && (
            <Box
              flex="1"
              height="2px"
              bg={index < currentStep ? "darkBlue" : "lightGray"}
              mx={3}
              borderRadius="full"
              transition="background-color 0.3s"
              minWidth="40px"
            />
          )}
        </HStack>
      ))}
    </HStack>
  );
};

export default StepIndicator;
