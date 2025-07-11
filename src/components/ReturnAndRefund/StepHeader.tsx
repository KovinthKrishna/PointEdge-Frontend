import React from "react";
import { Text, VStack } from "@chakra-ui/react";
import { RefundStep } from "../../models/RefundStep";

interface StepHeaderProps {
  currentStep: RefundStep;
  stepLabels: string[];
  progressValue: number;
}

const StepHeader: React.FC<StepHeaderProps> = ({ currentStep, stepLabels }) => {
  return (
    <VStack spacing={2} mb={6}>
      <Text
        fontSize="xl"
        fontWeight="bold"
        color="darkBlue"
        textAlign="center"
        letterSpacing="wide"
      >
        Step {currentStep + 1} of {stepLabels.length}
      </Text>
      <Text fontSize="md" color="black" textAlign="center">
        {stepLabels[currentStep]}
      </Text>
    </VStack>
  );
};

export default StepHeader;
