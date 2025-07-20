import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Spinner, Box, useToast, Center } from "@chakra-ui/react";
import axiosInstance from "../../services/verifyService";

import CardRefundContainer from "../../components/ReturnAndRefund/CardRefundContainer";
import ItemSelection from "../../components/ReturnAndRefund/ItemSelection";
import RefundMethodSelection from "../../components/ReturnAndRefund/RefundMethoSelction";
import RefundResult from "../../components/ReturnAndRefund/RefundResults";
import StepHeader from "../../components/ReturnAndRefund/StepHeader";
import StepWrapper from "../../components/ReturnAndRefund/StepWrapper";
import useRefundProcessor from "../../hooks/useRefundProcessor";
import { Invoice, InvoiceItem } from "../../models/Invoice";
import WaitingForAdminApproval from "../../components/ReturnAndRefund/WaitingForAdminAproval";
import { submitRefundRequestWithImages } from "../../services/imageService";

enum RefundStep {
  ITEM_SELECTION,
  WAITING_FOR_ADMIN_APPROVAL,
  REFUND_METHOD_SELECTION,
  CARD_REFUND_DETAILS,
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
  const [showCardForm, setShowCardForm] = useState(false);
  const [refundRequestId, setRefundRequestId] = useState<number | null>(null);

  const toastUI = useToast();

  const { processRefund } = useRefundProcessor({
    invoiceNumber: invoiceNumber!,
    selectedItems,
    totalAmount: totalRefundAmount,
    onSuccess: () => {
      setRefundSuccess(true);
      toastUI({ title: "Success", status: "success", isClosable: true });
      setCurrentStep(RefundStep.REFUND_RESULT);
    },
    onFailure: () => {
      setRefundSuccess(false);
      toastUI({ title: "Failed", status: "error", isClosable: true });
      setCurrentStep(RefundStep.REFUND_RESULT);
    },
  });

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:8080/api/return-exchange/invoice/${invoiceNumber}`
        );
        const info = response.data;

        const items = info.items.map((item: any) => ({
          invoiceItemId: item.itemId,
          id: item.itemId,
          name: item.productName ?? "Unnamed Item",
          quantity: item.quantity,
          price: item.price,
          returnQuantity: 0,
          refundAmount: 0,
          total: item.quantity * item.price,
        }));

        setInvoiceData({
          invoiceNumber: info.invoiceNumber,
          date: info.date,
          totalAmount: info.totalAmount,
          items,
        });

        setItemSelections(items);
      } catch (error) {
        console.error("Failed to fetch invoice", error);
        toastUI({
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
  }, [invoiceNumber, toastUI]);

  const handleItemSelection = async (items: InvoiceItem[]) => {
    setItemSelections(items);
    setSelectedItems(items);
    const total = items.reduce((sum, item) => sum + item.refundAmount, 0);
    setTotalRefundAmount(total);

    try {
      const requestId = await submitRefundRequestWithImages(
        invoiceNumber!,
        "Pending",
        items
      );
      setRefundRequestId(Number(requestId));
      setCurrentStep(RefundStep.WAITING_FOR_ADMIN_APPROVAL);
    } catch (error) {
      toastUI({
        title: "Failed to submit refund request",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle approval from admin
  const handleApproval = () => {
    console.log("Admin approved, moving to refund method selection");
    setCurrentStep(RefundStep.REFUND_METHOD_SELECTION);
  };

  // Handle rejection from admin
  const handleRejection = () => {
    console.log("Admin rejected, going back to item selection");
    // Reset selections and go back to item selection
    setSelectedItems([]);
    setTotalRefundAmount(0);
    setCurrentStep(RefundStep.ITEM_SELECTION);
  };

  const handleRefundMethodSelection = async (method: string) => {
    setRefundMethod(method);

    try {
      if (method === "Card") {
        setShowCardForm(true); // CardRefundContainer will call process-approved
      } else if (method === "Exchange") {
        await axiosInstance.post(`/api/return-exchange/exchange`, {
          invoiceNumber,
          returnedItems: selectedItems,
        });
        setCurrentStep(RefundStep.REFUND_RESULT);
      } else if (method === "Cash") {
        await axiosInstance.post(
          `/api/return-exchange/process-approved/${refundRequestId}`
        );
        setCurrentStep(RefundStep.REFUND_RESULT);
      }
    } catch (error) {
      toastUI({
        title: "Refund Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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

  const stepLabels = [
    "Select Items",
    "Waiting for Approval",
    "Choose Refund Method",
    "Refund Result",
  ];

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
      case RefundStep.WAITING_FOR_ADMIN_APPROVAL:
        return (
          <WaitingForAdminApproval
            invoiceNumber={invoiceNumber!}
            onApproved={handleApproval}
            onRejected={handleRejection}
          />
        );
      case RefundStep.REFUND_METHOD_SELECTION:
        return showCardForm ? (
          <CardRefundContainer
            invoiceNumber={invoiceNumber!}
            selectedItems={selectedItems}
            totalAmount={totalRefundAmount}
            refundRequestId={refundRequestId!}
            onSuccess={() => {
              setRefundSuccess(true);
              setCurrentStep(RefundStep.REFUND_RESULT);
              setShowCardForm(false);
            }}
            onFailure={() => {
              setRefundSuccess(false);
              setCurrentStep(RefundStep.REFUND_RESULT);
              setShowCardForm(false);
            }}
            onCancel={() => setShowCardForm(false)}
          />
        ) : (
          <RefundMethodSelection
            totalAmount={totalRefundAmount}
            onSubmit={(method) => {
              if (method === "Card") {
                setRefundMethod("Card");
                setShowCardForm(true);
              } else {
                handleRefundMethodSelection(method);
              }
            }}
            onCancel={handleCancel}
          />
        );
      case RefundStep.REFUND_RESULT:
        return (
          <RefundResult
            success={refundSuccess}
            amount={refundMethod === "Exchange" ? 0 : totalRefundAmount}
            method={refundMethod}
            invoiceNumber={invoiceNumber!}
            onClose={() => {
              window.location.href = "/dashboard";
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
        progressValue={currentStep * 25}
      />
      <StepWrapper currentStep={currentStep}>{renderStep()}</StepWrapper>
    </Box>
  );
};

export default ReturnRefundPage;
