import { Button } from "@chakra-ui/react";

const BarcodeButton = () => {
  return (
    <Button
      variant="outline"
      color="darkBlue"
      border="2px"
      _hover={{
        bg: "darkBlue",
        color: "white",
        borderColor: "darkBlue",
      }}
    >
      Barcode
    </Button>
  );
};

export default BarcodeButton;
