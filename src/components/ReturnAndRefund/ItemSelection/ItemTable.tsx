import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
} from "@chakra-ui/react";
import { InvoiceItem } from "../../../models/Invoice";
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
  header7: string;
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
  header7,
}) => {
  const headerBg = "#F4FBFF"; // Sky blue background
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleChange = (index: number, updatedItem: InvoiceItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    onItemChange(updatedItems);
  };

  return (
    <Table
      variant="simple"
      size="md"
      borderRadius="lg"
      overflow="hidden"
      border="1px solid"
      borderColor={borderColor}
      shadow="sm"
      width="100%"
      __css={{ tableLayout: "fixed" }} // Fixed table layout for consistent column widths
    >
      <Thead bg={headerBg}>
        <Tr>
          <Th
            color="black"
            fontSize="sm"
            fontWeight="bold"
            py={4}
            px={6}
            width="200px" // Fixed width for product name
          >
            {header1}
          </Th>
          <Th
            color="black"
            fontSize="sm"
            fontWeight="bold"
            py={4}
            px={6}
            textAlign="center"
            width="120px" // Fixed width for quantity purchased
          >
            {header2}
          </Th>
          <Th
            color="black"
            fontSize="sm"
            fontWeight="bold"
            py={4}
            px={6}
            textAlign="center"
            width="140px" // Fixed width for return quantity
          >
            {header3}
          </Th>
          <Th
            color="black"
            fontSize="sm"
            fontWeight="bold"
            py={4}
            px={6}
            textAlign="center"
            width="120px" // Fixed width for unit price
          >
            {header4}
          </Th>
          <Th
            color="black"
            fontSize="sm"
            fontWeight="bold"
            py={4}
            px={6}
            textAlign="center"
            width="140px" // Fixed width for refund amount
          >
            {header5}
          </Th>
          <Th
            color="black"
            fontSize="sm"
            fontWeight="bold"
            py={4}
            px={6}
            width="250px" // Fixed width for reason
          >
            {header6}
          </Th>
          <Th
            color="black"
            fontSize="sm"
            fontWeight="bold"
            py={4}
            px={6}
            width="140px" // Fixed width for photo
          >
            {header7}
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item, index) => (
          <ReturnItemRow
            key={item.id}
            item={item}
            onChange={(updated) => handleChange(index, updated)}
            isEven={index % 2 === 0}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default ItemTable;
