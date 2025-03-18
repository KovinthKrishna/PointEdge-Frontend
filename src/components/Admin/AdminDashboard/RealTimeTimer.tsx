import { Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const RealTimeTimer = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const date = now.toLocaleDateString("en-IN");
  const time = now
    .toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(" am", " AM")
    .replace(" pm", " PM");

  return (
    <VStack>
      <Text fontSize={20} fontWeight="bold">
        {date}
      </Text>
      <Text fontSize={20}>{time}</Text>
    </VStack>
  );
};

export default RealTimeTimer;
