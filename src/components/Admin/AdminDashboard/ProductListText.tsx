import { Text } from "@chakra-ui/react";

interface Props {
  value: string | number;
  fontWeight?: "bold";
}

const ProductListText = ({ value, fontWeight }: Props) => {
  return (
    <Text
      fontSize={{ base: 12, md: 16 }}
      minWidth={"18%"}
      maxWidth={"20%"}
      textAlign="center"
      fontWeight={fontWeight}
    >
      {value}
    </Text>
  );
};

export default ProductListText;
