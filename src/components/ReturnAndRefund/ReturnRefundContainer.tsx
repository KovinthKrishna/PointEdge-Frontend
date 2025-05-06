import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Spinner, Box, VStack } from "@chakra-ui/react";

import StepHeader from "./StepHeader";
import StepIndicator from "./StepIndicator";
import RefundStepRenderer from "./RefundStepRenderer";
import { useInvoiceData } from "../../hooks/useInvoiceData";
import { useItemSelection } from "../../hooks/useItemSelection";
import useRefundProcessor from "../../hooks/useRefundProcessor";
import { useReturnFlowSteps } from "../../hooks/UseReturnFlowSteps";
import { InvoiceItem } from "../../models/Invoice";

export enum RefundStep {
  ITEM_SELECTION,
  REFUND_METHOD_SELECTION,
  REFUND_RESULT,
}

const ReturnRefundContainer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const invoiceNumber = searchParams.get("invoice");

  const { invoiceData } = useInvoiceData(invoiceNumber);
  const { currentStep, goToNext, reset, stepLabels, progressValue } =
    useReturnFlowSteps();

  const { selectedItems, updateSelectedItems, totalRefundAmount } =
    useItemSelection(invoiceData?.items || []);

  const [refundSuccess, setRefundSuccess] = useState(false);

  const { processRefund } = useRefundProcessor({
    invoiceNumber: invoiceNumber!,
    selectedItems,
    totalAmount: totalRefundAmount,
    onSuccess: () => setRefundSuccess(true),
    onFailure: () => setRefundSuccess(false),
  });
  const [refundMethod, setRefundMethod] = useState("");

  const handleItemSelection = (items: InvoiceItem[]) => {
    updateSelectedItems(items);
    goToNext();
  };

  const handleRefundMethodSelection = async (method: string) => {
    setRefundMethod(method);
    if (invoiceNumber) {
      await processRefund(method);
      goToNext();
    }
  };

  const handleCancel = () => {
    updateSelectedItems(invoiceData?.items || []);
    reset();
  };

  if (!invoiceData) {
    return <Spinner size="xl" />;
  }

  return (
    <Box p={6}>
      <VStack spacing={2} mb={6}>
        <StepHeader
          currentStep={currentStep}
          stepLabels={stepLabels}
          progressValue={progressValue}
        />
        <Box p={6}>
          <StepIndicator currentStep={currentStep} />
          <RefundStepRenderer
            currentStep={currentStep}
            invoiceData={invoiceData}
            selectedItems={selectedItems}
            totalRefundAmount={totalRefundAmount}
            refundMethod={refundMethod}
            refundSuccess={refundSuccess}
            onSelectItems={handleItemSelection}
            onSelectMethod={handleRefundMethodSelection}
            onCancel={handleCancel}
            invoiceNumber={invoiceNumber!}
            onBack={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default ReturnRefundContainer;
