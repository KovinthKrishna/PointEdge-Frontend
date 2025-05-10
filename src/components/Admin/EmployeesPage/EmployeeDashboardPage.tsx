import type React from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  Select,
  Badge,
  ChakraProvider,
  Image,
} from "@chakra-ui/react";
import employeeIcon from "../../../assets/employee-icon.png";
import clockIcon from "../../../assets/clock-icon.png";

// Sales Chart Component
const SalesChart: React.FC = () => {
  // Sample data for the chart
  const salesData = [
    { month: 'Jan', primary: 65, secondary: 45 },
    { month: 'Feb', primary: 85, secondary: 60 },
    { month: 'Mar', primary: 50, secondary: 40 },
    { month: 'Apr', primary: 70, secondary: 55 },
    { month: 'May', primary: 80, secondary: 60 },
    { month: 'Jun', primary: 75, secondary: 65 },
    { month: 'Jul', primary: 70, secondary: 60 },
    { month: 'Aug', primary: 60, secondary: 50 },
    { month: 'Sep', primary: 55, secondary: 45 },
    { month: 'Oct', primary: 65, secondary: 55 },
    { month: 'Nov', primary: 75, secondary: 60 },
    { month: 'Dec', primary: 85, secondary: 55 },
  ];

  // Find the maximum value to normalize the bar heights
  const maxValue = Math.max(...salesData.flatMap(item => [item.primary, item.secondary]));
  
  // Calculate the height of each bar relative to the maximum value
  const getBarHeight = (value: number): string => {
    return `${(value / maxValue) * 150}px`;
  };

  return (
    <Box h="275px" position="relative">
      {/* Chart grid lines */}
      <Box 
        position="absolute" 
        top={0} 
        bottom={0} 
        left={0} 
        right={0} 
        zIndex={1}
      >
        {[...Array(6)].map((_, i) => (
          <Box 
            key={i} 
            position="absolute" 
            top={`${i * 20}%`} 
            left={0} 
            right={0} 
            h="1px" 
            bg="gray.200" 
          />
        ))}
      </Box>

      {/* Chart bars */}
      <Flex 
        justify="space-between" 
        align="flex-end" 
        h="100%" 
        position="relative" 
        zIndex={2}
      >
        {salesData.map((data, index) => (
          <Flex 
            key={index} 
            direction="column" 
            align="center" 
            justify="flex-end"
            h="100%"
            flex={1}
          >
            <Flex w="100%" justify="center" gap={1} align="flex-end">
              <Box 
                w="40%" 
                h={getBarHeight(data.primary)} 
                bg="#003A5D" 
                borderRadius="sm" 
              />
              <Box 
                w="40%" 
                h={getBarHeight(data.secondary)} 
                bg="#2A7AB0" 
                borderRadius="sm" 
              />
            </Flex>
            <Text fontSize="sm" mt={2}>{data.month}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

const EmployeeDashboardPage: React.FC = () => {
  return (
    
    <ChakraProvider >
    <Box>
      {/* Stats Cards */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={6}>
      <StatCard
          icon={
            <Image
              src="https://th.bing.com/th/id/R.12d1ca1ed26243d7628fdd4e1d4ef181?rik=VoTkKyaHH27vmg&riu=http%3a%2f%2fmedia-s3-us-east-1.ceros.com%2fgartner%2fimages%2f2016%2f09%2f20%2fab06779a075d7e1e3ed3e114355a3fee%2ficon2-individual-02.png&ehk=7r%2fpOA%2fTuq1JD8GyXcU7Uw8FZxdylRicmz0dHcBO1nM%3d&risl=&pid=ImgRaw&r=0"
              alt="Employee Icon"
              boxSize="36px"
            />
          }
          title="No. of Employees"
          value="1,256"
          change={10}
          chartData={[18, 25, 22, 20]}
        />
        <StatCard
          icon={
            <Image
              src="https://icon-library.com/images/costly-icon/costly-icon-26.jpg"
              alt="Dollar Icon"
              boxSize="36px"
            />
          }
          title="Total Sales"
          value="$8,245.00"
          change={-0.5}
          chartData={[20, 15, 25, 18]}
        />
        <StatCard
          icon={
            <Image
              src="https://static.vecteezy.com/system/resources/previews/014/322/497/original/shopping-cart-icons-design-in-blue-circle-png.png"
              alt="Order Icon"
              boxSize="36px"
            />
          }
          title="Total Order"
          value="1,256"
          change={10}
          chartData={[15, 18, 25, 20]}
        />
        
      </Grid>

      {/* Charts Section */}
      <Grid templateColumns="2fr 1fr" gap={6}>
        {/* Main Chart */}
        <GridItem bg="white" borderRadius="md" p={4} border="1px" borderColor="blue.100">
          <Flex justify="space-between" mb={4}>
            <Text fontWeight="medium">Employee Productivity</Text>
            <Select size="sm" w="120px" defaultValue="2024">
             <option value="2023">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </Select>
          </Flex>
          
          {/* Replace the simplified chart with the actual SalesChart component */}
          <SalesChart />
          
          {/* Customer Stats */}
          <Flex mt={16} justify="space-between">
            <Flex align="center">
              <Box bg="blue.100" p={2} borderRadius="md" mr={3}>
                <Image
                  src={clockIcon}
                  boxSize="40px"
                />
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Total Hours Worked
                </Text>
                <Text fontWeight="bold">10,52 h</Text>
              </Box>
            </Flex>

            <Flex align="center">
              <Badge colorScheme="green" mr={2}>
                ↑ 3%
              </Badge>
            </Flex>

            <Flex align="center">
              <Box bg="blue.100" p={2} borderRadius="md" mr={3}>
                <Image
                  src={employeeIcon}
                  alt="Product Icon"
                  boxSize="40px"
                />
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Total Employees
                </Text>
                <Text fontWeight="bold" fontSize="sm">
                  250
                </Text>
              </Box>
            </Flex>

            <Flex align="center">
              <Badge colorScheme="green" mr={2}>
                ↑ 3%
              </Badge>
            </Flex>
          </Flex>
        </GridItem>

        {/* Side Charts */}
        <GridItem>
          <Flex direction="column" gap={6}>
            {/* attendance Report */}
            <Box bg="white" borderRadius="md" p={4} border="1px" borderColor="gray.200">
         <Flex justify="space-between" mb={4}>
         <Text fontWeight="medium">Attendance Report</Text>
       </Flex>
       <Box h="150px" position="relative" display="flex" justifyContent="center">
        {/* Simplified donut chart */}
       <Box position="relative" w="150px" h="150px">
        <Box as="svg" viewBox="0 0 100 100" w="100%" h="100%">
        <Box
          as="circle"
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#2C5282"
          strokeWidth="20"
          strokeDasharray="188.5 251.3"
          transform="rotate(-90 50 50)"
         />
        <Box
          as="circle"
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#B8B8B8"
          strokeWidth="20"
          strokeDasharray="70.7 251.3"
          strokeDashoffset="-188.5"
          transform="rotate(-90 50 50)"
         />
         <Box as="circle" cx="50" cy="50" r="20" fill="white" />
       </Box>
     </Box>
    </Box>
      <Flex justify="center" mt={4} fontSize="xs">
        <Flex align="center" mr={4}>
             <Box w="10px" h="10px" borderRadius="full" bg="#2C5282" mr={2} />
              <Text>Active</Text>
            </Flex>
            <Flex align="center" mr={4}>
             <Box w="10px" h="10px" borderRadius="full" bg="#B8B8B8" mr={2} />
              <Text>Leave</Text>
            </Flex>
         </Flex>
       </Box>

            {/* Weekly Transaction */}
            <Box bg="white" borderRadius="md" p={4} border="1px" borderColor="gray.200">
              <Flex justify="space-between" mb={4}>
                <Text fontWeight="medium">Weekly Transaction Summary</Text>
                <Text fontSize="xs" color="blue.500">
                  Last 7 month
                </Text>
              </Flex>
              <Box h="150px" position="relative">
                <Box position="relative" mt={3}>
                  {/* Mini chart - positioned absolutely to the right */}
                  <Flex h="100%" justify="space-between" align="flex-end">
                    {[140, 100, 125, 85, 150, 110, 160].map((height, i) => (
                      <Box key={i} w="20px" h={`${height}px`} bg={"#2C5282"} borderRadius="2px" />
                    ))}
                  </Flex>
                </Box>
              </Box>
              <Flex justify="space-between" mt={4} fontSize="xs" color="gray.500">
                <Text>24 Jun</Text>
                <Text>25 Jun</Text>
                <Text>26 Jun</Text>
                <Text>27 Jun</Text>
                <Text>28 Jun</Text>
                <Text>29 Jun</Text>
                <Text>30 Jun</Text>
              </Flex>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
    </ChakraProvider>
  );
  
};

// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: number;
  chartData: number[];
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change }) => {
  return (
    <Box bg="white" p={4} borderRadius="md" border="1px" borderColor="gray.200">
      <Flex justify="space-between" mb={4}>
        <Box p={2} borderRadius="full" bg="blue.50" color="blue.500">
          {icon}
        </Box>
      </Flex>
      <Box position="relative" mt={2}>
        {/* Mini chart - positioned absolutely to the right */}
        <Box position="absolute" right="0" bottom="0">
          <Flex h="40px" align="flex-end" gap={1}>
            {[35, 25, 40, 30].map((height, i) => (
              <Box key={i} w="12px" h={`${height}px`} bg={i === 2 ? "#2A7AB0" : "#0F172A"} borderRadius="2px" />
            ))}
          </Flex>
        </Box>

        <Text color="gray.500" fontSize="20px">
          {title}
        </Text>
        <Stat mt={1}>
          <StatNumber fontSize="2xl">{value}</StatNumber>
          <StatHelpText fontSize="xs" color={change >= 0 ? "blue.500" : "red.500"}>
            <StatArrow type={change >= 0 ? "increase" : "decrease"} />
            {Math.abs(change)}% from last week
          </StatHelpText>
        </Stat>
      </Box>
    </Box>
  );
  
};

export default EmployeeDashboardPage;