import { Box, Text } from "@chakra-ui/react";
import { InvoiceItem } from "../../models/Invoice";

interface RefundSummaryProps {
  items: InvoiceItem[];
}

const RefundSummary: React.FC<RefundSummaryProps> = ({ items }) => {
  const totalRefund = items.reduce((sum, item) => sum + item.refundAmount, 0);

  return (
    <Box mt={4} p={5} borderRadius="2xl" bg="lightGray" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" color="darkBlue">
        Total Refund: Rs. {totalRefund.toFixed(2)}
      </Text>
    </Box>
  );
};

export default RefundSummary;
