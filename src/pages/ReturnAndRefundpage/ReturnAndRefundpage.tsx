import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Spinner,
  Box,
  useToast,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import ItemSelection from "../../components/ReturnRefund/ItemSelection";
import RefundMethodSelection from "../../components/ReturnRefund/RefundMethodSelection";
import RefundResult from "../../components/ReturnRefund/RefundResults";
import StepIndicator from "../../components/ReturnRefund/StepIndicator";

enum RefundStep {
  ITEM_SELECTION,
  REFUND_METHOD_SELECTION,
  REFUND_RESULT,
}

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  returnQuantity: number;
  refundAmount: number;
  total: number;
}

export interface Invoice {
  invoiceNumber: String;
  date: string;
  items: InvoiceItem[];
  totalAmount: number;
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
        const data = response.data;

        setInvoiceData({
          invoiceNumber: data.id,
          date: data.date,
          totalAmount: data.totalAmount,
          items: data.items.map((item: any) => ({
            id: item.id,
            name: item.productName,
            quantity: item.quantity,
            price: item.price,
            returnQuantity: 0,
            refundAmount: 0,
            total: item.quantity * item.price,
          })),
        });
        setItemSelections(
          data.items.map((item: any) => ({
            id: item.id,
            name: item.productName,
            quantity: item.quantity,
            price: item.price,
            returnQuantity: 0,
            refundAmount: 0,
            total: item.quantity * item.price,
          }))
        );
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
          id: item.id,
          returnQuantity: item.returnQuantity,
          refundAmount: item.refundAmount,
        })),
        refundMethod: method,
        totalAmount: totalRefundAmount,
      };

      await axios.post(
        "http://localhost:8080/api/returns/refund",
        refundRequest
      );

      setRefundSuccess(true);
    } catch (error) {
      console.error("Refund processing failed", error);
      setRefundSuccess(false);
    }

    setCurrentStep(RefundStep.REFUND_RESULT);
  };

  // Reset selections and go back to step 1
  const handleCancel = () => {
    setSelectedItems([]);
    setTotalRefundAmount(0);
    setCurrentStep(RefundStep.ITEM_SELECTION);
  };

  if (!invoiceData) {
    return <Spinner size="xl" />;
  }

  const stepLabels = ["Select Items", "Choose Refund Method", "Refund Result"];
  const progressValue =
    (currentStep / (Object.keys(RefundStep).length / 2 - 1)) * 100;

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
          />
        );
      default:
        return null;
    }
  };

  /*const formatToRupees = (amount: number) => {
    return Rs. ${amount.toLocaleString("si-LK")};
  };*/

  return (
    <Box p={6}>
      <VStack spacing={2} mb={6}>
        <Text fontSize="lg" fontWeight="bold" color="gray.600">
          Step {currentStep + 1} of 3: {stepLabels[currentStep]}
        </Text>
        <Progress
          value={progressValue}
          size="sm"
          colorScheme="darkBlue"
          width="100%"
          borderRadius="md"
        />
        <Box p={6}>
          <StepIndicator currentStep={currentStep} />
          {renderStep()}
        </Box>
      </VStack>
    </Box>
  );
};

export default ReturnRefundPage;
