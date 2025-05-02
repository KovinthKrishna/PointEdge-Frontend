import { Box, Button, Container, Flex, Grid, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"

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
      <Flex p={4} bg={bgCard} borderBottomWidth="1px" justifyContent="flex-end" alignItems="center">
      
        {/* Buttons on the right */}
        <Flex gap={2}>

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

        {/* Shift Details Blocks */}
        <Box mt={8}>
          {shifts.length > 0 ? (
            shifts.map((shift, index) => (
              <Box key={index} mb={6} borderRadius="md" overflow="hidden" boxShadow="sm">
                <Flex
                  bg="#003049"
                  color="white"
                  p={3}
                  fontWeight="bold"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>{shift.shiftType}</Text>
                </Flex>

                <Grid
                  templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                  gap={4}
                  p={4}
                  bg="gray.50"
                >
                  {/* Left Column - Now with 4 rows */}
                  <Box>
                    <Grid templateColumns="1fr" gap={4}>
                      <Flex alignItems="center" bg="#B8D8D8" p={3} borderRadius="md">
                        <Box
                          bg="#003049"
                          color="white"
                          borderRadius="full"
                          w="24px"
                          h="24px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={3}
                        >
                          1
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.600">
                            Start Time:
                          </Text>
                          <Text fontWeight="medium">{shift.startTime}</Text>
                        </Box>
                      </Flex>

                      <Flex alignItems="center" bg="#B8D8D8" p={3} borderRadius="md">
                        <Box
                          bg="#003049"
                          color="white"
                          borderRadius="full"
                          w="24px"
                          h="24px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={3}
                        >
                          2
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.600">
                            End Time:
                          </Text>
                          <Text fontWeight="medium">{shift.endTime}</Text>
                        </Box>
                      </Flex>

                      <Flex alignItems="center" bg="#B8D8D8" p={3} borderRadius="md">
                        <Box
                          bg="#003049"
                          color="white"
                          borderRadius="full"
                          w="24px"
                          h="24px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={3}
                        >
                          3
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.600">
                            Break:
                          </Text>
                          <Text fontWeight="medium">{shift.break}</Text>
                        </Box>
                      </Flex>

                      <Flex alignItems="center" bg="#B8D8D8" p={3} borderRadius="md">
                        <Box
                          bg="#003049"
                          color="white"
                          borderRadius="full"
                          w="24px"
                          h="24px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={3}
                        >
                          4
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.600">
                            Location:
                          </Text>
                          <Text fontWeight="medium">{shift.location}</Text>
                        </Box>
                      </Flex>
                    </Grid>
                  </Box>

                  {/* Middle Column */}
                  <Box>
                    <Grid templateColumns="1fr" gap={4}>
                      <Flex alignItems="center" bg="#B8D8D8" p={3} borderRadius="md">
                        <Box
                          bg="#003049"
                          color="white"
                          borderRadius="full"
                          w="24px"
                          h="24px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={3}
                        >
                          5
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.600">
                            OT Hours:
                          </Text>
                          <Text fontWeight="medium">{shift.otHours}</Text>
                        </Box>
                      </Flex>

                      <Flex alignItems="center" bg="#B8D8D8" p={3} borderRadius="md">
                        <Box
                          bg="#003049"
                          color="white"
                          borderRadius="full"
                          w="24px"
                          h="24px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={3}
                        >
                          6
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.600">
                            Total Hours:
                          </Text>
                          <Text fontWeight="medium">{shift.totalHours}</Text>
                        </Box>
                      </Flex>

                      <Flex alignItems="center" bg="#B8D8D8" p={3} borderRadius="md">
                        <Box
                          bg="#003049"
                          color="white"
                          borderRadius="full"
                          w="24px"
                          h="24px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={3}
                        >
                          7
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.600">
                            Orders:
                          </Text>
                          <Text fontWeight="medium">{shift.orders}</Text>
                        </Box>
                      </Flex>
                    </Grid>
                  </Box>

                  {/* Right Column - Additional Info */}
                  <Box>
                    <Flex direction="column" bg="#B8D8D8" p={3} borderRadius="md" height="50%">
                      <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Notes
                      </Text>
                      <Text>
                        {shift.shiftType} at {shift.location} with {shift.orders} processed. Total working time:{" "}
                        {shift.totalHours} including {shift.otHours} overtime.
                      </Text>
                    </Flex>
                  </Box>
                </Grid>
              </Box>
            ))
          ) : (
            <Box textAlign="center" py={8} bg="#B8D8D8" borderRadius="md">
              <Text fontSize="lg">No shift data available</Text>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}
