import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import useModalStore from "../../../store/useModalStore";
import AddNewItemForm from "./AddNewItemForm";

const AddNewItem = () => {
  const isAddNewItemModalOpen = useModalStore((s) => s.isAddNewItemModalOpen);
  const closeAddNewItemModal = useModalStore((s) => s.closeAddNewItemModal);

  return (
    <Modal
      onClose={closeAddNewItemModal}
      isOpen={isAddNewItemModalOpen}
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
