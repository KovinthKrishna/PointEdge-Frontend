import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

interface PopupAlertProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "error";
  title: string;
  description: string | React.ReactNode;
}

const PopupAlert: React.FC<PopupAlertProps> = ({
  isOpen,
  onClose,
  status,
  title,
  description,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent
        maxW="sm"
        textAlign="center"
        borderRadius="6px"
        borderColor={status === "success" ? "green" : "red"}
        borderWidth={"4px"}
        overflow="hidden"
      >
        <Flex justify="center" mt={8}>
          <Flex
            mt={-5}
            borderRadius="full"
            backgroundColor={"white"}
            padding={4}
            alignItems="center"
            justifyContent="center"
            position="absolute"
          >
            {status === "success" ? (
              <CheckCircleIcon color="green" boxSize={8} />
            ) : (
              <WarningIcon color="red" boxSize={8} />
            )}
          </Flex>
        </Flex>

        <ModalHeader mt={8} fontSize="lg" fontWeight="bold">
          {title}
        </ModalHeader>

        <ModalBody mt={-5}>
          {typeof description === "string" ? (
            <Text>{description}</Text>
          ) : (
            description
          )}
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            onClick={onClose}
            borderRadius="6px"
            px={8}
            color="white"
            bg={status === "success" ? "green" : "red"}
          >
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PopupAlert;
