import React from "react";
import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

export type BankDetails = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  reason?: string;
};

interface Props {
  details: BankDetails;
  onChange: (field: keyof BankDetails, value: string) => void;
}

const CardRefundFields: React.FC<Props> = ({ details, onChange }) => {
  return (
    <VStack spacing={4}>
      <FormControl isRequired>
        <FormLabel>Bank Name</FormLabel>
        <Input
          value={details.bankName}
          onChange={(e) => onChange("bankName", e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Account Number</FormLabel>
        <Input
          value={details.accountNumber}
          onChange={(e) => onChange("accountNumber", e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Account Holder Name</FormLabel>
        <Input
          value={details.accountHolder}
          onChange={(e) => onChange("accountHolder", e.target.value)}
        />
      </FormControl>
    </VStack>
  );
};

export default CardRefundFields;
