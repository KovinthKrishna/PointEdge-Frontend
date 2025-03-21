import { Button, useDisclosure } from "@chakra-ui/react";
import BarcodeModal from "./BarcodeModal";

const BarcodeButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="outline"
        color="darkBlue"
        border="2px"
        _hover={{
          bg: "darkBlue",
          color: "white",
          borderColor: "darkBlue",
        }}
        onClick={onOpen}
      >
        Barcode
      </Button>
      <BarcodeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default BarcodeButton;
