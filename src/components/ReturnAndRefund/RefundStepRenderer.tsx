import React from "react";
import ItemSelection from "./ItemSelection";
import RefundMethodSelection from "./RefundMethoSelction";
import RefundResult from "./RefundResults";
import { RefundStep } from "../../models/RefundStep";
import { InvoiceItem, Invoice } from "../../models/Invoice";

interface RefundStepRendererProps {
  currentStep: RefundStep;
  invoiceData: Invoice;
  selectedItems: InvoiceItem[];
  totalRefundAmount: number;
  refundMethod: string;
  refundSuccess: boolean;
  onSelectItems: (items: InvoiceItem[]) => void;
  onSelectMethod: (method: string) => void;
  onCancel: () => void;
  invoiceNumber: string;
  onBack: () => void;
}

const RefundStepRenderer: React.FC<RefundStepRendererProps> = ({
  currentStep,
  invoiceData,
  selectedItems,
  totalRefundAmount,
  refundMethod,
  refundSuccess,
  onSelectItems,
  onSelectMethod,
  onCancel,
  invoiceNumber,
  onBack,
}) => {
  switch (currentStep) {
    case RefundStep.ITEM_SELECTION:
      return (
        <ItemSelection
          invoiceData={invoiceData}
          onSubmit={onSelectItems}
          onCancel={onCancel}
          selectedItems={selectedItems}
        />
      );
    case RefundStep.REFUND_METHOD_SELECTION:
      return (
        <RefundMethodSelection
          totalAmount={totalRefundAmount}
          onSubmit={onSelectMethod}
          onCancel={onCancel}
        />
      );
    case RefundStep.REFUND_RESULT:
      return (
        <RefundResult
          success={refundSuccess}
          amount={totalRefundAmount}
          method={refundMethod}
          invoiceNumber={invoiceNumber}
          onClose={() => {
            window.location.href = "/";
          }}
          onPrint={() => window.print()}
          onBack={() => {
            onBack();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      );
    default:
      return null;
  }
};

export default RefundStepRenderer;
