import React from "react";
import { Box, Heading, Container } from "@chakra-ui/react";
import ReturnRefundManager from "../../components/ReturnAndRefund/RefundManager"; // Adjust path if needed

const ReturnRefundPage: React.FC = () => {
  return (
    <Container maxW="container.md" py={10}>
      <Heading mb={6}>Return & Refund</Heading>
      <Box>
        <ReturnRefundManager />
      </Box>
    </Container>
  );
};

export default ReturnRefundPage;
