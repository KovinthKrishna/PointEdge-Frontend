import { Button, HStack } from "@chakra-ui/react";

interface ActionButtonsProps {
  onSubmit: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSubmit,
  onCancel,
  disabled,
}) => (
  <HStack mt={6} spacing={4} justify="flex-end">
    <Button variant="outline" colorScheme="red" onClick={onCancel}>
      Cancel
    </Button>
    <Button
      colorScheme="blue"
      bg="darkBlue"
      color="white"
      _hover={{ bg: "blue" }}
      onClick={onSubmit}
      isDisabled={disabled}
    >
      Next
    </Button>
  </HStack>
);

export default ActionButtons;
