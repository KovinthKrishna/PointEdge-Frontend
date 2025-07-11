import { useState } from "react";
import { RefundStep } from "../models/RefundStep";

export const useReturnFlowSteps = () => {
  const [currentStep, setCurrentStep] = useState<RefundStep>(
    RefundStep.ITEM_SELECTION
  );

  const goToNext = () => setCurrentStep((prev: number) => prev + 1);
  const goToPrev = () => setCurrentStep((prev: number) => prev - 1);
  const reset = () => setCurrentStep(RefundStep.ITEM_SELECTION);

  const stepLabels = ["Select Items", "Choose Refund Method", "Refund Result"];
  const progressValue =
    (currentStep / (Object.keys(RefundStep).length / 2 - 1)) * 100;

  return { currentStep, goToNext, goToPrev, reset, stepLabels, progressValue };
};