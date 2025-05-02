import { SimpleGrid } from "@chakra-ui/react";
import AddNewItemButton from "./AddNewItemButton";
import InventoryPageFilters from "./InventoryPageFilters";
import ToggleHiddenButton from "./ToggleHiddenButton";

const InventoryPageTop = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacingY={5} padding={4}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={5}
        gridTemplateColumns={{
          md: "repeat(2, 1fr)",
          lg: "min-content min-content",
        }}
      >
        <AddNewItemButton />
        <ToggleHiddenButton />
      </SimpleGrid>
      <InventoryPageFilters />
    </SimpleGrid>
  );
};

export default InventoryPageTop;
