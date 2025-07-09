import React from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { InvoiceItem } from "../../models/Invoice";

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

interface Props {
  onSubmitForm: (data: BankDetails) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  defaultValues?: BankDetails;
}

const MotionBox = motion(Box);

const CardRefundForm: React.FC<Props> = ({
  onSubmitForm,
  onCancel,
  isSubmitting,
  defaultValues = { bankName: "", accountNumber: "", accountHolder: "" },
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<BankDetails>({
    defaultValues,
    mode: "onChange", // allows realtime validation
  });

  const onSubmit = (data: BankDetails) => {
    onSubmitForm(data);
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      borderWidth={1}
      borderRadius="lg"
      p={6}
      boxShadow="md"
      bg="white"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={5} align="stretch">
          <FormControl isInvalid={!!errors.bankName} isRequired>
            <FormLabel>Bank Name</FormLabel>
            <Input
              placeholder="Ex: People's Bank"
              {...register("bankName", { required: "Bank name is required" })}
            />
            <FormErrorMessage>{errors.bankName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.accountNumber} isRequired>
            <FormLabel>Account Number</FormLabel>
            <Input
              placeholder="Ex: 1234567890"
              {...register("accountNumber", {
                required: "Account number is required",
                pattern: {
                  value: /^[0-9]{6,20}$/,
                  message:
                    "Account number must be digits only (6–20 characters)",
                },
              })}
            />
            <FormErrorMessage>{errors.accountNumber?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.accountHolder} isRequired>
            <FormLabel>Account Holder Name</FormLabel>
            <Input
              placeholder="Ex: John Perera"
              {...register("accountHolder", {
                required: "Account holder name is required",
              })}
            />
            <FormErrorMessage>{errors.accountHolder?.message}</FormErrorMessage>
          </FormControl>

          <HStack justify="flex-end" spacing={4} pt={4}>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={onCancel}
              _hover={{
                bg: "red",
                color: "white",
                borderColor: "red",
              }}
              isDisabled={isSubmitting}
            >
              Back
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              bg="darkBlue"
              color="white"
              _hover={{ bg: "blue" }}
              isLoading={isSubmitting}
              isDisabled={!isValid || isSubmitting}
              opacity={!isValid || isSubmitting ? 0.5 : 1}
              cursor={!isValid || isSubmitting ? "not-allowed" : "pointer"}
            >
              Submit Refund
            </Button>
          </HStack>
        </VStack>
      </form>
    </MotionBox>
  );
};

export default CardRefundForm;
