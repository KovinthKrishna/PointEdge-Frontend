import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Product from "../../../models/Product";
import useModalStore from "../../../store/useModalStore";
import UpdateProductForm from "./UpdateProductForm";

interface Props {
  product: Product;
}

const UpdateProduct = ({ product }: Props) => {
  const openUpdateProductId = useModalStore((s) => s.openUpdateProductId);
  const closeUpdateProductModal = useModalStore(
    (s) => s.closeUpdateProductModal
  );

  return (
    <Modal
      onClose={closeUpdateProductModal}
      isOpen={openUpdateProductId === product.id}
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
          Update {product.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingX={{ base: 2, lg: 16 }}>
          <UpdateProductForm product={product} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProduct;
