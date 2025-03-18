import { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Text,
  Badge,
  Grid,
  GridItem,
  HStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import AdminTitlebar from '../components/AdminTitlebar';
import Navbar from '../components/Navbar';

// Define employee interface
interface Employee {
  id: number;
  name: string;
  role: string;
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: string;
  otHours: string;
  status: 'Active' | 'Leave';
  avatar: string;
}

const EmployeeAttendancePage = () => {
  // Sample employee data
  const [employees] = useState<Employee[]>([
    {
      id: 1,
      name: 'Kasun Silva',
      role: 'Cashier',
      date: '04/04/2021',
      clockIn: '09:00:00',
      clockOut: '0:00:00',
      totalHours: '0:00:00',
      otHours: '0:00:00',
      status: 'Active',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      id: 2,
      name: 'Nimal Silva',
      role: 'Cashier',
      date: '03/04/2021',
      clockIn: '09:00:00',
      clockOut: '20:00:00',
      totalHours: '0:00:00',
      otHours: '0:00:00',
      status: 'Leave',
      avatar: 'https://bit.ly/ryan-florence',
    },
    {
      id: 3,
      name: 'Nimal Silva',
      role: 'Cashier',
      date: '04/04/2021',
      clockIn: '09:00:00',
      clockOut: '0:00:00',
      totalHours: '11:00:00',
      otHours: '0:00:00',
      status: 'Leave',
      avatar: 'https://bit.ly/ryan-florence',
    },
    {
      id: 4,
      name: 'Nimal Silva',
      role: 'Cashier',
      date: '04/04/2021',
      clockIn: '09:00:00',
      clockOut: '20:00:00',
      totalHours: '11:00:00',
      otHours: '8:00:00',
      status: 'Leave',
      avatar: 'https://bit.ly/ryan-florence',
    },
    {
      id: 5,
      name: 'Nimal Silva',
      role: 'Cashier',
      date: '05/04/2021',
      clockIn: '09:00:00',
      clockOut: '19:30:00',
      totalHours: '10:30:00',
      otHours: '6:00:00',
      status: 'Active',
      avatar: 'https://bit.ly/ryan-florence',
    },
    {
      id: 6,
      name: 'Nimal Silva',
      role: 'Cashier',
      date: '06/04/2021',
      clockIn: '09:00:00',
      clockOut: '20:00:00',
      totalHours: '11:00:00',
      otHours: '8:00:00',
      status: 'Active',
      avatar: 'https://bit.ly/ryan-florence',
    },
    {
      id: 7,
      name: 'Nimal Silva',
      role: 'Cashier',
      date: '07/04/2021',
      clockIn: '09:00:00',
      clockOut: '23:30:00',
      totalHours: '14:30:00',
      otHours: '8:00:00',
      status: 'Leave',
      avatar: 'https://bit.ly/ryan-florence',
    },
  ]);

  // State for filters
  const [startDate, setStartDate] = useState('15/02/2021');
  const [endDate, setEndDate] = useState('15/02/2021');
  const [startTime, setStartTime] = useState('07:30:00');
  const [endTime, setEndTime] = useState('16:00:00');
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <Flex>
      {/* Use your existing Navbar component */}
      <Navbar />

      {/* Main Content Area */}
      <Flex direction="column" flex={1} overflow="hidden">
        {/* Use your existing AdminTitlebar component */}
        <AdminTitlebar />

        {/* Content Area */}
        <Box flex={1} bg="gray.50" p={4} overflowY="auto">
          {/* Tabs */}
          <Flex bg="white" mb={6}>
            {['Dashboard', 'Employee Attendance', 'Sales Tracking', 'Top Performers', 'Shift Reports'].map(
              (tab, index) => (
                <Box
                  key={tab}
                  py={4}
                  px={6}
                  cursor="pointer"
                  bg={index === 1 ? '#003049' : 'white'}
                  color={index === 1 ? 'white' : 'gray.600'}
                >
                  {tab}
                </Box>
              )
            )}
          </Flex>

          {/* Work Hour Section */}
          <Box bg="lavender" p={4} rounded="md" mb={6}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem>
                <Text fontWeight="medium">Work Hour</Text>
              </GridItem>
              <GridItem>
                <Text fontSize="sm" mb={1}>Start Date</Text>
                <Input 
                  bg="white" 
                  size="sm" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </GridItem>
              <GridItem>
                <Text fontSize="sm" mb={1}>End Date</Text>
                <Input 
                  bg="white" 
                  size="sm" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </GridItem>
              <GridItem>
                <Text fontSize="sm" mb={1}>Start Time</Text>
                <Input 
                  bg="white" 
                  size="sm" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </GridItem>
              <GridItem>
                <Text fontSize="sm" mb={1}>End Time</Text>
                <Input 
                  bg="white" 
                  size="sm" 
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
                placeholder="Search by name, id, or others..."
                bg="white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <HStack spacing={2}>
              <Text>From</Text>
              <Input 
                type="date" 
                bg="white"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <Text>To</Text>
              <Input 
                type="date" 
                bg="white"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
              <Button bg="#003049" color="white" px={8}>
                Search
              </Button>
            </HStack>
          </Flex>

          {/* Table */}
          <Box bg="white" rounded="md" overflow="hidden" shadow="sm">
            <Table variant="simple">
              <Thead bg="#003049">
                <Tr>
                  <Th color="white">EMPLOYEE NAME</Th>
                  <Th color="white">ROLE</Th>
                  <Th color="white">DATE</Th>
                  <Th color="white">CLOCK IN</Th>
                  <Th color="white">CLOCK OUT</Th>
                  <Th color="white">TOTAL HOURS</Th>
                  <Th color="white">OT HOURS</Th>
                  <Th color="white">STATUS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employees.map((employee) => (
                  <Tr key={employee.id}>
                    <Td>
                      <Flex align="center">
                        <Avatar size="sm" name={employee.name} src={employee.avatar} mr={2} />
                        <Text>{employee.name}</Text>
                      </Flex>
                    </Td>
                    <Td>{employee.role}</Td>
                    <Td>{employee.date}</Td>
                    <Td>{employee.clockIn}</Td>
                    <Td>{employee.clockOut}</Td>
                    <Td>{employee.totalHours}</Td>
                    <Td>{employee.otHours}</Td>
                    <Td>
                      <Badge
                        colorScheme={employee.status === 'Active' ? 'green' : 'red'}
                        px={2}
                        py={1}
                        rounded="full"
                      >
                        {employee.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default EmployeeAttendancePage;