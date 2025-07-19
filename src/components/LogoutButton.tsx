import { HStack, Text } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Prefer role from user object in localStorage
    let role = null;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        role = userObj.role;
      } catch (e) {
        role = localStorage.getItem("role");
      }
    } else {
      role = localStorage.getItem("role");
    }

    if (role && role.trim().toUpperCase() === "ADMIN") {
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    } else if (role && role.trim().toUpperCase() === "USER") {
      navigate("/clock-out", { replace: true });
    } else {
      // fallback case: role is missing or corrupted
      alert("User role not found. Please log in again.");
      navigate("/login", { replace: true });
    }
  };

  return (
    <HStack
      as="button"
      color="white"
      bgColor="blue"
      paddingX={6}
      paddingY={2.5}
      spacing={2.5}
      borderRadius="full"
      _hover={{ bgColor: "darkBlue" }}
      onClick={handleLogout}
    >
      <Text fontSize={20}>Logout</Text>
      <FiLogOut size={30} />
    </HStack>
  );
};

export default LogoutButton;