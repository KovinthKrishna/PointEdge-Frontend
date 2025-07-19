import {
  Tr,
  Td,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  Image,
  VStack,
  Text,
  Box,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  Badge,
  HStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import { InvoiceItem } from "../../models/Invoice";
import { FiUpload, FiCheck, FiAlertCircle } from "react-icons/fi";

interface ReturnItemRowProps {
  item: InvoiceItem;
  onChange: (item: InvoiceItem) => void;
  isEven?: boolean;
}

const ReturnItemRow: React.FC<ReturnItemRowProps> = ({
  item,
  onChange,
  isEven = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{
    quantity?: string;
    reason?: string;
    photo?: string;
  }>({});

  const evenBg = useColorModeValue("gray.50", "gray.700");
  const oddBg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("blue.50", "blue.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const validateField = (field: string, value: any) => {
    const newErrors = { ...errors };

    switch (field) {
      case "quantity":
        if (item.returnQuantity > 0 && item.returnQuantity > item.quantity) {
          newErrors.quantity = `Cannot exceed available quantity (${item.quantity})`;
        } else {
          delete newErrors.quantity;
        }
        break;
      case "reason":
        if (item.returnQuantity > 0 && (!value || value.trim() === "")) {
          newErrors.reason = "Reason is required when returning items";
        } else {
          delete newErrors.reason;
        }
        break;
      case "photo":
        if (item.returnQuantity > 0 && !item.returnPhoto) {
          //newErrors.photo = "Photo is required when returning items";
        } else {
          delete newErrors.photo;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleQuantityChange = (value: string) => {
    let quantity = parseInt(value);
    if (isNaN(quantity)) quantity = 0;
    if (quantity < 0) quantity = 0;
    if (quantity > item.quantity) quantity = item.quantity;

    const refundAmount = quantity * item.price;
    const updatedItem = {
      ...item,
      returnQuantity: quantity,
      refundAmount,
    };

    onChange(updatedItem);
    validateField("quantity", quantity);
    validateField("reason", item.reason);
    validateField("photo", item.returnPhoto);
  };

  const handleReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onChange({
      ...item,
      reason: value,
    });
    validateField("reason", value);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      onChange({
        ...item,
        returnPhoto: file,
        photoPreviewUrl: previewUrl,
      });
      validateField("photo", file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const hasReturnQuantity = item.returnQuantity > 0;
  const isComplete =
    hasReturnQuantity && item.reason?.trim() && item.returnPhoto;

  return (
    <Tr
      bg={isEven ? evenBg : oddBg}
      _hover={{ bg: hoverBg }}
      transition="background-color 0.2s"
      borderBottom="1px solid"
      borderColor={borderColor}
      height="120px" // Fixed row height
    >
      {/* Product Name Column - Fixed width */}
      <Td fontWeight="semibold" py={4} px={6} width="200px" verticalAlign="top">
        <VStack align="start" spacing={1} height="80px">
          <Text fontSize="sm" lineHeight="1.2" noOfLines={2}>
            {item.name}
          </Text>
          {hasReturnQuantity && (
            <Badge
              colorScheme={isComplete ? "green" : "yellow"}
              size="sm"
              variant="subtle"
              mt={1}
            >
              <HStack spacing={1}>
                <Icon as={isComplete ? FiCheck : FiAlertCircle} boxSize={3} />
                <Text fontSize="xs">
                  {isComplete ? "Complete" : "Incomplete"}
                </Text>
              </HStack>
            </Badge>
          )}
        </VStack>
      </Td>

      {/* Quantity Purchased Column - Fixed width */}
      <Td textAlign="center" py={4} px={6} width="120px" verticalAlign="top">
        <Badge colorScheme="blue" variant="outline" fontSize="sm">
          {item.quantity}
        </Badge>
      </Td>

      {/* Return Quantity Column - Fixed width */}
      <Td py={4} px={6} width="140px" verticalAlign="top">
        <FormControl isInvalid={!!errors.quantity}>
          <NumberInput
            size="sm"
            min={0}
            max={item.quantity}
            value={item.returnQuantity}
            onChange={handleQuantityChange}
            focusBorderColor="blue.400"
          >
            <NumberInputField
              textAlign="center"
              fontWeight="semibold"
              bg={hasReturnQuantity ? "blue.50" : "white"}
              _focus={{
                bg: "white",
                boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
              }}
              height="32px" // Fixed input height
            />
          </NumberInput>
          {/* Fixed space for error message */}
          <Box height="16px" mt={1}>
            {errors.quantity && (
              <FormErrorMessage fontSize="xs" mt={0}>
                {errors.quantity}
              </FormErrorMessage>
            )}
          </Box>
        </FormControl>
      </Td>

      {/* Unit Price Column - Fixed width */}
      <Td textAlign="center" py={4} px={6} width="120px" verticalAlign="top">
        <Text fontWeight="medium" fontSize="sm">
          Rs. {item.price.toFixed(2)}
        </Text>
      </Td>

      {/* Refund Amount Column - Fixed width */}
      <Td textAlign="center" py={4} px={6} width="140px" verticalAlign="top">
        <Box
          p={2}
          bg={hasReturnQuantity ? "green.50" : "gray.50"}
          rounded="md"
          border="1px solid"
          borderColor={hasReturnQuantity ? "green.200" : "gray.200"}
          height="40px" // Fixed height
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontWeight="bold"
            color={hasReturnQuantity ? "green.700" : "gray.500"}
            fontSize="sm"
          >
            Rs. {(item.returnQuantity * item.price).toFixed(2)}
          </Text>
        </Box>
      </Td>

      {/* Reason Column - Fixed width */}
      <Td py={4} px={6} width="250px" verticalAlign="top">
        <FormControl isInvalid={!!errors.reason}>
          <Textarea
            size="sm"
            value={item.reason || ""}
            onChange={handleReasonChange}
            placeholder="Enter return reason..."
            resize="none"
            rows={2}
            focusBorderColor="blue.400"
            bg={hasReturnQuantity ? "yellow.50" : "white"}
            _focus={{ bg: "white" }}
            _placeholder={{ color: "gray.400" }}
            height="60px" // Fixed textarea height
          />
          {/* Fixed space for error message */}
          <Box height="16px" mt={1}>
            {errors.reason && (
              <FormErrorMessage fontSize="xs" mt={0}>
                {errors.reason}
              </FormErrorMessage>
            )}
          </Box>
        </FormControl>
      </Td>

      {/* Photo Column - Fixed width */}
      <Td py={4} px={6} width="140px" verticalAlign="top">
        <FormControl isInvalid={!!errors.photo}>
          <VStack spacing={2} align="stretch" height="80px">
            <Button
              size="sm"
              variant="outline"
              colorScheme={item.returnPhoto ? "green" : "blue"}
              onClick={handleUploadClick}
              leftIcon={<Icon as={item.returnPhoto ? FiCheck : FiUpload} />}
              bg={
                item.returnPhoto
                  ? "green.50"
                  : hasReturnQuantity
                  ? "purple.50"
                  : "white"
              }
              _hover={{
                bg: item.returnPhoto ? "green.100" : "purple.100",
              }}
              fontSize="xs"
              height="32px" // Fixed button height
            >
              {item.returnPhoto ? "Change Photo" : "Upload Photo"}
            </Button>

            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              display="none"
            />

            {item.photoPreviewUrl && (
              <Box
                position="relative"
                border="2px solid"
                borderColor="green.200"
                borderRadius="md"
                overflow="hidden"
                bg="white"
                shadow="sm"
                height="40px" // Fixed preview height
                width="60px"
              >
                <Image
                  src={item.photoPreviewUrl}
                  alt="Return photo preview"
                  height="100%"
                  width="100%"
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  bg="green.500"
                  color="white"
                  borderRadius="full"
                  p={0.5}
                >
                  <Icon as={FiCheck} boxSize={2} />
                </Box>
              </Box>
            )}
          </VStack>
          {/* Fixed space for error message */}
          <Box height="16px" mt={1}>
            {errors.photo && (
              <FormErrorMessage fontSize="xs" mt={0}>
                {errors.photo}
              </FormErrorMessage>
            )}
          </Box>
        </FormControl>
      </Td>
    </Tr>
  );
};

export default ReturnItemRow;
