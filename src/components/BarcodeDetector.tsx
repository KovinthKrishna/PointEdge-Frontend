import { Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import useCustomToast from "../hooks/useCustomToast";
import useProductFormStore from "../store/useProductFormStore";

interface Props {
  label?: string;
  onClose: () => void;
}

const BarcodeDetector = ({ label, onClose }: Props) => {
  const setFormData = useProductFormStore((s) => s.setFormData);
  const toast = useCustomToast();
  const barcodeBuffer = useRef("");

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && barcodeBuffer.current) {
        setFormData("barcode", barcodeBuffer.current);
        barcodeBuffer.current = "";
        if (label) {
          toast.success("Barcode detected successfully");
        }
        onClose();
      } else {
        barcodeBuffer.current += event.key;
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [label, onClose, setFormData, toast]);

  return <Text textAlign="center">{label}</Text>;
};

export default BarcodeDetector;
