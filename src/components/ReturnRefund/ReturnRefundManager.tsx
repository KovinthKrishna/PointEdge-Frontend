import React, { useState } from "react";
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import ReturnRefundButton from "./ReturnRefundButton";
import InvoiceModal from "./InvoiceModal";
import ItemSelection from "./ItemSelection";
import RefundMethodSelection from "./RefundMethodSelection";
import RefundResult from "./RefundResults";
import refundService from "../../services/refundService";
import axios from "axios";
import { Invoice } from "../../models/Invoice";

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  returnQuantity: number;
  refundAmount: number;
}

interface InvoiceData {
  id: string;
  date: string;
  items: InvoiceItem[];
  total: number;
}

interface RefundRequest {
  invoiceNumber: string;
  items: {
    id: string;
    returnQuantity: number;
    refundAmount: number;
  }[];
  refundMethod: string;
  totalAmount: number;
}

enum RefundStep {
  INVOICE_INPUT,
  ITEM_SELECTION,
  REFUND_METHOD,
  RESULT,
}

const ReturnRefundManager: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState<RefundStep>(
    RefundStep.INVOICE_INPUT
  );
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [selectedItems, setSelectedItems] = useState<InvoiceItem[]>([]);
  const [refundMethod, setRefundMethod] = useState("");
  const [totalRefundAmount, setTotalRefundAmount] = useState(0);
  const [refundSuccess, setRefundSuccess] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const toast = useToast();

  const resetState = () => {
    setCurrentStep(RefundStep.INVOICE_INPUT);
    setInvoiceData(null);
    setSelectedItems([]);
    setRefundMethod("");
    setTotalRefundAmount(0);
    setRefundSuccess(false);
    setInvoiceNumber("");
  };

  const handleInvoiceSubmit = async (invNumber: string) => {
    try {
      const response = await axios.get<Invoice>(
        `http://localhost:8080/api/returns/invoice/${invNumber}`
      );
      const data = response.data;

      setInvoiceData({
        id: data.id,
        date: data.date,
        total: data.totalAmount,
        items: data.items.map((item) => ({
          id: item.id,
          name: item.productName,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price,
          returnQuantity: 0,
          refundAmount: 0,
        })),
      });

      setInvoiceNumber(invNumber);
      setCurrentStep(RefundStep.ITEM_SELECTION);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      toast({
        title: "Error",
        description: "Failed to fetch invoice details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleItemSelection = (items: InvoiceItem[]) => {
    setSelectedItems(items);
    const total = items.reduce(
      (sum: number, item: InvoiceItem) => sum + item.refundAmount,
      0
    );
    setTotalRefundAmount(total);
    setCurrentStep(RefundStep.REFUND_METHOD);
  };

  const handleRefundMethodSelection = async (method: string) => {
    setRefundMethod(method);

    try {
      // Prepare refund request
      const refundRequest: RefundRequest = {
        invoiceNumber,
        items: selectedItems.map((item) => ({
          id: item.id,
          returnQuantity: item.returnQuantity,
          refundAmount: item.refundAmount,
        })),
        refundMethod: method,
        totalAmount: totalRefundAmount,
      };

      // Process refund
      await refundService.post(refundRequest);
      setRefundSuccess(true);
    } catch (error) {
      console.error("Refund processing failed:", error);
      setRefundSuccess(false);
    }

    setCurrentStep(RefundStep.RESULT);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handlePrint = () => {
    // Implement print functionality
    window.print();
  };

  const renderStep = () => {
    switch (currentStep) {
      case RefundStep.INVOICE_INPUT:
        return (
          <InvoiceModal
            isOpen={isOpen}
            onClose={handleClose}
            onSubmit={handleInvoiceSubmit}
          />
        );
      case RefundStep.ITEM_SELECTION:
        return (
          <ItemSelection
            invoiceData={invoiceData}
            onSubmit={handleItemSelection}
            onCancel={handleClose}
          />
        );
      case RefundStep.REFUND_METHOD:
        return (
          <RefundMethodSelection
            totalAmount={totalRefundAmount}
            onSubmit={handleRefundMethodSelection}
            onCancel={() => setCurrentStep(RefundStep.ITEM_SELECTION)}
          />
        );
      case RefundStep.RESULT:
        return (
          <RefundResult
            success={refundSuccess}
            amount={totalRefundAmount}
            method={refundMethod}
            invoiceNumber={invoiceNumber}
            onClose={handleClose}
            onPrint={handlePrint}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <ReturnRefundButton
        onClick={onOpen}
        backgroundColor="#805AD5"
        color="white"
        _hover={{ backgroundColor: "#6B46C1" }}
      />
      {isOpen && renderStep()}
    </Box>
  );
};

export default ReturnRefundManager;
