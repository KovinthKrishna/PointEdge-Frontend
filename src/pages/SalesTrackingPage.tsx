"use client"
import { Box, Flex, Text, Grid, GridItem, Icon, HStack, VStack, useColorModeValue } from "@chakra-ui/react"
import { ChevronDown, Gift, Home, Monitor, ShoppingBag, Shirt, TrendingDown, TrendingUp } from 'lucide-react'

export default function SalesTrackingPage() {
  // Colors
  const primaryColor = useColorModeValue("#0088cc", "#0088cc")
  const secondaryColor = useColorModeValue("#003049", "#003049")
 

  // Sales Per Hour Data - Updated to match the image
  const hourlyData = [
    { hour: "8AM", value: 120 },
    { hour: "10AM", value: 100 },
    { hour: "12PM", value: 150 },
    { hour: "2PM", value: 130 },
    { hour: "4PM", value: 105 },
    { hour: "6PM", value: 115 },
    { hour: "8PM", value: 100 },
  ]

  // Category items with icons
  const categoryItems = [
    { name: "Electronics", percentage: "43.3%", icon: Monitor, trend: "up" },
    { name: "Grocery", percentage: "28.1%", icon: ShoppingBag, trend: "up" },
    { name: "Furniture", percentage: "13.6%", icon: Home, trend: "down" },
    { name: "Lifestyle and Fashion", percentage: "13.6%", icon: Shirt, trend: "up" },
    { name: "Gifts and Toys", percentage: "13.6%", icon: Gift, trend: "down" },
  ]

  // Monthly Sales Data
  const monthlyData = [
    { month: "Jan", value: 3.5 },
    { month: "Feb", value: 4.2 },
    { month: "Mar", value: 5.0 },
    { month: "Apr", value: 4.2 },
    { month: "May", value: 3.0 },
    { month: "Jun", value: 4.0 },
    { month: "Jul", value: 4.5 },
    { month: "Aug", value: 6.0 },
    { month: "Sep", value: 4.8 },
    { month: "Oct", value: 4.2 },
    { month: "Nov", value: 3.5 },
    { month: "Dec", value: 4.5 },
  ]

  // Calculate dimensions for SVG charts
  const hourlyChartWidth = 400
  const hourlyChartHeight = 200
  const hourlyBarWidth = 16
  const hourlyBarSpacing = (hourlyChartWidth - hourlyData.length * hourlyBarWidth) / (hourlyData.length + 1)

  const monthlyChartWidth = 600
  const monthlyChartHeight = 200
  const monthlyBarWidth = 20
  const monthlyBarSpacing = (monthlyChartWidth - monthlyData.length * monthlyBarWidth) / (monthlyData.length + 1)

  return (
    <Box p={6} bg="white">
      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        {/* Top Categories */}
        <GridItem colSpan={{ base: 12, md: 4 }} p={4} borderRadius="md" border="1px" borderColor="gray.200">
          <Flex direction="column">
            <Flex justify="space-between" align="center" mb={4}>
              <Text fontWeight="medium" fontSize="lg">
                Top Categories
              </Text>
              <Text fontSize="sm" color="gray.500">
                In Last 30 days
              </Text>
            </Flex>

            {/* Donut Chart */}
            <Box h="200px" w="200px" position="relative" mx="auto" mb={6}>
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                borderRadius="full"
                w="70%"
                h="70%"
                bg="white"
                zIndex="1"
              />
              <svg width="200" height="200" viewBox="0 0 100 100">
                {/* Electronics - 43.3% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={secondaryColor}
                  strokeWidth="20"
                  strokeDasharray={`${43.3 * 2.51} ${100 * 2.51 - 43.3 * 2.51}`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
                {/* Grocery - 28.1% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={primaryColor}
                  strokeWidth="20"
                  strokeDasharray={`${28.1 * 2.51} ${100 * 2.51 - 28.1 * 2.51}`}
                  strokeDashoffset={`${-(43.3 * 2.51)}`}
                  transform="rotate(-90 50 50)"
                />
                {/* Furniture - 13.6% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#0066aa"
                  strokeWidth="20"
                  strokeDasharray={`${13.6 * 2.51} ${100 * 2.51 - 13.6 * 2.51}`}
                  strokeDashoffset={`${-(43.3 + 28.1) * 2.51}`}
                  transform="rotate(-90 50 50)"
                />
                {/* Lifestyle - 13.6% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#00aaff"
                  strokeWidth="20"
                  strokeDasharray={`${13.6 * 2.51} ${100 * 2.51 - 13.6 * 2.51}`}
                  strokeDashoffset={`${-(43.3 + 28.1 + 13.6) * 2.51}`}
                  transform="rotate(-90 50 50)"
                />
                {/* Gifts - 13.6% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#0055aa"
                  strokeWidth="20"
                  strokeDasharray={`${13.6 * 2.51} ${100 * 2.51 - 13.6 * 2.51}`}
                  strokeDashoffset={`${-(43.3 + 28.1 + 13.6 + 13.6) * 2.51}`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </Box>

            {/* Category List */}
            <VStack spacing={3} align="stretch">
              {categoryItems.map((item, index) => (
                <HStack key={index} justify="space-between">
                  <HStack>
                    <Flex w="30px" h="30px" bg="gray.100" borderRadius="md" justify="center" align="center">
                      <Icon as={item.icon} boxSize={4} color="gray.600" />
                    </Flex>
                    <Text fontSize="sm">{item.name}</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="sm" fontWeight="medium">
                      {item.percentage}
                    </Text>
                    <Icon
                      as={item.trend === "up" ? TrendingUp : TrendingDown}
                      color={item.trend === "up" ? "green.500" : "red.500"}
                      boxSize={4}
                    />
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </Flex>
        </GridItem>

        {/* Right Side Content */}
        <GridItem colSpan={{ base: 12, md: 8 }}>
          <Grid templateRows="repeat(2, auto)" gap={6}>
            {/* Top Row - Charts */}
            <GridItem>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {/* Sales Per Hour */}
                <GridItem>
                  <Box p={4} borderRadius="md" border="1px" borderColor="gray.200">
                    <Text fontWeight="medium" fontSize="lg" mb={4}>
                      Sales Per Hour
                    </Text>
                    <Box h="250px" position="relative">
                      {/* Y-axis labels */}
                      <Flex
                        position="absolute"
                        left="0"
                        top="0"
                        bottom="30px"
                        flexDirection="column"
                        justify="space-between"
                        pr={2}
                        fontSize="xs"
                        color="gray.500"
                        width="30px"
                      >
                        <Text>150</Text>
                        <Text>130</Text>
                        <Text>110</Text>
                        <Text>90</Text>
                        <Text>70</Text>
                        <Text>50</Text>
                      </Flex>

                      {/* SVG Bar Chart */}
                      <Box ml="30px" h="calc(100% - 30px)">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox={`0 0 ${hourlyChartWidth} ${hourlyChartHeight + 30}`}
                          preserveAspectRatio="none"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                        >
                          {hourlyData.map((item, index) => {
                            const barHeight = ((item.value - 50) / 100) * hourlyChartHeight
                            const x = hourlyBarSpacing + index * (hourlyBarWidth + hourlyBarSpacing)
                            const y = hourlyChartHeight - barHeight

                            return (
                              <g key={index}>
                                <rect
                                  x={x}
                                  y={y}
                                  width={hourlyBarWidth}
                                  height={barHeight}
                                  rx={8}
                                  fill={secondaryColor}
                                />
                                
                                <text
                                  x={x + hourlyBarWidth / 2}
                                  y={hourlyChartHeight + 20}
                                  textAnchor="middle"
                                  fontSize="xs" // xs size in Chakra
                                  fill={secondaryColor}
                                >
                                  {item.hour}
                                </text>
                              </g>
                            )
                          })}
                        </svg>
                      </Box>
                    </Box>
                  </Box>
                </GridItem>

                {/* Sales Mapping */}
                <GridItem>
                  <Box p={4} borderRadius="md" border="1px" borderColor="gray.200">
                    <Text fontWeight="medium" fontSize="lg" mb={4} color={secondaryColor}>
                      Sales Mapping by Area
                    </Text>
                    <Flex justify="center" align="center" h="250px" bg="gray.100" borderRadius="md">
                      <Text color="gray.500">World Map Visualization</Text>
                    </Flex>
                  </Box>
                </GridItem>
              </Grid>
            </GridItem>

            {/* Bottom Row - Overview */}
            <GridItem>
              <Box p={4} borderRadius="md" border="1px" borderColor="gray.200">
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontWeight="medium" fontSize="lg">
                    Overview
                  </Text>
                  <HStack>
                    <Text fontSize="sm">Quarterly</Text>
                    <Icon as={ChevronDown} boxSize={4} />
                  </HStack>
                </Flex>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  Average Sales
                </Text>
                <Box h="200px" position="relative">
                  {/* Y-axis labels */}
                  <Flex
                    position="absolute"
                    left="0"
                    top="0"
                    bottom="30px"
                    flexDirection="column"
                    justify="space-between"
                    pr={2}
                    fontSize="xs"
                    color="gray.500"
                    width="30px"
                  >
                    <Text>6k</Text>
                    <Text>5k</Text>
                    <Text>4k</Text>
                    <Text>3k</Text>
                    <Text>2k</Text>
                    <Text>1k</Text>
                  </Flex>

                  {/* SVG Bar Chart */}
                  <Box ml="30px" h="calc(100% - 30px)">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox={`0 0 ${monthlyChartWidth} ${monthlyChartHeight + 30}`}
                      preserveAspectRatio="none"
                      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                    >
                      {monthlyData.map((item, index) => {
                        const barHeight = (item.value / 7) * monthlyChartHeight
                        const x = monthlyBarSpacing + index * (monthlyBarWidth + monthlyBarSpacing)
                        const y = monthlyChartHeight - barHeight

                        return (
                          <g key={index}>
                            <rect
                              x={x}
                              y={y}
                              width={monthlyBarWidth}
                              height={barHeight}
                              rx={5}
                              fill={item.month === "Aug" ? "#040161" : primaryColor}
                            />
                            {item.month === "Aug" && (
                              <text
                                x={x + monthlyBarWidth / 2}
                                y={y - 10}
                                textAnchor="middle"
                                fontSize="0.75rem"
                                fill="white"
                                fontWeight="bold"
                              >
                              </text>
                            )}
                            <text
                              x={x + monthlyBarWidth / 2}
                              y={monthlyChartHeight + 20}
                              textAnchor="middle"
                              fontSize="0.75rem" // xs size in Chakra
                              fill={secondaryColor}
                            >
                              {item.month}
                            </text>
                          </g>
                        )
                      })}
                    </svg>
                  </Box>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  )
}

