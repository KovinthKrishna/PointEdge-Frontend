import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import AddNewItemForm from "./AddNewItemForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewItem = ({ isOpen, onClose }: Props) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      closeOnOverlayClick={false}
      scrollBehavior="inside"
      size={{ base: "md", lg: "4xl" }}
    >
      <ModalOverlay />
      <ModalContent
        border="8px"
        mx={{ base: 2, md: "auto" }}
        borderColor="darkBlue"
        borderRadius={24}
      >
        <ModalHeader textAlign="center" fontSize={32}>
          Add New Item
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingX={{ base: 2, lg: 16 }}>
          <AddNewItemForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddNewItem;
