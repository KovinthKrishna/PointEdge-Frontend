import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import BarcodeDetector from "./BarcodeDetector";
import BarcodeScanner from "./BarcodeScanner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BarcodeModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
      size="sm"
    >
      <ModalOverlay />
      <ModalContent border="4px" borderColor="darkBlue" borderRadius={10}>
        <ModalBody pt={4} pb={0}>
          <BarcodeScanner onClose={onClose} />
          <BarcodeDetector label="Scan the barcode" onClose={onClose} />
        </ModalBody>
        <ModalFooter justifyContent={"center"}>
          <Button
            variant="outline"
            color="darkBlue"
            border="2px"
            _hover={{
              bg: "darkBlue",
              color: "white",
              borderColor: "darkBlue",
            }}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BarcodeModal;
