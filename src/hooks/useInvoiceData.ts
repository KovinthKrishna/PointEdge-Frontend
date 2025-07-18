import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Invoice,InvoiceItem } from "../models/Invoice";

export const useInvoiceData = (invoiceNumber: string | null) => {
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/return-exchange/invoice/${invoiceNumber}`
        );
        const data = response.data;
        const items: InvoiceItem[] = data.items.map((item: any) => ({
          id: item.id,
          name: item.productName,
          quantity: item.quantity,
          price: item.price,
          returnQuantity: 0,
          refundAmount: 0,
          total: item.quantity * item.price,
        }));

        setInvoiceData({
          invoiceNumber: data.id,
          date: data.date,
          totalAmount: data.totalAmount,
          items,
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch invoice details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (invoiceNumber) fetchInvoice();
  }, [invoiceNumber, toast]);

  return { invoiceData };
};