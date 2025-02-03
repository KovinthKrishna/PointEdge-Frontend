import { Table, Thead, Tbody, Tr, Th, Td, Button, VStack } from "@chakra-ui/react";

const DataTable = () => {
  return (
    <VStack spacing={4} width="100%" padding={4}>
      <Table variant="simple" width="100%">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Age</Th>
            <Th>City</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>John Doe</Td>
            <Td>28</Td>
            <Td>New York</Td>
          </Tr>
          <Tr>
            <Td>Jane Smith</Td>
            <Td>32</Td>
            <Td>Los Angeles</Td>
          </Tr>
        </Tbody>
      </Table>
      <Button colorScheme="lightBlue" width="full">
        Add Record
      </Button>
    </VStack>
  );
};

export default DataTable;
