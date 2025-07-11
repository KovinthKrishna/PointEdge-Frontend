import { Button, HStack } from "@chakra-ui/react";

interface ActionButtonsProps {
  onSubmit: () => void;
  onCancel: () => void;
  disabled?: boolean;
  text1: string;
  text2: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSubmit,
  onCancel,
  disabled,
  text1,
  text2,
}) => (
  <HStack mt={6} spacing={4} justify="flex-end">
    <Button
      variant="outline"
      colorScheme="red"
      onClick={onCancel}
      _hover={{
        bg: "red",
        color: "white",
        borderColor: "red",
      }}
    >
      {text1}
    </Button>
    <Button
      colorScheme="blue"
      bg="darkBlue"
      color="white"
      _hover={{ bg: "blue" }}
      onClick={onSubmit}
      isDisabled={disabled}
    >
      {text2}
    </Button>
  </HStack>
);

export default ActionButtons;
