import { useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Select,
  List,
  ListItem,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import AdminTitlebar from '../components/AdminTitlebar';
import Navbar from '../components/Navbar';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for Top Categories
const categoryData = {
  labels: ['Electronics', 'Grocery', 'Furniture', 'Lifestyle', 'Gifts'],
  datasets: [{
    data: [45.3, 28.7, 15.8, 13.8, 13.6],
    backgroundColor: [
      '#003049',
      '#0077B6',
      '#4EA8DE',
      '#90E0EF',
      '#CAF0F8',
    ],
    borderWidth: 0,
  }],
};

// Sample data for Sales Per Hour
const hourlyData = {
  labels: ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM'],
  datasets: [{
    label: 'Sales',
    data: [120, 100, 150, 130, 110, 115, 105],
    backgroundColor: '#0077B6',
    borderRadius: 6,
  }],
};

// Sample data for Overview
const overviewData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Sales',
    data: [30, 40, 50, 35, 25, 35, 40, 60, 45, 35, 25, 45],
    backgroundColor: (context: any) => {
      return context.dataIndex === 7 ? '#003049' : '#0077B6';
    },
    borderRadius: 6,
  }],
};

const SalesTrackingPage = () => {
  const [timeframe, setTimeframe] = useState('Quarterly');

  return (
    <Flex>
      <Navbar />
      <Flex direction="column" flex={1} overflow="hidden">
        <AdminTitlebar />
        
        <Box flex={1} bg="gray.50" p={6} overflowY="auto">
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {/* Top Categories */}
            <GridItem bg="white" p={6} rounded="lg" shadow="sm">
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Top Categories
              </Text>
              <Flex>
                <Box w="200px" h="200px">
                  <Doughnut
                    data={categoryData}
                    options={{
                      cutout: '70%',
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </Box>
                <List spacing={3} ml={6} flex={1}>
                  {categoryData.labels.map((label, index) => (
                    <ListItem key={label}>
                      <HStack justify="space-between">
                        <HStack>
                          <Box w={2} h={2} bg={categoryData.datasets[0].backgroundColor[index]} rounded="full" />
                          <Text>{label}</Text>
                        </HStack>
                        <HStack>
                          <Text>{categoryData.datasets[0].data[index]}%</Text>
                          <Icon
                            as={index < 2 ? ArrowUpIcon : ArrowDownIcon}
                            color={index < 2 ? 'green.500' : 'red.500'}
                          />
                        </HStack>
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </Flex>
            </GridItem>

            {/* Sales Per Hour */}
            <GridItem bg="white" p={6} rounded="lg" shadow="sm">
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Sales Per Hour
              </Text>
              <Box h="200px">
                <Bar
                  data={hourlyData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Box>
            </GridItem>

            {/* Sales Mapping by Area */}
            <GridItem bg="white" p={6} rounded="lg" shadow="sm">
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Sales Mapping by Area
              </Text>
              <Box h="200px" position="relative">
                {/* Replace with actual map component */}
                <Text color="gray.500" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                  Map Visualization Here
                </Text>
              </Box>
            </GridItem>

            {/* Overview */}
            <GridItem colSpan={3} bg="white" p={6} rounded="lg" shadow="sm">
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="lg" fontWeight="semibold">
                  Overview
                </Text>
                <Select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  w="150px"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </Select>
              </Flex>
              <Box h="300px">
                <Bar
                  data={overviewData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SalesTrackingPage;
