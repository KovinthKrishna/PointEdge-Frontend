import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import CardRefundForm, { BankDetails } from "./CardRefundForm";
import { InvoiceItem } from "../../models/Invoice";

interface Props {
  invoiceNumber: string;
  selectedItems: InvoiceItem[];
  totalAmount: number;
  refundRequestId: number;
  onSuccess: () => void;
  onFailure: () => void;
  onCancel: () => void;
}

const CardRefundContainer: React.FC<Props> = ({
  invoiceNumber,
  selectedItems,
  totalAmount,
  refundRequestId,
  onSuccess,
  onFailure,
  onCancel,
}) => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (bankDetails: BankDetails) => {
    setIsSubmitting(true);

    try {
      const payload = {
        invoiceNumber,
        refundMethod: "Card",
        totalAmount,
        requestId: refundRequestId,
        accountHolderName: bankDetails.accountHolder,
        bankName: bankDetails.bankName,
        accountNumber: bankDetails.accountNumber,
        items: selectedItems.map((item) => ({
          itemId: item.id,
          quantity: item.returnQuantity,
          reason: item.reason || "",
        })),
      };

      const response = await fetch(
        "http://localhost:8080/api/return-exchange/card-refund",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast({
          title: "Refund initiated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onSuccess();
      } else {
        toast({
          title: "Refund failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        onFailure();
      }
    } catch (error) {
      console.error("Refund failed:", error);
      toast({
        title: "Unexpected error",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onFailure();
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <CardRefundForm
      onSubmitForm={handleSubmit}
      onCancel={onCancel}
      isSubmitting={isSubmitting}
    />
  );
};

export default CardRefundContainer;
