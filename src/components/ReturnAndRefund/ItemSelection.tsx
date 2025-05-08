import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  selectedItems,
}) => {
  const [items, setItems] = useState<InvoiceItem[]>(selectedItems);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const filtered = items.filter((item) => item.returnQuantity > 0);
    onSubmit(filtered);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <VStack align="stretch" spacing={6}>
      <InvoiceSummary invoice={invoiceData} />
      <ItemTable items={items} onItemChange={setItems} />
      <RefundSummary items={items} />
      <ActionButtons
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        disabled={items.every((i) => i.returnQuantity === 0)}
        text1="Cancel"
        text2="Next"
      />
    </VStack>
  );
};

export default ItemSelection;
