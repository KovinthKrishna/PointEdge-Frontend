import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Spinner, Box, useToast, Center } from "@chakra-ui/react";
import axios from "axios";

import ItemSelection from "../../components/ReturnAndRefund/ItemSelection";
import RefundMethodSelection from "../../components/ReturnAndRefund/RefundMethoSelction";
import RefundResult from "../../components/ReturnAndRefund/RefundResults";
import StepHeader from "../../components/ReturnAndRefund/StepHeader";
import StepWrapper from "../../components/ReturnAndRefund/StepWrapper";
import { InvoiceItem, Invoice } from "../../models/Invoice";

enum RefundStep {
  ITEM_SELECTION,
  REFUND_METHOD_SELECTION,
  REFUND_RESULT,
}

const ReturnRefundPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const invoiceNumber = searchParams.get("invoice");

  const [currentStep, setCurrentStep] = useState<RefundStep>(
    RefundStep.ITEM_SELECTION
  );
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
  const [selectedItems, setSelectedItems] = useState<InvoiceItem[]>([]);
  const [refundMethod, setRefundMethod] = useState("");
  const [totalRefundAmount, setTotalRefundAmount] = useState(0);
  const [refundSuccess, setRefundSuccess] = useState(false);
  const [itemSelections, setItemSelections] = useState<InvoiceItem[]>([]);

  const toast = useToast();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/returns/invoice/${invoiceNumber}`
        );
        const info = response.data;

        const items = info.items.map((item: any) => ({
          id: item.itemId,
          name: item.productName,
          quantity: item.quantity,
          price: item.price,
          returnQuantity: 0,
          refundAmount: 0,
          total: item.quantity * item.price,
        }));

        setInvoiceData({
          invoiceNumber: info.id,
          date: info.date,
          totalAmount: info.totalAmount,
          items,
        });

        setItemSelections(items);
      } catch (error) {
        console.error("Failed to fetch invoice", error);
        toast({
          title: "Error",
          description: "Failed to fetch invoice details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (invoiceNumber) {
      fetchInvoice();
    }
  }, [invoiceNumber, toast]);

  const handleItemSelection = (items: InvoiceItem[]) => {
    setItemSelections(items);
    setSelectedItems(items);
    const total = items.reduce((sum, item) => sum + item.refundAmount, 0);
    setTotalRefundAmount(total);
    setCurrentStep(RefundStep.REFUND_METHOD_SELECTION);
  };

  const handleRefundMethodSelection = async (method: string) => {
    setRefundMethod(method);

    try {
      const refundRequest = {
        invoiceNumber: invoiceNumber!,
        items: selectedItems.map((item) => ({
          itemId: item.id,
          quantity: item.returnQuantity,
          reason: item.reason || "",
        })),
        refundMethod: method,
        totalAmount: totalRefundAmount,
      };

      await axios.post(
        "http://localhost:8080/api/returns/process",
        refundRequest
      );
      setRefundSuccess(true);
    } catch (error) {
      console.error("Refund processing failed", error);
      setRefundSuccess(false);
    }

    setCurrentStep(RefundStep.REFUND_RESULT);
  };

  const handleCancel = () => {
    setSelectedItems([]);
    setTotalRefundAmount(0);
    setCurrentStep(RefundStep.ITEM_SELECTION);
  };

  if (!invoiceData) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const stepLabels = ["Select Items", "Choose Refund Method", "Refund Result"];

  const renderStep = () => {
    switch (currentStep) {
      case RefundStep.ITEM_SELECTION:
        return (
          <ItemSelection
            invoiceData={invoiceData}
            onSubmit={handleItemSelection}
            onCancel={handleCancel}
            selectedItems={itemSelections}
          />
        );
      case RefundStep.REFUND_METHOD_SELECTION:
        return (
          <RefundMethodSelection
            totalAmount={totalRefundAmount}
            onSubmit={handleRefundMethodSelection}
            onCancel={handleCancel}
          />
        );
      case RefundStep.REFUND_RESULT:
        return (
          <RefundResult
            success={refundSuccess}
            amount={totalRefundAmount}
            method={refundMethod}
            invoiceNumber={invoiceNumber!}
            onClose={() => {
              window.location.href = "/";
            }}
            onPrint={() => window.print()}
            onBack={() => setCurrentStep(RefundStep.REFUND_METHOD_SELECTION)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box p={6}>
      <StepHeader
        currentStep={currentStep}
        stepLabels={stepLabels}
        progressValue={0}
      />
      <StepWrapper currentStep={currentStep}>{renderStep()}</StepWrapper>
    </Box>
  );
};

export default ReturnRefundPage;
