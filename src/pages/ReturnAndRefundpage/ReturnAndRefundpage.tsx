import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Spinner, Box, useToast, Center } from "@chakra-ui/react";
import axios from "axios";

import ItemSelection from "../../components/ReturnAndRefund/ItemSelection";
import RefundMethodSelection from "../../components/ReturnAndRefund/RefundMethoSelction";
import RefundResult from "../../components/ReturnAndRefund/RefundResults";
import StepHeader from "../../components/ReturnAndRefund/StepHeader";
import StepWrapper from "../../components/ReturnAndRefund/StepWrapper";
import CardRefundContainer from "../../components/ReturnAndRefund/CardRefundContainer";
import WaitingForAdminApproval from "../../components/ReturnAndRefund/WaitingForAdminAproval";

import { InvoiceItem, Invoice } from "../../models/Invoice";
import Product from "../../models/Product";
import useRefundProcessor from "../../hooks/useRefundProcessor";
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

  const toast = useToast();

  const { processRefund, isProcessing } = useRefundProcessor({
    invoiceNumber: invoiceNumber!,
    selectedItems,
    totalAmount: totalRefundAmount,
    onSuccess: () => {
      setRefundSuccess(true);
      setCurrentStep(RefundStep.REFUND_RESULT);
      toast({ title: "Success", status: "success", isClosable: true });
    },
    onFailure: () => {
      setRefundSuccess(false);
      setCurrentStep(RefundStep.REFUND_RESULT);
      toast({ title: "Failed", status: "error", isClosable: true });
    },
  });

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/return-exchange/invoice/${invoiceNumber}`
        );
        const data = response.data;

        const items = data.items.map((item: any) => ({
          id: item.itemId,
          name: item.productName ?? "Unnamed Item",
          quantity: item.quantity,
          price: item.price,
          returnQuantity: 0,
          refundAmount: 0,
          returnPhoto: undefined,
          reason: "",
          total: item.quantity * item.price,
        }));

        setInvoiceData({
          invoiceNumber: data.invoiceNumber,
          date: data.date,
          totalAmount: data.totalAmount,
          items,
        });
        setItemSelections(items);
      } catch (err) {
        console.error("Invoice fetch failed", err);
        toast({
          title: "Failed to load invoice",
          status: "error",
          isClosable: true,
        });
      }
    };

    if (invoiceNumber) {
      fetchInvoice();
    }
  }, [invoiceNumber, toast]);

  const handleItemSelection = async (items: InvoiceItem[]) => {
    setSelectedItems(items);
    const total = items.reduce((sum, item) => sum + item.refundAmount, 0);
    setTotalRefundAmount(total);

    try {
      await submitRefundRequestWithImages(invoiceNumber!, "Pending", items);
      setCurrentStep(RefundStep.WAITING_FOR_ADMIN_APPROVAL);
    } catch (error) {
      console.error(error);
      toast({
        title: "Refund request failed",
        status: "error",
        isClosable: true,
      });
    }
  };

  // Poll for approval
  useEffect(() => {
    if (currentStep !== RefundStep.WAITING_FOR_ADMIN_APPROVAL) return;

    const poll = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/admin/refund-requests/status/${invoiceNumber}`
        );
        const status = res.data;

        if (status === "APPROVED") {
          setCurrentStep(RefundStep.REFUND_METHOD_SELECTION);
        } else if (status === "REJECTED") {
          toast({
            title: "Rejected",
            description: "Admin rejected your request.",
            status: "error",
            isClosable: true,
          });
          setCurrentStep(RefundStep.ITEM_SELECTION);
        }
      } catch (err) {
        console.error("Polling failed", err);
      }
    }, 5000);

    return () => clearInterval(poll);
  }, [currentStep, invoiceNumber, toast]);

  const handleRefundMethodSelection = async (method: string) => {
    setRefundMethod(method);

    if (method === "Card") {
      setShowCardForm(true);
    } else {
      await processRefund(method);
    }
  };

  const handleCancel = () => {
    setSelectedItems([]);
    setTotalRefundAmount(0);
    setCurrentStep(RefundStep.ITEM_SELECTION);
  };

  const renderStep = () => {
    switch (currentStep) {
      case RefundStep.ITEM_SELECTION:
        return (
          <ItemSelection
            invoiceData={invoiceData!}
            onSubmit={handleItemSelection}
            onCancel={handleCancel}
            selectedItems={itemSelections}
          />
        );
      case RefundStep.WAITING_FOR_ADMIN_APPROVAL:
        return <WaitingForAdminApproval invoiceNumber={invoiceNumber!} />;
      case RefundStep.REFUND_METHOD_SELECTION:
        return showCardForm ? (
          <CardRefundContainer
            invoiceNumber={invoiceNumber!}
            selectedItems={selectedItems}
            totalAmount={totalRefundAmount}
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
            onSubmit={handleRefundMethodSelection}
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
            onClose={() => (window.location.href = "/")}
            onBack={() => setCurrentStep(RefundStep.REFUND_METHOD_SELECTION)}
            onPrint={() => window.print()}
          />
        );
      default:
        return null;
    }
  };

  const stepLabels = [
    "Select Items",
    "Waiting for Approval",
    "Choose Refund Method",
    "Refund Result",
  ];

  if (!invoiceData) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

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
