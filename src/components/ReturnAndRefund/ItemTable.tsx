import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { InvoiceItem } from "../../models/Invoice";
import ReturnItemRow from "./ReturnItemRow";

interface ItemTableProps {
  items: InvoiceItem[];
  onItemChange: (updatedItems: InvoiceItem[]) => void;
  header1: string;
  header2: string;
  header3: string;
  header4: string;
  header5: string;
  header6: string;
}

const ItemTable: React.FC<ItemTableProps> = ({
  items,
  onItemChange,
  header1,
  header2,
  header3,
  header4,
  header5,
  header6,
}) => {
  const handleChange = (index: number, updatedItem: InvoiceItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    onItemChange(updatedItems);
  };

  return (
    <Table variant="striped" colorScheme="blue">
      <Thead bg="lightBlue">
        <Tr>
          <Th color="white">{header1}</Th>
          <Th color="white">{header2}</Th>
          <Th color="white">{header3}</Th>
          <Th color="white">{header4}</Th>
          <Th color="white">{header5}</Th>
          <Th color="white">{header6}</Th>
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
