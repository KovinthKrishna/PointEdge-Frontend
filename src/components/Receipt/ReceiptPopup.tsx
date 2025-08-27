import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import ModelBoxPopup from "../Common/ModelBoxPopup";

import ReceiptHeader from "./ReceiptHeader";
import StoreInfo from "./StoreInfo";
import TransactionInfo from "./TransactionInfo";
import CustomerInfo from "./CustomerInfo";
import ItemList from "./ItemList";
import TotalSummary from "./TotalSummary";
import ThankYouNote from "./ThankYouNote";
import FooterActions from "./FooterActions";
import OrderCompletion from "../Payment/OrderCompletion";

interface ReceiptPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReceiptPopup: React.FC<ReceiptPopupProps> = ({ isOpen, onClose }) => {
  const [isOrderCompletionOpen, setOrderCompletionOpen] = useState(false);

  const handleNextStep = () => setOrderCompletionOpen(true);

  const [savedOrderId, setSavedOrderId] = useState<string | null>(null);
  const [savedInvoiceNumber, setSavedInvoiceNumber] = useState<string | null>(
    null
  );
  const [savedOrderCount, setSavedOrderCount] = useState<number>(0);

  const handleOrderSaved = (responseData: any) => {
    setSavedOrderId(responseData.orderId);
    setSavedInvoiceNumber(responseData.invoiceNumber);
    setSavedOrderCount(responseData.totalOrdersByEmployee ?? 0);
  };

  return (
    <>
      {/* Hidden printable content for PDF generation */}
      <Box id="printableArea" display="none">
        <ReceiptHeader receiptNumber={savedInvoiceNumber ?? "--------"} />
        <Box p={6} bg="#F9FAFB">
          <StoreInfo
            storeName="Point Edge Store"
            storeAddress="Palk Street, Colombo 07"
            storePhone="(+94) 123-456789"
          />
          <TransactionInfo currentTime={new Date().toLocaleString()} />
          <CustomerInfo />
          <ItemList />
          <TotalSummary />
          <ThankYouNote />
        </Box>
      </Box>

      <ModelBoxPopup isOpen={isOpen} onClose={onClose} maxW="80%" maxH="80%">
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <ReceiptHeader receiptNumber={savedInvoiceNumber ?? "--------"} />
          <Box flex="1" overflowY="auto" p={6} bg="#F9FAFB">
            <StoreInfo
              storeName="Point Edge Store"
              storeAddress="Palk Street, Colombo 07"
              storePhone="(+94) 123-456789"
            />
            <TransactionInfo currentTime={new Date().toLocaleString()} />
            <CustomerInfo />
            <ItemList />
            <TotalSummary />
            <ThankYouNote />
          </Box>
          <FooterActions
            onClose={onClose}
            onNextStep={handleNextStep}
            onOrderSaved={handleOrderSaved}
          />
        </Box>
      </ModelBoxPopup>

      <OrderCompletion
        isOpen={isOrderCompletionOpen}
        onClose={() => setOrderCompletionOpen(false)}
        orderData={{
          orderId: savedOrderId ?? "---",
          invoiceNumber: savedInvoiceNumber ?? "---",
          completedOrdersToday: savedOrderCount,
        }}
      />
    </>
  );
};

export default ReceiptPopup;
