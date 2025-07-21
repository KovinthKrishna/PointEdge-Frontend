import { Box, Button, Icon, VStack } from "@chakra-ui/react";
import { FiPrinter, FiMail } from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveOrder } from "../../hooks/useSaveOrder";
import { useState } from "react";

const FooterActions = ({
  onClose,
  onNextStep,
  onOrderSaved,
}: {
  onClose: () => void;
  onNextStep: () => void;
  onOrderSaved: (invoiceNumber: string) => void;
}) => {
  // Track if order is saved
  const [isOrderSaved, setIsOrderSaved] = useState(false);

  const handleNextStep = async () => {
    try {
      const response = await saveOrder();
      onOrderSaved(response); // Pass the entire response object
      setIsOrderSaved(true);
    } catch (error: any) {}
  };

  const handlePrint = () => {
    const input = document.getElementById("printableArea");
    if (!input) return;

    const previousDisplay = input.style.display;
    input.style.display = "block";

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("receipt.pdf");

      input.style.display = previousDisplay;
    });
  };

  return (
    <Box p={6} bg="#F3F4F6" borderTop="1px" borderColor="#E5E7EB">
      <VStack spacing={4}>
        {!isOrderSaved && (
          <Button color="white" bg="#2563EB" onClick={handleNextStep}>
            Next Step
          </Button>
        )}

        {isOrderSaved && (
          <>
            <Button
              onClick={handlePrint}
              leftIcon={<Icon as={FiPrinter} boxSize={5} />}
            >
              Download PDF
            </Button>
            <Button
              onClick={onClose}
              leftIcon={<Icon as={FiMail} boxSize={5} />}
            >
              Send E-Receipt
            </Button>
            <Button color="white" bg="#2563EB" onClick={onNextStep}>
              Go Ahead
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default FooterActions;
