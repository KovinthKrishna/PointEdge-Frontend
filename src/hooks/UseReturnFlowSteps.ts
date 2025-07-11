import { useState } from "react";
<<<<<<< HEAD
import { RefundStep } from "../components/ReturnAndRefund/ReturnRefundContainer";
=======
import { RefundStep } from "../models/RefundStep";
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc

export const useReturnFlowSteps = () => {
  const [currentStep, setCurrentStep] = useState<RefundStep>(
    RefundStep.ITEM_SELECTION
  );

<<<<<<< HEAD
  const goToNext = () => setCurrentStep((prev) => prev + 1);
  const goToPrev = () => setCurrentStep((prev) => prev - 1);
=======
  const goToNext = () => setCurrentStep((prev: number) => prev + 1);
  const goToPrev = () => setCurrentStep((prev: number) => prev - 1);
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const reset = () => setCurrentStep(RefundStep.ITEM_SELECTION);

  const stepLabels = ["Select Items", "Choose Refund Method", "Refund Result"];
  const progressValue =
    (currentStep / (Object.keys(RefundStep).length / 2 - 1)) * 100;

  return { currentStep, goToNext, goToPrev, reset, stepLabels, progressValue };
};