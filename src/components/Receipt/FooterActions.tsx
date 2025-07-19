import { Box, Button, Icon, VStack } from "@chakra-ui/react";
import { FiPrinter, FiMail } from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const FooterActions = ({ onClose }: { onClose: () => void }) => {
  const handlePrint = () => {
    const input = document.getElementById("printableArea");
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("receipt.pdf");
    });
  };

  return (
    <Box p={6} bg="#F3F4F6" borderTop="1px" borderColor="#E5E7EB">
      <VStack spacing={4}>
        <Button
          leftIcon={<Icon as={FiPrinter} boxSize={5} />}
          color="blue"
          width="100%"
          size="lg"
          onClick={handlePrint}
          _hover={{
            color: "white",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
            bgGradient: "linear(to-r, #3B82F6, #2563EB)",
          }}
          transition="all 0.3s"
          fontWeight="bold"
          letterSpacing="wide"
          borderRadius="xl"
        >
          Download PDF
        </Button>

        <Button
          leftIcon={<Icon as={FiMail} boxSize={5} />}
          color="green"
          width="100%"
          size="lg"
          onClick={onClose}
          _hover={{
            color: "white",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)",
            bgGradient: "linear(to-r, #10B981, #059669)",
          }}
          transition="all 0.3s"
          fontWeight="bold"
          letterSpacing="wide"
          borderRadius="xl"
        >
          Send E-Receipt
        </Button>
      </VStack>
    </Box>
  );
};

export default FooterActions;
