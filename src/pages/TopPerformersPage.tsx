import type React from "react"
import { useState } from "react"
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Select,
  Avatar,
  HStack,
} from "@chakra-ui/react"
import { SearchIcon,TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"

// Sample data for top performers
const employeeData = [
  {
    id: "2236767",
    name: "Devon Lane",
    avatar: "https://bit.ly/ryan-florence",
    role: "Cashier",
    orders: 125,
    sales: 91345.0,
    workingHours: "00:00:00",
  },
  {
    id: "2377373",
    name: "Eleanor Pena",
    avatar: "https://bit.ly/kent-c-dodds",
    role: "Cashier",
    orders: 98,
    sales: 56987.0,
    workingHours: "00:00:00",
  },
  {
    id: "2345657",
    name: "Floyd Miles",
    avatar: "https://bit.ly/prosper-baba",
    role: "Cashier",
    orders: 56,
    sales: 24456.56,
    workingHours: "00:00:00",
  },
  {
    id: "2435412",
    name: "Annette Black",
    avatar: "https://bit.ly/code-beast",
    role: "Cashier",
    orders: 51,
    sales: 12567.9,
    workingHours: "00:00:00",
  },
  {
    id: "1657623",
    name: "Guy Hawkins",
    avatar: "https://bit.ly/sage-adebayo",
    role: "Cashier",
    orders: 12,
    sales: 4670.44,
    workingHours: "00:00:00",
  },
  {
    id: "2236767",
    name: "Devon Lane",
    avatar: "https://bit.ly/ryan-florence",
    role: "Cashier",
    orders: 125,
    sales: 91345.0,
    workingHours: "00:00:00",
  },
  {
    id: "2377373",
    name: "Eleanor Pena",
    avatar: "https://bit.ly/kent-c-dodds",
    role: "Cashier",
    orders: 98,
    sales: 56987.0,
    workingHours: "00:00:00",
  },
  {
    id: "2345657",
    name: "Floyd Miles",
    avatar: "https://bit.ly/prosper-baba",
    role: "Cashier",
    orders: 56,
    sales: 24456.56,
    workingHours: "00:00:00",
  },
  {
    id: "2345657",
    name: "Floyd Miles",
    avatar: "https://bit.ly/prosper-baba",
    role: "Cashier",
    orders: 56,
    sales: 24456.56,
    workingHours: "00:00:00",
  },
]

// Sort types
type SortField = "orders" | "sales" | "workingHours"
type SortDirection = "asc" | "desc"

const TopPerformersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Sort and filter data
  const filteredData = [...employeeData]
    .filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || employee.id.includes(searchQuery),
    )
    .sort((a, b) => {
      if (!sortField) return 0

      const aValue = a[sortField]
      const bValue = b[sortField]

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }

  return (
    <Flex justify="center" bg="gray.50" minH="100vh">
      <Box p={4} maxW="1200px" w="100%">
        {/* Filters and Search */}
        <Flex mb={6} justify="space-between" align="center">
          <Box>
            <Select
              placeholder="Show: All Orders"
              w="180px"
              icon={<TriangleDownIcon />}
              bg="white"
              borderColor="gray.300"
            >
              <option value="all">All Orders</option>
              <option value="completed">Completed Orders</option>
              <option value="pending">Pending Orders</option>
            </Select>
          </Box>

          <HStack spacing={2}>
            <Button colorScheme="blue" bg="#003049" _hover={{ bg: "#00253a" }}>
              Search
            </Button>
          </HStack>
        </Flex>

        {/* Search Input */}
        <Box mb={6}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search by name, id, or others..."
              bg="white"
              borderColor="gray.300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Box>

        {/* Employee Performance Table */}
        <Box bg="white" borderRadius="md" overflow="hidden" boxShadow="sm">
          <Table variant="simple" size="md">
            <Thead bg="#003049">
              <Tr>
                <Th
                  color="white"
                  width="200px"
                  py={3}
                  fontWeight="medium"
                  borderBottom="none"
                  textTransform="uppercase"
                >
                  Employee ID
                </Th>
                <Th
                  color="white"
                  width="200px"
                  py={3}
                  fontWeight="medium"
                  borderBottom="none"
                  textTransform="uppercase"
                >
                  Employee name
                </Th>
                <Th
                  color="white"
                  width="120px"
                  py={3}
                  fontWeight="medium"
                  borderBottom="none"
                  textTransform="uppercase"
                >
                  Role
                </Th>
                <Th
                  color="white"
                  width="150px"
                  cursor="pointer"
                  py={3}
                  fontWeight="medium"
                  borderBottom="none"
                  textTransform="uppercase"
                  onClick={() => handleSort("orders")}
                >
                  <Flex align="center">
                    Orders
                    <Box ml={1}>
                      {sortField === "orders" ? (
                        sortDirection === "asc" ? (
                          <TriangleUpIcon boxSize={3} />
                        ) : (
                          <TriangleDownIcon boxSize={3} />
                        )
                      ) : (
                        <TriangleDownIcon boxSize={3} opacity={0.5} />
                      )}
                    </Box>
                  </Flex>
                </Th>
                <Th
                  color="white"
                  width="150px"
                  cursor="pointer"
                  py={3}
                  fontWeight="medium"
                  borderBottom="none"
                  textTransform="uppercase"
                  onClick={() => handleSort("sales")}
                >
                  <Flex align="center">
                    Sales
                    <Box ml={1}>
                      {sortField === "sales" ? (
                        sortDirection === "asc" ? (
                          <TriangleUpIcon boxSize={3} />
                        ) : (
                          <TriangleDownIcon boxSize={3} />
                        )
                      ) : (
                        <TriangleDownIcon boxSize={3} opacity={0.5} />
                      )}
                    </Box>
                  </Flex>
                </Th>
                <Th
                  color="white"
                  width="150px"
                  cursor="pointer"
                  py={3}
                  fontWeight="medium"
                  borderBottom="none"
                  textTransform="uppercase"
                  onClick={() => handleSort("workingHours")}
                >
                  <Flex align="center">
                    Working Hours
                    <Box ml={1}>
                      {sortField === "workingHours" ? (
                        sortDirection === "asc" ? (
                          <TriangleUpIcon boxSize={3} />
                        ) : (
                          <TriangleDownIcon boxSize={3} />
                        )
                      ) : (
                        <TriangleDownIcon boxSize={3} opacity={0.5} />
                      )}
                    </Box>
                  </Flex>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map((employee) => (
                <Tr key={employee.id} borderBottom="1px solid" borderColor="gray.100">
                  <Td py={4}>{employee.id}</Td>
                  <Td py={4}>
                    <Flex align="center">
                      <Avatar size="sm" name={employee.name} src={employee.avatar} mr={3} />
                      <Text fontWeight="medium">{employee.name}</Text>
                    </Flex>
                  </Td>
                  <Td py={4}>{employee.role}</Td>
                  <Td py={4}>{employee.orders} orders</Td>
                  <Td py={4}>{formatCurrency(employee.sales)}</Td>
                  <Td py={4}>{employee.workingHours}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Flex>
  )
}

export default TopPerformersPage;

