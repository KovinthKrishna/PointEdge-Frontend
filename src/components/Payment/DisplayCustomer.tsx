import React, { useEffect } from "react";
import Customer from "../../models/Customer";
import PopupAlert from "../Common/PopupAlert";
import { Text } from "@chakra-ui/react";
import { useCustomerStore } from "../../store/useCustomerStore";

interface DisplayCustomerProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  totalDiscount: number;
  loading: boolean;
  status: "success" | "error";
}

const DisplayCustomer: React.FC<DisplayCustomerProps> = ({
  customer,
  totalDiscount,
  isOpen,
  onClose,
  loading,
  status,
}) => {
  const { setCustomerInfo, clearCustomerInfo } = useCustomerStore();

  useEffect(() => {
    if (status === "success" && customer) {
      setCustomerInfo({ name: customer.name, loyaltyPoints: customer.points });
    } else if (status === "error") {
      clearCustomerInfo();
    }
  }, [status, customer, setCustomerInfo, clearCustomerInfo]);

  let title = "";
  let description: React.ReactNode = "";

  if (loading) {
    title = "Loading Customer...";
    description = "Please wait while we fetch customer details.";
  } else if (status === "success" && customer) {
    title = customer.name;
    description = (
      <>
        <Text mb={2}>
          <strong>Discount Applied:</strong> Rs. {totalDiscount.toFixed(2)}
        </Text>
        <Text>
          <strong>Loyalty Points:</strong> {customer.points}
        </Text>
      </>
    );
  } else if (status === "error") {
    title = "Customer Not Found";
    description = "No customer details found for the provided input.";
  }

  return (
    <PopupAlert
      isOpen={isOpen}
      onClose={onClose}
      status={status}
      title={title}
      description={description}
    />
  );
};

export default DisplayCustomer;
