import { Button, useDisclosure } from "@chakra-ui/react";
import BarcodeModal from "./BarcodeModal";

const BarcodeButton = ({ isAdmin }: { isAdmin: boolean }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="outline"
        color="darkBlue"
        border="2px"
        height={isAdmin ? "40px" : "48px"}
        minWidth={100}
        _hover={{
          bg: "darkBlue",
          color: "white",
          borderColor: "darkBlue",
        }}
        onClick={onOpen}
      >
        Barcode
      </Button>
      <BarcodeModal isAdmin={isAdmin} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default BarcodeButton;
