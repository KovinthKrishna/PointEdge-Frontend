import { useState, useEffect } from 'react';
import {
  Box, Flex, Input, InputGroup, InputLeftElement, Button,
  Table, Thead, Tbody, Tr, Th, Td, Avatar, Text, Badge, 
  Grid, GridItem, HStack, ChakraProvider, Spinner, useToast
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { getAttendances, searchAttendances } from '../../services/apiService';

// Define interfaces
interface AttendanceDTO {
  employeeId: number;
  employeeName: string;
  role: string;
  clockIn: string;
  clockOut: string;
  totalHours: string;
  otHours: string;
  status: string;
  avatar: string;
  date: string;
}

interface EmployeeAttendance {
  id: number;
  attendanceId: number;
  name: string;
  role: string;
  clockIn: string;
  clockOut: string;
  totalHours: string;
  otHours: string;
  status: string;
  avatar: string;
}

const EmployeeAttendancePage = () => {
  const [employeeAttendances, setEmployeeAttendances] = useState<EmployeeAttendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState('07:30:00');
  const [endTime, setEndTime] = useState('16:00:00');
  const [searchQuery, setSearchQuery] = useState('');
  
  const toast = useToast();
  
  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);
  
  // Format date helper
  const formatDateForBackend = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };
  
  // Fetch attendance data
  const fetchData = async () => {
    setLoading(true);
    try {
      const attendanceData = await getAttendances();
      
      const formattedData = attendanceData.map((att: AttendanceDTO) => ({
        id: att.employeeId,
        name: att.employeeName,
        role: att.role,
        clockIn: att.clockIn || '-',
        clockOut: att.clockOut || '-',
        totalHours: att.totalHours || '0:00:00',
        otHours: att.otHours || '0:00:00',
        status: att.status,
        avatar: att.avatar,
        date: att.date
      }));
      
      setEmployeeAttendances(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error fetching data',
        description: 'Could not load attendance data. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle search
  // Handle search
const handleSearch = async () => {
  setLoading(true);
  try {
    // Check if searchQuery is a number (employee ID)
    const isNumeric = /^\d+$/.test(searchQuery);
    
    const searchData = {
      date: formatDateForBackend(date),
      searchQuery: isNumeric ? '' : searchQuery,
      employeeId: isNumeric ? parseInt(searchQuery) : null
    };
    
    console.log("Sending search request:", searchData); // Debug
    
    const searchResults = await searchAttendances(searchData);
    
    const formattedData = searchResults.map((att: AttendanceDTO) => ({
      id: att.employeeId,
      name: att.employeeName,
      role: att.role,
      clockIn: att.clockIn || '-',
      clockOut: att.clockOut || '-',
      totalHours: att.totalHours || '0:00:00',
      otHours: att.otHours || '0:00:00',
      status: att.status,
      avatar: att.avatar,
      date: att.date
    }));
    
    setEmployeeAttendances(formattedData);
  } catch (error) {
    console.error('Error searching:', error);
    toast({
      title: 'Search failed',
      description: 'Could not search attendance records. Please try again.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <ChakraProvider >
    <Flex justify="center" bg="gray.50" minH="100vh">
        <Box p={4} maxW="1200px" w="100%">
    
        {/* Work Hour Section */}
        <Box bg="lavender" p={3} rounded="md" mb={7}>
          <Grid templateColumns="repeat(5, 1fr)" gap={9}>
            <GridItem>
              <Text fontWeight="medium">Work Hour</Text>
            </GridItem>
            <GridItem>
              <Text fontSize="sm" mb={1}>Date</Text>
              <Input 
                bg="white" 
                size="sm" 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </GridItem>
            <GridItem colStart={4}>
              <Text fontSize="sm" mb={1}>Start Time</Text>
              <Input 
                bg="white" 
                size="sm" 
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </GridItem>
            <GridItem>
              <Text fontSize="sm" mb={1}>End Time</Text>
              <Input 
                bg="white" 
                size="sm" 
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </GridItem>
          </Grid>
        </Box>

        {/* Search Section */}
        <Flex mb={6} gap={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search by name, id, or role..."
              bg="white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </InputGroup>
          <HStack spacing={2}>
            <Button 
              bg="#003049" 
              color="white" 

              onClick={handleSearch}
              isLoading={loading}
              _hover={{ bg: "#00253a" }}
            >
              Search
            </Button>
          </HStack>
        </Flex>

        {/* Table */}
        <Box bg="white" rounded="md" overflow="hidden" shadow="sm">
          {loading ? (
            <Flex justify="center" align="center" height="200px">
              <Spinner size="xl" color="#003049" />
            </Flex>
          ) : (
            <Table variant="simple">
              <Thead bg="#003049">
                <Tr>
                  <Th color="white">EMPLOYEE ID</Th>
                  <Th color="white">EMPLOYEE NAME</Th>
                  <Th color="white">ROLE</Th>
                  <Th color="white">CLOCK IN</Th>
                  <Th color="white">CLOCK OUT</Th>
                  <Th color="white">TOTAL HOURS</Th>
                  <Th color="white">OT HOURS</Th>
                  <Th color="white">STATUS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employeeAttendances.map((attendance) => (
                  <Tr key={attendance.attendanceId}>
                    <Td>{attendance.id}</Td>
                    <Td>
                      <Flex align="center">
                        <Avatar size="sm" name={attendance.name} src={attendance.avatar} mr={2} />
                        <Text>{attendance.name}</Text>
                      </Flex>
                    </Td>
                    <Td>{attendance.role}</Td>
                    <Td>{attendance.clockIn}</Td>
                    <Td>{attendance.clockOut}</Td>
                    <Td>{attendance.totalHours}</Td>
                    <Td>{attendance.otHours}</Td>
                    <Td>
                      <Badge
                        bg={attendance.status === "Active" ? "rgba(72, 187, 120, 0.2)" : "rgba(245, 101, 101, 0.2)"}
                        color={attendance.status === "Active" ? "green.600" : "red.600"}
                        px={3}
                        py={1}
                        rounded="full"
                        width="70px"
                        textAlign="center"
                        border="1px solid"
                        borderColor={attendance.status === "Active" ? "green.200" : "red.200"}
                      >
                        {attendance.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
      </Flex>
    </ChakraProvider>
  );

};

export default EmployeeAttendancePage;