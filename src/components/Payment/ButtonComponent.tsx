import React from "react";
import { Button } from "@chakra-ui/react";

interface ButtonComponentProps {
  text: string;
  onClick: () => void;
  mt?: number | string;
  colorScheme?: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  onClick,
  mt = 8,
  colorScheme = "blue",
}) => (
  <Button
    mt={mt}
    bg="#003049"
    color="white"
    onClick={onClick}
    width="8%"
    fontSize="lg"
  >
    {text}
  </Button>
);

export default ButtonComponent;
