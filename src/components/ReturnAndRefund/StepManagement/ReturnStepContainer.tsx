import { Box, Spinner, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import RefundStepRenderer from "../RefundStepRenderer";
import StepHeader from "./StepHeader";
import StepIndicator from "./StepIndicator";

import { useInvoiceData } from "../../../hooks/useInvoiceData";
import { useItemSelection } from "../../../hooks/useItemSelection";
import useRefundProcessor from "../../../hooks/useRefundProcessor";
import { useReturnFlowSteps } from "../../../hooks/UseReturnFlowSteps";

import { InvoiceItem } from "../../../models/Invoice";

const ReturnRefundContainer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const invoiceNumber = searchParams.get("invoice");

  const { invoiceData } = useInvoiceData(invoiceNumber);
  const { currentStep, goToNext, reset, stepLabels, progressValue } =
    useReturnFlowSteps();
  const { selectedItems, updateSelectedItems, totalRefundAmount } =
    useItemSelection(invoiceData?.items || []);

  const [refundSuccess, setRefundSuccess] = useState(false);
  const [isExchangeMode, setIsExchangeMode] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  // const [replacementProduct, setReplacementProduct] = useState<Product | null>(
  //   null
  // );
  const [refundMethod, setRefundMethod] = useState("");

  const { processRefund } = useRefundProcessor({
    invoiceNumber: invoiceNumber!,
    selectedItems,
    totalAmount: totalRefundAmount,
    onSuccess: () => setRefundSuccess(true),
    onFailure: () => setRefundSuccess(false),
  });

  const handleItemSelection = (items: InvoiceItem[]) => {
    updateSelectedItems(items);
    goToNext();
  };

  const handleRefundMethodSelection = async (method: string) => {
    setRefundMethod(method);

    if (method === "Exchange") {
      setIsExchangeMode(true);
    } else if (method === "Card") {
      setShowCardForm(true);
    } else {
      await processRefund("Cash");
      goToNext();
    }
  };

  const handleReplacementProductSelect = async () => {
    // setReplacementProduct(product);
    if (invoiceNumber) {
      await processRefund("Exchange");
      setIsExchangeMode(false);
      goToNext();
    }
  };

  const handleBackFromExchange = () => {
    setIsExchangeMode(false);
    setRefundMethod("");
  };

  const handleCancel = () => {
    updateSelectedItems(invoiceData?.items || []);
    setIsExchangeMode(false);
    setShowCardForm(false);
    setRefundMethod("");
    // setReplacementProduct(null);
    reset();
  };

  const handleReset = () => {
    updateSelectedItems(invoiceData?.items || []);
    setIsExchangeMode(false);
    setShowCardForm(false);
    setRefundMethod("");
    // setReplacementProduct(null);
    reset();
  };

  if (!invoiceData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={6}>
      <VStack spacing={6}>
        {!isExchangeMode && !showCardForm && (
          <StepHeader
            currentStep={currentStep}
            stepLabels={stepLabels}
            progressValue={progressValue}
          />
        )}

        <Box w="100%" p={6}>
          {!isExchangeMode && !showCardForm && (
            <StepIndicator currentStep={currentStep} />
          )}

          <RefundStepRenderer
            currentStep={currentStep}
            invoiceData={invoiceData}
            selectedItems={selectedItems}
            totalRefundAmount={totalRefundAmount}
            refundMethod={refundMethod}
            refundSuccess={refundSuccess}
            onSelectItems={handleItemSelection}
            onSelectMethod={handleRefundMethodSelection}
            onSelectReplacementProduct={handleReplacementProductSelect}
            onCancel={handleCancel}
            invoiceNumber={invoiceNumber!}
            isExchangeMode={isExchangeMode}
            onBack={isExchangeMode ? handleBackFromExchange : handleReset}
            setExchangeMode={setIsExchangeMode}
            showCardForm={showCardForm}
            setShowCardForm={setShowCardForm}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default ReturnRefundContainer;
