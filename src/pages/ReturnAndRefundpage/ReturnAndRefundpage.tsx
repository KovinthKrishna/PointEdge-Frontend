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
import { InvoiceItem, Invoice } from "../../models/Invoice";
import Product from "../../models/Product";
import useRefundProcessor from "../../hooks/useRefundProcessor";

enum RefundStep {
  ITEM_SELECTION,
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
  const [replacementProduct, setReplacementProduct] = useState<Product | null>(
    null
  );

  const toastUI = useToast();

  const { processRefund, isProcessing } = useRefundProcessor({
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
        const response = await axios.get(
          `http://localhost:8080/api/return-exchange/invoice/${invoiceNumber}`
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

  const handleItemSelection = (items: InvoiceItem[]) => {
    setItemSelections(items);
    setSelectedItems(items);
    const total = items.reduce((sum, item) => sum + item.refundAmount, 0);
    setTotalRefundAmount(total);
    setCurrentStep(RefundStep.REFUND_METHOD_SELECTION);
  };

  const handleRefundMethodSelection = async (method: string) => {
    setRefundMethod(method);

    if (method === "Card") {
      setCurrentStep(RefundStep.CARD_REFUND_DETAILS);
    } else {
      await processRefund(method); // includes handling "Exchange"
      setCurrentStep(RefundStep.REFUND_RESULT);
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
        progressValue={currentStep * 33}
      />
      <StepWrapper currentStep={currentStep}>{renderStep()}</StepWrapper>
    </Box>
  );
};

export default ReturnRefundPage;
