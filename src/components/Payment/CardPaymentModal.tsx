import React, { useState } from "react";
import { VStack, Text, Button, Input } from "@chakra-ui/react";

interface CardPaymentModalProps {
  onClose: () => void;
  onSubmit?: () => void;
}

const CardPaymentModal: React.FC<CardPaymentModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", height: "100%" }}>
      <VStack
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Text fontSize="2xl" fontWeight="bold" color="#0085ca">
          Card Verification
        </Text>
        <Input
          placeholder="Card Number"
          value={cardDetails.number}
          onChange={(e) =>
            setCardDetails({ ...cardDetails, number: e.target.value })
          }
          maxLength={16}
          required
        />
        <Input
          placeholder="Expiry Date (MM/YY)"
          value={cardDetails.expiry}
          onChange={(e) =>
            setCardDetails({ ...cardDetails, expiry: e.target.value })
          }
          maxLength={5}
          required
        />
        <Input
          placeholder="CVV"
          value={cardDetails.cvv}
          onChange={(e) =>
            setCardDetails({ ...cardDetails, cvv: e.target.value })
          }
          maxLength={4}
          required
        />
        <Button mt={8} colorScheme="blue" type="submit">
          Verify Card
        </Button>
      </VStack>
    </form>
  );
};

export default CardPaymentModal;
