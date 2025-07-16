import React, { useState, useEffect } from "react";
import axios from "axios";
import Customer from "../../models/Customer";
import PopupAlert from "../Common/PopupAlert";
import { Text } from "@chakra-ui/react";

interface DisplayCustomerProps {
  codeOrPhone: string;
  isOpen: boolean;
  onClose: () => void;
}

const DisplayCustomer: React.FC<DisplayCustomerProps> = ({
  codeOrPhone,
  isOpen,
  onClose,
}) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (!codeOrPhone) return;

      try {
        setLoading(true);

        // ✅ Fetch Customer Details by Phone or Code
        const customerRes = await axios.get(
          `http://localhost:8080/api/v1/customers/search?phone=${codeOrPhone}`
        );

        if (customerRes.data?.success && customerRes.data.customer) {
          setCustomer(customerRes.data.customer);

          // ✅ Fetch Discount Details for Customer
          const discountRes = await axios.post(
            "http://localhost:8080/api/v1/discount/calculate-total-discount",
            {
              phone: codeOrPhone,
              items: {}, // Pass required items here if needed
            }
          );

          if (
            discountRes.data?.success &&
            discountRes.data.finalTotalDiscount !== undefined
          ) {
            setTotalDiscount(discountRes.data.finalTotalDiscount);
          }
        }
      } catch (err) {
        console.error("Error fetching customer or discount:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchCustomerDetails();
  }, [codeOrPhone, isOpen]);

  return (
    <PopupAlert
      isOpen={isOpen}
      onClose={onClose}
      status="success"
      title={
        customer ? `${customer.title} ${customer.name}` : "Customer Details"
      }
      description={
        customer ? (
          <>
            <Text mb={2}>
              <strong>Discount Applied:</strong> Rs. {totalDiscount.toFixed(2)}
            </Text>
            <Text>
              <strong>Loyalty Points:</strong> {customer.points}
            </Text>
          </>
        ) : loading ? (
          "Loading customer details..."
        ) : (
          "No customer details found."
        )
      }
    />
  );
};

export default DisplayCustomer;
