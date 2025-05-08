import { Box, Text, HStack } from "@chakra-ui/react";
import { Invoice } from "../../models/Invoice";

interface InvoiceSummaryProps {
  invoice: Invoice;
}

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ invoice }) => {
  const formattedDate = new Date(invoice.date).toLocaleDateString();

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
