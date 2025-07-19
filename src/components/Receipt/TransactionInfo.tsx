import { useEffect, useState } from "react";
import { Box, Grid, GridItem, HStack, Icon, Text } from "@chakra-ui/react";
import { FiCalendar, FiUser } from "react-icons/fi";
import { fetchCurrentUser } from "../../services/userService";

const TransactionInfo = ({ currentTime }: { currentTime: string }) => {
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setEmployeeName(`${user.firstName} ${user.lastName}`);
      } catch (err) {
        console.error("Failed to fetch employee:", err);
      }
    };
    loadUser();
  }, []);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={6}>
      {[
        { icon: FiCalendar, label: "DATE & TIME", value: currentTime },
        { icon: FiUser, label: "CASHIER", value: employeeName },
      ].map((item, idx) => (
        <GridItem key={idx}>
          <Box
            p={4}
            bg="#FFFFFF"
            borderRadius="xl"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
            border="1px"
            borderColor="#DBEAFE"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.15)",
            }}
            transition="all 0.3s"
          >
            <HStack spacing={3} align="center">
              <Box
                p={2}
                bg="#EFF6FF"
                borderRadius="lg"
                border="1px"
                borderColor="#93C5FD"
              >
                <Icon as={item.icon} color="#3B82F6" boxSize={5} />
              </Box>
              <Box>
                <Text fontSize="xs" color="#6B7280" fontWeight="semibold">
                  {item.label}
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="#1F2937">
                  {item.value}
                </Text>
              </Box>
            </HStack>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default TransactionInfo;
