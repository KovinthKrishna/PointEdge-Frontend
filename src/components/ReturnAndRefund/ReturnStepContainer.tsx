import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import StepIndicator from "./StepIndicator";

interface Props {
  currentStep: number;
  children: ReactNode;
}

const ReturnStepContainer: React.FC<Props> = ({ currentStep, children }) => {
  return (
    <Box p={6}>
      <StepIndicator currentStep={currentStep} />
      {children}
    </Box>
  );
};

export default ReturnStepContainer;
