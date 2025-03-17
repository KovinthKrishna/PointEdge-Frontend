import { Box, Button, Image, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import productImage from "../../../assets/product-image.png";
import useProductFormStore from "../../../store/useProductFormStore";

const MAX_FILE_SIZE = 1024 * 1024;

const ProductImageUpload = () => {
  const existingImageUrl = useProductFormStore((s) => s.existingImageUrl);
  const newImageFile = useProductFormStore((s) => s.newImageFile);
  const setFormData = useProductFormStore((s) => s.setFormData);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size must be less than 1MB");
        return;
      }
      setError(null);
      setFormData("newImageFile", file);
    }
  };

  useEffect(() => {
    let objectUrl: string | null = null;

    if (newImageFile) {
      objectUrl = URL.createObjectURL(newImageFile);
      setSelectedImage(objectUrl);
    } else {
      setSelectedImage(existingImageUrl);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [newImageFile, existingImageUrl]);

  return (
    <VStack>
      <Image
        src={selectedImage || productImage}
        aspectRatio={1}
        objectFit="contain"
        border="2px"
        borderColor="darkBlue"
        borderRadius={12}
        width={250}
      />
      <Box minHeight={6}>{error && <Text color="red">{error}</Text>}</Box>
      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        display="none"
      />
      <Button
        variant="outline"
        color="darkBlue"
        border="2px"
        _hover={{ bg: "darkBlue", color: "white", borderColor: "darkBlue" }}
        width={150}
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        Upload Image
      </Button>
      <Box minHeight={10} marginY={2}>
        {selectedImage && (
          <Button
            variant="outline"
            color="darkBlue"
            border="2px"
            _hover={{ bg: "darkBlue", color: "white", borderColor: "darkBlue" }}
            width={150}
            onClick={() => {
              setFormData("existingImageUrl", null);
              setFormData("newImageFile", null);
            }}
          >
            Remove Image
          </Button>
        )}
      </Box>
    </VStack>
  );
};

export default ProductImageUpload;
