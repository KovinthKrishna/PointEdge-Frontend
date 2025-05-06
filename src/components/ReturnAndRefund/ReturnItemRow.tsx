import {
  Tr,
  Td,
  NumberInput,
  NumberInputField,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import { InvoiceItem } from "../../models/Invoice";

interface RowProps {
  item: InvoiceItem;
  onChange: (updated: InvoiceItem) => void;
}

const ReturnItemRow: React.FC<RowProps> = ({ item, onChange }) => {
  const handleQtyChange = (_: string, valueAsNumber: number) => {
    const validQty = !isNaN(valueAsNumber)
      ? Math.min(valueAsNumber, item.quantity)
      : 0;
    const refundAmount = validQty * (item.price || 0);
    onChange({
      ...item,
      returnQuantity: validQty,
      refundAmount: refundAmount,
    });
  };

  const hoverBg = useColorModeValue("skyBlue", "gray.700");

  return (
    <Tr
      _hover={{
        bg: hoverBg,
        transition: "background-color 0.2s ease-in-out",
      }}
      fontSize="sm"
    >
      <Td fontWeight="medium" color="darkBlue">
        {item.name}
      </Td>
      <Td>{item.quantity}</Td>
      <Td>
        <NumberInput
          min={0}
          max={item.quantity}
          value={item.returnQuantity || 0}
          onChange={handleQtyChange}
          size="sm"
          width="80px"
          focusBorderColor="blue.400"
        >
          <NumberInputField bg="white" />
        </NumberInput>
      </Td>
      <Td>Rs {(item.price || 0).toFixed(2)}</Td>
      <Td fontWeight="semibold" color="green">
        Rs {(item.refundAmount || 0).toFixed(2)}
      </Td>
      <Td>
        <Textarea
          value={item.reason || ""}
          onChange={(e) => onChange({ ...item, reason: e.target.value })}
          placeholder="Reason"
          size="sm"
        />
      </Td>
    </Tr>
  );
};

export default ReturnItemRow;
