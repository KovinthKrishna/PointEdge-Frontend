import { Button } from "@chakra-ui/react";

interface ReturnRefundButtonProps {
  onClick: () => void;
}

const ReturnRefundButton: React.FC<ReturnRefundButtonProps> = ({ onClick }) => {
  return (
    <Button
      /* colorScheme="red" */ onClick={onClick}
      variant="outline"
      color="darkBlue"
      border="2px"
      _hover={{
        bg: "darkBlue",
        color: "white",
        borderColor: "darkBlue",
      }}
    >
      Return
    </Button>
  );
};

export default ReturnRefundButton;
