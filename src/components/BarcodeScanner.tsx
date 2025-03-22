import { Box } from "@chakra-ui/react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef } from "react";
import useCustomToast from "../hooks/useCustomToast";
import useProductFormStore from "../store/useProductFormStore";

const BarcodeScanner = ({ onClose }: { onClose: () => void }) => {
  const setFormData = useProductFormStore((s) => s.setFormData);
  const toast = useCustomToast();
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText: string) => {
          setFormData("barcode", decodedText);
          toast.success("Barcode scanned successfully");
          onClose();
        },
        () => {}
      );

      scannerRef.current = scanner;
    }, 10);

    return () => {
      clearTimeout(timer);
      scannerRef.current?.clear().catch(console.error);
    };
  }, [onClose, setFormData, toast]);

  return <Box id="qr-reader"></Box>;
};

export default BarcodeScanner;
