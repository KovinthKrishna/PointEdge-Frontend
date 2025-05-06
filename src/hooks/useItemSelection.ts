import { useState } from "react";
import { InvoiceItem } from "../models/Invoice";

export const useItemSelection = (initialItems: InvoiceItem[] = []) => {
  const [selectedItems, setSelectedItems] = useState<InvoiceItem[]>(initialItems);

  const updateSelectedItems = (items: InvoiceItem[]) => {
    setSelectedItems(items);
  };

  const totalRefundAmount = selectedItems.reduce(
    (sum, item) => sum + item.refundAmount,
    0
  );

  return { selectedItems, updateSelectedItems, totalRefundAmount };
};