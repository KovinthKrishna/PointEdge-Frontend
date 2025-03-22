import { Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import useCustomToast from "../hooks/useCustomToast";
import useProductFormStore from "../store/useProductFormStore";

interface Props {
  isAdmin: boolean;
  onClose: () => void;
}

const BarcodeDetector = ({ isAdmin, onClose }: Props) => {
  const setFormData = useProductFormStore((s) => s.setFormData);
  const toast = useCustomToast();
  const barcodeBuffer = useRef("");

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && barcodeBuffer.current) {
        setFormData("barcode", barcodeBuffer.current);
        barcodeBuffer.current = "";
        if (isAdmin) {
          toast.success("Barcode detected successfully");
        }
        onClose();
      } else {
        barcodeBuffer.current += event.key;
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [isAdmin, onClose, setFormData, toast]);

  return isAdmin && <Text textAlign="center">Scan the barcode</Text>;
};

export default BarcodeDetector;
