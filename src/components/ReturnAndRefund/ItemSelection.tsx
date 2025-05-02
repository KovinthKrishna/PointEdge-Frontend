import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Invoice, InvoiceItem } from "../../models/Invoice";
import InvoiceSummary from "./InvoiceSummary";
import ItemTable from "./ItemTable";
import RefundSummary from "./RefundSummary";
import ActionButtons from "./ActionButtons";

interface ItemSelectionProps {
  invoiceData: Invoice;
  onSubmit: (items: InvoiceItem[]) => void;
  onCancel: () => void;
  selectedItems: InvoiceItem[];
}

const ItemSelection: React.FC<ItemSelectionProps> = ({
  invoiceData,
  onSubmit,
  onCancel,
  selectedItems,
}) => {
  const [items, setItems] = useState<InvoiceItem[]>(selectedItems);

  const handleSubmit = () => {
    const filtered = items.filter((item) => item.returnQuantity > 0);
    onSubmit(filtered);
  };

  return (
    <VStack align="stretch" spacing={6}>
      <InvoiceSummary invoice={invoiceData} /> {/* Show invoice details */}
      <ItemTable items={items} onItemChange={setItems} />
      <RefundSummary items={items} />
      <ActionButtons
        onSubmit={handleSubmit}
        onCancel={onCancel}
        disabled={items.every((i) => i.returnQuantity === 0)}
      />
    </VStack>
  );
};

export default ItemSelection;
