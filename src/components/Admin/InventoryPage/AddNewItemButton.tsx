import { Button, useDisclosure } from "@chakra-ui/react";
import AddNewItem from "./AddNewItem";

const AddNewItemButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="outline"
        color="darkBlue"
        border="2px"
        _hover={{ bg: "darkBlue", color: "white", borderColor: "darkBlue" }}
        justifyContent="start"
        onClick={onOpen}
      >
        Add New Item
      </Button>
      <AddNewItem isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewItemButton;
