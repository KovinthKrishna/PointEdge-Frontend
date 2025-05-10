import type React from "react"
import { useState, useEffect } from "react"
import { Box,Flex,Text,Table,Thead,Tbody,Tr,Th,Td,Input,InputGroup,InputLeftElement,Button,Select,Avatar,HStack,Spinner,ChakraProvider,Alert,AlertIcon,
} from "@chakra-ui/react"
import { SearchIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"

// Define employee performance data type
interface EmployeePerformance {
  id: string
  name: string
  avatar: string
  role: string
  orders: number
  sales: number
  workingHours: string
}

// Sort types
type SortField = "orders" | "sales" | "workingHours"
type SortDirection = "asc" | "desc"

const TopPerformersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField | null>("sales") // Default sort by sales
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [employees, setEmployees] = useState<EmployeePerformance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("all")

  // Fetch data from backend based on sort and filter options
  useEffect(() => {
    const fetchEmployeePerformance = async () => {
      setLoading(true)
      setError(null)
      
      try {
        let url = `http://localhost:8080/api/performance/top-performers?sortBy=${sortField || ''}&sortDirection=${sortDirection}`
        
        // Add date range filters if applicable
        if (timeRange === "lastMonth") {
          const today = new Date()
          const lastMonth = new Date()
          lastMonth.setMonth(today.getMonth() - 1)
          
          url += `&startDate=${lastMonth.toISOString().split('T')[0]}&endDate=${today.toISOString().split('T')[0]}`
        } else if (timeRange === "lastWeek") {
          const today = new Date()
          const lastWeek = new Date()
          lastWeek.setDate(today.getDate() - 7)
          
          url += `&startDate=${lastWeek.toISOString().split('T')[0]}&endDate=${today.toISOString().split('T')[0]}`
        }
        
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error("Failed to fetch employee performance data")
        }
        
        const data = await response.json()
        setEmployees(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching data")
        console.error("Error fetching employee performance:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchEmployeePerformance()
  }, [sortField, sortDirection, timeRange])
  
  // Handle search submit
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`http://localhost:8080/api/performance/search?query=${encodeURIComponent(searchQuery)}`)
      
      if (!response.ok) {
        throw new Error("Failed to search employees")
      }
      
      const data = await response.json()
      setEmployees(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while searching")
      console.error("Error searching employees:", err)
    } finally {
      setLoading(false)
    }
  }
  
  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }

  return (
    <ChakraProvider resetCSS>
    <Flex justify="center" bg="gray.50" minH="100vh">
    <Box p={4} maxW="1200px" w="100%">

    
        {/* Filters and Search */}
        <Flex mb={6} justify="space-between" align="center">
          <Box>
            <Select
              placeholder="Show: All Time"
              w="180px"
              icon={<TriangleDownIcon />}
              bg="white"
              borderColor="gray.300"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastWeek">Last Week</option>
            </Select>
          </Box>  
        </Flex>

        {/* Search Input */}
        <Flex mb={6} gap={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search by name, id, or others..."
              bg="white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </InputGroup>
          <HStack spacing={2}>
            <Button 
              color="white"  
              bg="#003049" 
              _hover={{ bg: "#00253a" }}
              onClick={handleSearch}
              isLoading={loading}
            >
              Search
            </Button>
          </HStack>
        </Flex>

        {/* Error Display */}
        {error && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

     {/* Employee Performance Table */}
     <Box bg="white" rounded="md" overflow="hidden" shadow="sm">
      {loading ? (
       <Flex justify="center" align="center" height="200px">
         <Spinner size="xl" color="#003049" />
       </Flex>
      ) : (
      <Table variant="simple">
      <Thead bg="#003049">
        <Tr>
         <Th color="white" width="15%" >EMPLOYEE ID</Th>
         <Th color="white" width="20%" >EMPLOYEE NAME</Th>
         <Th color="white"width="15%">ROLE</Th>
         <Th color="white" width="16%" onClick={() => handleSort("orders")} cursor="pointer">
          <Flex align="center">
            ORDERS
            <Box ml={2} display="inline-flex">
              {sortField === "orders" ? (
                 sortDirection === "asc" ? (
                  <TriangleUpIcon boxSize={3} />
              ) : (
                  <TriangleDownIcon boxSize={3} />
              )
            ) : (
              <Box opacity="0.5">
                <TriangleDownIcon boxSize={3} />
              </Box>
            )}
          </Box>
        </Flex>
      </Th>
       <Th color="white" width="16%" onClick={() => handleSort("sales")} cursor="pointer">
         <Flex align="center">
           SALES
           <Box ml={2} display="inline-flex">
             {sortField === "sales" ? (
               sortDirection === "asc" ? (
                <TriangleUpIcon boxSize={3} />
              ) : (
               <TriangleDownIcon boxSize={3} />
              )
            ) : (
             <Box opacity="0.5">
               <TriangleDownIcon boxSize={3} />
             </Box>
           )}
           </Box>
         </Flex>
       </Th>
       <Th color="white" width="16%" onClick={() => handleSort("workingHours")} cursor="pointer">
        <Flex align="center">
          WORKING HOURS
          <Box ml={2} display="inline-flex">
           {sortField === "workingHours" ? (
              sortDirection === "asc" ? (
                <TriangleUpIcon boxSize={3} />
              ) : (
                <TriangleDownIcon boxSize={3} />
              )
            ) : (
              <Box opacity="0.5">
                <TriangleDownIcon boxSize={3} />
              </Box>
            )}
          </Box>
        </Flex>
       </Th>
     </Tr>
    </Thead>
       <Tbody>
         {employees.length === 0 ? (
           <Tr>
             <Td colSpan={6} textAlign="center" py={6}>
               No employees found
             </Td>
           </Tr>
          ) : (
           employees.map((employee) => (
             <Tr key={employee.id}>
               <Td>{employee.id}</Td>
               <Td>
                 <Flex align="center">
                   <Avatar size="sm" name={employee.name} src={employee.avatar} mr={2} />
                   <Text>{employee.name}</Text>
                 </Flex>
               </Td>
               <Td>{employee.role}</Td>
               <Td>{employee.orders} orders</Td>
               <Td>{formatCurrency(employee.sales)}</Td>
               <Td>{employee.workingHours}</Td>
             </Tr>
           ))
          )}
        </Tbody>
       </Table>
         )}
      </Box>
    </Box>
    </Flex>
    </ChakraProvider>
   
  );
};

export default TopPerformersPage