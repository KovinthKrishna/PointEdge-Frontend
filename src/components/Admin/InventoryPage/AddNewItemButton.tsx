import { Button } from "@chakra-ui/react";
import useModalStore from "../../../store/useModalStore";
import AddNewItem from "./AddNewItem";

const AddNewItemButton = () => {
  const openAddNewItemModal = useModalStore((s) => s.openAddNewItemModal);

  return (
    <>
      <Button
        variant="outline"
        color="darkBlue"
        border="2px"
        _hover={{ bg: "darkBlue", color: "white", borderColor: "darkBlue" }}
        justifyContent="start"
        onClick={openAddNewItemModal}
      >
        Add New Item
      </Button>
      <AddNewItem />
    </>
  );
};

export default AddNewItemButton;
