import { Button } from "@chakra-ui/react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import useProductsVisibilityStore from "../../../store/useProductsVisibilityStore";

const ToggleHiddenButton = () => {
  const isShowingHiddenProducts = useProductsVisibilityStore(
    (s) => s.isShowingHiddenProducts
  );
  const toggleProductsVisibility = useProductsVisibilityStore(
    (s) => s.toggleProductsVisibility
  );

  return (
    <Button
      leftIcon={isShowingHiddenProducts ? <BiSolidShow /> : <BiSolidHide />}
      variant="outline"
      color="darkBlue"
      justifyContent="start"
      minWidth={200}
      border="2px"
      _hover={{ bg: "darkBlue", color: "white", borderColor: "darkBlue" }}
      onClick={toggleProductsVisibility}
    >
      {isShowingHiddenProducts ? "Show All Items" : "Show Hidden Items"}
    </Button>
  );
};

export default ToggleHiddenButton;
