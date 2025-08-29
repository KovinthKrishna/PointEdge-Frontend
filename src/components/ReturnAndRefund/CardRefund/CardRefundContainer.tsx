import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import CardRefundForm, { BankDetails } from "./CardRefundForm";
import { InvoiceItem } from "../../../models/Invoice";
import { useRefundStore } from "../../../store/useRefundRequestStore";

interface Props {
  invoiceNumber: string;
  selectedItems: InvoiceItem[];
  totalAmount: number;
  onSuccess: () => void;
  onFailure: () => void;
  onCancel: () => void;
}

const CardRefundContainer: React.FC<Props> = ({
  invoiceNumber,
  selectedItems,
  totalAmount,
  onSuccess,
  onFailure,
  onCancel,
}) => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { refundRequestId } = useRefundStore();

  const handleSubmit = async (bankDetails: BankDetails) => {
    if (!refundRequestId) {
      console.error("No refund request ID found");
      return;
    }

    try {
      const payload = {
        invoiceNumber,
        refundMethod: "Card",
        totalAmount,
        accountHolderName: bankDetails.accountHolder,
        bankName: bankDetails.bankName,
        accountNumber: bankDetails.accountNumber,
        items: selectedItems.map((item) => ({
          productId: item.productId,
          productName: item.name,
          unitPrice: item.price,
          quantity: item.returnQuantity,
          refundAmount: item.refundAmount,
          reason: item.reason || "",
          photoPath: item.photoPath,
        })),
      };

      const response = await fetch(
        `http://localhost:8080/api/return-exchange/finalize-card/${refundRequestId}`,
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
