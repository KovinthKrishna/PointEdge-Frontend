import { Box } from "@chakra-ui/react";
import StepIndicator from "./StepIndicator";

interface StepWrapperProps {
  currentStep: number;
  children: React.ReactNode;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ currentStep, children }) => (
  <Box p={6}>
    <StepIndicator currentStep={currentStep} />

    {children}
  </Box>
);

export default StepWrapper;
