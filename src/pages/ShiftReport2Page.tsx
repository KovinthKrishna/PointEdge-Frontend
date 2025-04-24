import { useState } from "react"
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react"
import { ArrowBackIcon, CalendarIcon } from "@chakra-ui/icons"
import { SingleDatepicker } from "chakra-dayzed-datepicker"

// Define types for props
interface Employee {
  id: string
  name: string
  avatar: string
  role: string
  location: string
  isFirstRow: boolean
}

interface ShiftReport2PageProps {
  employee: Employee
  onBackClick: () => void
}

export default function ShiftReport2Page({ employee, onBackClick }: ShiftReport2PageProps) {
  const [fromDate, setFromDate] = useState<Date>(new Date("2024-12-26"))
  const [toDate, setToDate] = useState<Date>(new Date("2024-12-30"))

  const bgHeader = useColorModeValue("#003049", "#003049")
  const bgCard = useColorModeValue("white", "gray.800")

  // Sample shift data based on employee ID
  const getShiftData = (employeeId: string) => {
    const shiftData: Record<string, any[]> = {
      "2377373": [
        {
          shiftType: "Morning Shift",
          startTime: "08:30:00",
          endTime: "12:30:00",
          break: "00:30:00",
          otHours: "02:00:00",
          location: "Store 1",
          totalHours: "05:30:00",
          orders: "125 orders",
        },
        {
          shiftType: "Evening Shift",
          startTime: "15:00:00",
          endTime: "18:00:00",
          break: "00:10:00",
          otHours: "02:00:00",
          location: "Store 2",
          totalHours: "06:00:00",
          orders: "98 orders",
        },
      ],
      "2236767": [
        {
          shiftType: "Morning Shift",
          startTime: "07:00:00",
          endTime: "11:30:00",
          break: "00:20:00",
          otHours: "01:00:00",
          location: "Store 1",
          totalHours: "04:30:00",
          orders: "110 orders",
        },
      ],
      "2345657": [
        {
          shiftType: "Evening Shift",
          startTime: "14:00:00",
          endTime: "20:00:00",
          break: "00:45:00",
          otHours: "01:30:00",
          location: "Store 2",
          totalHours: "06:45:00",
          orders: "145 orders",
        },
      ],
      "2435412": [
        {
          shiftType: "Night Shift",
          startTime: "20:00:00",
          endTime: "02:00:00",
          break: "00:30:00",
          otHours: "00:00:00",
          location: "Store 3",
          totalHours: "06:30:00",
          orders: "78 orders",
        },
      ],
    }

    return shiftData[employeeId] || []
  }

  const shifts = getShiftData(employee?.id)

  return (
    <Box minH="100vh" bg="gray.50">
    {/* Search Bar */}
    <Flex p={4} bg={bgCard} borderBottomWidth="1px" justifyContent="space-between" alignItems="center">
        {/* Left side element */}
        <Select placeholder="Type" defaultValue="All Types" w="180px" bg="white">
          <option value="all">All Types</option>
          <option value="morning">Morning Shift</option>
          <option value="evening">Evening Shift</option>
        </Select>

        {/* Right side elements */}
        <Flex gap={2} alignItems="center" flexWrap="wrap">
          <Box position="relative" w="180px">
            <SingleDatepicker
              name="from-date"
              date={fromDate}
              onDateChange={setFromDate}
              propsConfigs={{
                inputProps: {
                  placeholder: "From",
                  size: "md",
                  bg: "white",
                },
                popoverCompProps: {
                  popoverBodyProps: {
                    bg: "white",
                    border: "1px solid",
                    borderColor: "gray.200",
                    shadow: "md",
                    rounded: "md",
                  },
                },
              }}
            />
            <Box
              position="absolute"
              right="10px"
              top="50%"
              transform="translateY(-50%)"
              pointerEvents="none"
              zIndex="1"
            >
              <CalendarIcon color="gray.400" />
            </Box>
          </Box>

          <Box position="relative" w="180px">
            <SingleDatepicker
              name="to-date"
              date={toDate}
              onDateChange={setToDate}
              propsConfigs={{
                inputProps: {
                  placeholder: "To",
                  size: "md",
                  bg: "white",
                },
                popoverCompProps: {
                  popoverBodyProps: {
                    bg: "white",
                    border: "1px solid",
                    borderColor: "gray.200",
                    shadow: "md",
                    rounded: "md",
                  },
                },
              }}
            />
            <Box
              position="absolute"
              right="10px"
              top="50%"
              transform="translateY(-50%)"
              pointerEvents="none"
              zIndex="1"
            >
              <CalendarIcon color="gray.400" />
            </Box>
          </Box>

          <Button bg="#003049" color="white" _hover={{ bg: "#00253a" }}>
            Search
          </Button>

          <Button
             variant="outline"
             leftIcon={<ArrowBackIcon />}
             onClick={onBackClick}
            color="#003049"
            borderRadius="md"
            size="md"
            fontWeight="normal"
             _hover={{
             bg: "#D3D3D3",
          }}
          >
             Back
         </Button>
       </Flex>
      </Flex>

      {/* Header */}
      <Box bg={bgHeader} color="white" py={8} px={4} textAlign="center">
        <Heading as="h1" size="xl">
          Shift Report
        </Heading>
      </Box>

      {/* Employee Info */}
      <Container maxW="6xl" p={4}>
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={{ base: 6, md: 10 }}
          mb={6}
        >
          <Box w="170px" h="170px" borderRadius="full" overflow="hidden">
            <Image
              src={employee?.avatar || "https://bit.ly/kent-c-dodds"}
              alt="Employee profile"
              objectFit="cover"
              w="full"
              h="full"
            />
          </Box>

          <Box flex="1" bg="#0077b6" color="white" p={6} borderRadius="md" maxW={{ base: "100%", md: "500px" }}>
            <Grid templateColumns="auto 1fr" columnGap={6} rowGap={4} fontSize="2xl">
              <Text>Name</Text>
              <Text fontWeight="normal">: {employee?.name || "Eleanor Pena"}</Text>
              <Text>ID</Text>
              <Text fontWeight="normal">: {employee?.id || "2377373"}</Text>
              <Text>Role</Text>
              <Text fontWeight="normal">: {employee?.role || "Cashier"}</Text>
            </Grid>
          </Box>
        </Flex>

        {/* Shift Table */}
        <Box overflowX="auto">
          <Table variant="simple" w="full">
            <Thead>
              <Tr bg="#003049">
                <Th color="white">Shift Type</Th>
                <Th color="white">Start Time</Th>
                <Th color="white">End Time</Th>
                <Th color="white">Break</Th>
                <Th color="white">OT Hours</Th>
                <Th color="white">Location</Th>
                <Th color="white">Total Hours</Th>
                <Th color="white">Orders</Th>
              </Tr>
            </Thead>
            <Tbody>
              {shifts.length > 0 ? (
                shifts.map((shift, index) => (
                  <Tr key={index} _hover={{ bg: "gray.50" }}>
                    <Td>{shift.shiftType}</Td>
                    <Td>{shift.startTime}</Td>
                    <Td>{shift.endTime}</Td>
                    <Td>{shift.break}</Td>
                    <Td>{shift.otHours}</Td>
                    <Td>{shift.location}</Td>
                    <Td>{shift.totalHours}</Td>
                    <Td>{shift.orders}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={8} textAlign="center" py={4}>
                    No shift data available
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Box>
  )
}
