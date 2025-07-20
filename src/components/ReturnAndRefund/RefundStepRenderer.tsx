import React from "react";
import ItemSelection from "./ItemSelection";
import RefundMethodSelection from "./RefundMethoSelction";
import RefundResult from "./RefundResults";
import { RefundStep } from "../../models/RefundStep";
import { InvoiceItem, Invoice } from "../../models/Invoice";
import Product from "../../models/Product";
import CardRefundContainer from "./CardRefundContainer";

interface RefundStepRendererProps {
  currentStep: number;
  invoiceData: Invoice;
  selectedItems: InvoiceItem[];
  totalRefundAmount: number;
  refundMethod: string;
  refundSuccess: boolean;
  onSelectItems: (items: InvoiceItem[]) => void;
  onSelectMethod: (method: string) => void;
  onSelectReplacementProduct: (product: Product) => void;
  onCancel: () => void;
  invoiceNumber: string;
  onBack: () => void;
  isExchangeMode: boolean;
  setExchangeMode: (value: boolean) => void;
  showCardForm: boolean;
  setShowCardForm: (val: boolean) => void;
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
  // onSelectReplacementProduct,
  onCancel,
  invoiceNumber,
  onBack,
  // isExchangeMode,
  setExchangeMode,
  showCardForm,
  setShowCardForm,
}) => {
  // 2. Card refund form override
  if (showCardForm) {
    return (
      <CardRefundContainer
        invoiceNumber={invoiceNumber}
        totalAmount={totalRefundAmount}
        selectedItems={selectedItems}
        onSuccess={() => {
          setShowCardForm(false);
          onSelectMethod("Card");
        }}
        onFailure={() => {
          setShowCardForm(false);
          onBack();
        }}
        onCancel={function (): void {
          throw new Error("Function not implemented.");
        }}
        refundRequestId={0}
      />
    );
  }

  // 3. Step-based flow
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
          onSubmit={(method) => {
            if (method === "Exchange") {
              setExchangeMode(true);
            } else if (method === "Card") {
              setShowCardForm(true);
            } else {
              onSelectMethod(method);
            }
          }}
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
