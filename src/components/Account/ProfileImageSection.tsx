import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Avatar,
  VStack,
  Text,
  FormLabel,
  Input,
  useToast,
  Button,
} from "@chakra-ui/react";
import { fetchCurrentUser } from "../../services/userService";

interface ProfileImageSectionProps {
  imagePreview: string | null;
  onUrlChange: (url: string) => void;
  onFileChange?: (file: File) => void;
}

interface User {
  avatarUrl?: string;
}

const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({
  imagePreview,
  onUrlChange,
  onFileChange,
}) => {
  const [inputUrl, setInputUrl] = useState(imagePreview || "");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const toast = useToast();
  const toastIdRef = useRef<string | number | undefined>(undefined);

  // Fetch current user
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUser(data);
        if (data.avatar) {
          setInputUrl(data.avatar);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    setInputUrl(imagePreview || "");
  }, [imagePreview]);

  useEffect(() => {
    if (filePreview) {
      setInputUrl("");
    }
  }, [filePreview]);

  const validateUrl = (url: string) => {
    try {
      if (!url) return true;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setInputUrl(url);
    setFilePreview(null); // clear file preview when typing URL

    if (validateUrl(url)) {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
        toastIdRef.current = undefined;
      }
      onUrlChange(url);
    } else {
      if (!toastIdRef.current) {
        toastIdRef.current = toast({
          title: "Invalid URL",
          description: "Please enter a valid URL",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload JPG, PNG or GIF images only.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setFilePreview(objectUrl);
    setInputUrl("");
    onUrlChange("");
    if (onFileChange) onFileChange(file);
  };

  const avatarSrc =
    filePreview || // 1) uploaded image preview (most recent)
    inputUrl || // 2) input URL (typed or backend URL)
    undefined;

  return (
    <Box
      bg="#ffffff"
      p={6}
      borderRadius="16px"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
      border="1px solid #e2e8f0"
    >
      <FormLabel fontSize="16px" fontWeight="600" color="#2d3748" mb={4}>
        Profile Image URL or Upload
      </FormLabel>
      <VStack align="start" spacing={3}>
        <Box position="relative">
          <Avatar
            size="2xl"
            src={avatarSrc}
            bg="linear-gradient(135deg, #00146dff 0%, #006dc0ff 100%)"
            color="#ffffff"
            border="4px solid #ffffff"
            boxShadow="0 8px 25px rgba(0, 0, 0, 0.15)"
          />
        </Box>
        <Input
          placeholder="Enter image URL"
          value={inputUrl}
          onChange={handleUrlChange}
          borderRadius="12px"
          size="md"
          disabled={!!filePreview}
        />
        <Text fontSize="13px" color="#718096">
          Enter a valid image URL (JPG, PNG, GIF)
        </Text>
        <input
          type="file"
          accept="image/png, image/jpeg, image/gif"
          id="profile-image-upload"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button
          as="label"
          htmlFor="profile-image-upload"
          mt={2}
          colorScheme="blue"
          size="sm"
          cursor="pointer"
        >
          Upload Image
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfileImageSection;
