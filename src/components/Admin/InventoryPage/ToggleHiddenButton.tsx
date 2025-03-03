import { Button } from "@chakra-ui/react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import useHiddenItemsStore from "../../../store/useHiddenItemsStore";

const ToggleHiddenButton = () => {
  const showHiddenItem = useHiddenItemsStore((s) => s.showHiddenItem);
  const toggleShowHiddenItem = useHiddenItemsStore(
    (s) => s.toggleShowHiddenItem
  );

  return (
    <Button
      leftIcon={showHiddenItem ? <BiSolidShow /> : <BiSolidHide />}
      variant="outline"
      color="darkBlue"
      justifyContent="start"
      minWidth={200}
      border="2px"
      _hover={{ bg: "darkBlue", color: "white", borderColor: "darkBlue" }}
      onClick={toggleShowHiddenItem}
    >
      {showHiddenItem ? "Show All Items" : "Show Hidden Items"}
    </Button>
  );
};

export default ToggleHiddenButton;
