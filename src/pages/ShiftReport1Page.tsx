"use client"

import { useState } from "react"
import type React from "react"
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Input,
  InputGroup,
  InputLeftElement,
  Tr,
  Th,
  Td,
  ChakraProvider,
  Image,
  Button,
  Grid,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import ShiftReport2Page from "./ShiftReport2Page"
import clockIcon from "../assets/clock-icon.png";

// Sample data for the shift report
const employeeData = [
  {
    id: "2236767",
    name: "Devon Lane",
    avatar: "https://bit.ly/ryan-florence",
    role: "Cashier",
    location: "Store 1",
    isFirstRow: true,
  },
  {
    id: "2377373",
    name: "Eleanor Pena",
    avatar: "https://bit.ly/kent-c-dodds",
    role: "Cashier",
    location: "Store 1",
    isFirstRow: false,
  },
  {
    id: "2345657",
    name: "Floyd Miles",
    avatar: "https://bit.ly/prosper-baba",
    role: "Cashier",
    location: "Store 2",
    isFirstRow: false,
  },
  {
    id: "2435412",
    name: "Annette Black",
    avatar: "https://bit.ly/code-beast",
    role: "Cashier",
    location: "Store 3",
    isFirstRow: false,
  },
  {
    id: "2435412",
    name: "Annette Black",
    avatar: "https://bit.ly/code-beast",
    role: "Cashier",
    location: "Store 3",
    isFirstRow: false,
  },
  {
    id: "2377373",
    name: "Eleanor Pena",
    avatar: "https://bit.ly/kent-c-dodds",
    role: "Cashier",
    location: "Store 1",
    isFirstRow: false,
  },
]

const ShiftReport1Page: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [showDetailedReport, setShowDetailedReport] = useState<boolean>(false)

  const handleViewClick = (employee: any) => {
    setSelectedEmployee(employee)
    setShowDetailedReport(true)
  }

  const handleBackClick = () => {
    setShowDetailedReport(false)
    setSelectedEmployee(null)
  }
   const bgCard = useColorModeValue("white", "gray.800")

  // If detailed report is being shown, render the ShiftReport2Page component
  if (showDetailedReport && selectedEmployee) {
    return <ShiftReport2Page employee={selectedEmployee} onBackClick={handleBackClick} />
  }

  return (
    <ChakraProvider >
    <Box p={4} bg="gray.50">
      {/* Stats Cards */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={6}>
        <StatCard
          icon={
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvFMn2nGymlFQAfR9KgpQ1EY52G6bsqM8azQ&s"
              alt="Shift Icon"
              boxSize="36px"
            />
          }
          title="Total Shifts"
          value="556"
          change={10}
        />
        <StatCard
          icon={
            <Image
              src={clockIcon}
              alt="Time Icon"
              boxSize="36px"
            />
          }
          title="Total Working Hours"
          value="160h"
          change={10}
        />
        <StatCard
          icon={
            <Image src="https://cdn-icons-png.flaticon.com/512/8997/8997159.png" alt="Calender Icon" boxSize="35px" />
          }
          title="Working Days"
          value="10"
          change={10}
        />
      </Grid>

    

      <Flex p={4} bg={bgCard} borderBottomWidth="1px" flexWrap="wrap" gap={2} alignItems="center">

      <InputGroup flex="1" minW="200px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input placeholder="Search by type,time, or others..." borderColor="gray.200" />
        </InputGroup>

        <Button bg="#003049" color="white" _hover={{ bg: "#00253a" }}>
          Search
        </Button>
        </Flex>
      {/* Employee Shift Table */}
      <Box bg="white" borderRadius="md" overflow="hidden" boxShadow="sm">
        <Table variant="simple">
          <Thead bg="#003049">
            <Tr>
              <Th color="white">Employee ID</Th>
              <Th color="white">Employee name</Th>
              <Th color="white">Role</Th>
              <Th color="white">Location</Th>
              <Th color="white">Detailed Report</Th>
            </Tr>
          </Thead>
          <Tbody>
             {employeeData.map((employee, index) => (
            <Tr key={`${employee.id}-${index}`}>
              <Td>{employee.id}</Td>
              <Td>
              {/* Removed Avatar, keeping only the name with consistent styling */}
               <Text fontWeight="medium">{employee.name}</Text>
              </Td>
              <Td>{employee.role}</Td>
              <Td>{employee.location}</Td>
              <Td>
               <Button
                  size="sm"
                  _hover={{
                  bg: "#00253a",
                  color: "white",
                  transform: "scale(1.05)",
                  boxShadow: "md",
               }}
               transition="all 0.2s"
               borderRadius="full"
               px={6}
               onClick={() => handleViewClick(employee)}
              >
               View
             </Button>
           </Td>
         </Tr>
         ))}
        </Tbody>
        </Table>
      </Box>
      </Box>
      </ChakraProvider>
    
  )
}

// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string
  change: number
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change }) => {
  return (
    <Box bg="white" p={4} borderRadius="md" boxShadow="sm" border="1px">
      <Flex justify="space-between" mb={4}>
        <Box p={2} borderRadius="full" bg="blue.50" color="blue.500" fontSize="xl">
          {icon}
        </Box>
      </Flex>
      <Text color="gray.500" fontSize="sm">
        {title}
      </Text>
      <Stat mt={1}>
        <StatNumber fontSize="2xl">{value}</StatNumber>
        <StatHelpText fontSize="xs" color="blue.500">
          <StatArrow type="increase" />
          {change}% from last week
        </StatHelpText>
      </Stat>
    </Box>
  )
}

export default ShiftReport1Page
