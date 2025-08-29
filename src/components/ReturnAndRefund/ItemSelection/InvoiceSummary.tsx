import { Box, Text, HStack } from "@chakra-ui/react";
import { Invoice } from "../../../models/Invoice";

interface InvoiceSummaryProps {
  invoice: Invoice;
}

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ invoice }) => {
  const formattedDate = (() => {
    if (!invoice.date) return "N/A";
    try {
      return new Date(invoice.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return String(invoice.date);
    }
  })();

  return (
    <Box bg="skyBlue" p={4} borderRadius="2xl" mb={4} boxShadow="md">
      <HStack justify="space-between">
        <Text fontWeight="bold" color="darkBlue">
          Invoice #: {invoice.invoiceNumber}
        </Text>
        <Text color="darkBlue">Date: {formattedDate}</Text>
      </HStack>
    </Box>
  );
};

export default InvoiceSummary;
