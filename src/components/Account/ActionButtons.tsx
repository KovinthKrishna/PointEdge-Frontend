import React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";

interface ActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
  isSaving: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCancel,
  onSave,
  isSaving,
}) => {
  return (
    <Box textAlign="right" mt={8}>
      <HStack spacing={4} justify="flex-end">
        <Button
          onClick={onCancel}
          bg="#e2e8f0"
          color="#2d3748"
          borderRadius="12px"
          fontWeight="600"
          px={6}
          h="48px"
          _hover={{ bg: "#cbd5e0" }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          isLoading={isSaving}
          bgGradient="linear(to-r, #006dc0ff, #06086fff)"
          color="#ffffff"
          borderRadius="12px"
          fontWeight="600"
          px={6}
          h="48px"
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
          }}
          _active={{ transform: "translateY(0)" }}
          transition="all 0.3s ease"
        >
          Save Changes
        </Button>
      </HStack>
    </Box>
  );
};

export default ActionButtons;
