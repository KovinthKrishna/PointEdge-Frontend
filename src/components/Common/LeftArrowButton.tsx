import React from "react";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

// Define the props for LeftArrowButton component
interface LeftArrowButtonProps {
  onClick: () => void; // Callback function for the button click
  boxSize?: number; // Optional prop for the icon size
  color?: string; // Optional prop for icon color
  bg?: string; // Optional prop for button background color
}

const LeftArrowButton: React.FC<LeftArrowButtonProps> = ({
  onClick,
  boxSize = 7, // Default size for icon if not passed
  color = "white", // Default color for the icon
  bg = "#003049", // Default background color for button
}) => {
  return (
    <IconButton
      aria-label="Go Back"
      icon={<ArrowBackIcon boxSize={boxSize} />} // Set icon size
      position="absolute"
      top={4}
      left={4}
      variant="link"
      onClick={onClick}
      boxSize={10} // Set button size
      bg={bg}
      color={color}
      borderRadius="100%"
    />
  );
};

export default LeftArrowButton;
