import React from "react";
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

interface ReceiptPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReceiptPopup: React.FC<ReceiptPopupProps> = ({ isOpen, onClose }) => {
  const sampleData = {
    receiptNumber: `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    storeName: "Point Edge Store",
    storeAddress: "Palk Street, Colombo 07, Sri Lanka",
    storePhone: "(+94) 123-456789",
  };

  return (
    <ModelBoxPopup isOpen={isOpen} onClose={onClose} maxW="80%" maxH="80%">
      <Box height="100%" display="flex" flexDirection="column">
        <ReceiptHeader receiptNumber={sampleData.receiptNumber} />
        <Box flex="1" overflowY="auto" px={0} py={0}>
          <Box id="printableArea" p={6} bg="#F9FAFB">
            <StoreInfo
              storeName={sampleData.storeName}
              storeAddress={sampleData.storeAddress}
              storePhone={sampleData.storePhone}
            />
            <TransactionInfo currentTime={new Date().toLocaleString()} />
            <CustomerInfo />
            <ItemList />
            <TotalSummary />
            <ThankYouNote />
          </Box>
          <FooterActions onClose={onClose} />
        </Box>
      </Box>
    </ModelBoxPopup>
  );
};

export default ReceiptPopup;
