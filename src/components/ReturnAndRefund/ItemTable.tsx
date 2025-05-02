import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { InvoiceItem } from "../../models/Invoice";
import ReturnItemRow from "./ReturnItemRow";

interface ItemTableProps {
  items: InvoiceItem[];
  onItemChange: (updatedItems: InvoiceItem[]) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ items, onItemChange }) => {
  const handleChange = (index: number, updatedItem: InvoiceItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    onItemChange(updatedItems);
  };

  return (
    <Table variant="striped" colorScheme="blue">
      <Thead bg="lightBlue">
        <Tr>
          <Th color="white">Item</Th>
          <Th color="white">Qty Purchased</Th>
          <Th color="white">Qty to Return</Th>
          <Th color="white">Unit Price</Th>
          <Th color="white">Refund</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item, index) => (
          <ReturnItemRow
            key={item.id}
            item={item}
            onChange={(updated) => handleChange(index, updated)}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default ItemTable;
