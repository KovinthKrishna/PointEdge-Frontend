import React, { useState } from "react";
import { VStack, useToast, Box } from "@chakra-ui/react";
import ModelBoxPopup from "../Common/ModelBoxPopup";
import ProfileImageSection from "./ProfileImageSection";
import PersonalInfoSection from "./PersonalInfoSection";
import SecuritySection from "./SecuritySection";
import ActionButtons from "./ActionButtons";
import axios from "axios";
import { FormDataType, ErrorsType } from "../../models/Types";

interface AccountSettingProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountSetting: React.FC<AccountSettingProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    avatarUrl: "",
  });

  const [errors, setErrors] = useState<ErrorsType>({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toast = useToast();

  const validateForm = (): boolean => {
    const newErrors: ErrorsType = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.currentPassword.trim())
      newErrors.currentPassword = "Current password is required";
    if (formData.newPassword && formData.newPassword.length < 6)
      newErrors.newPassword = "Password too short";
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    )
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormDataType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/employees/modify-profile", {
        fullName: formData.fullName,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        avatar: formData.avatarUrl, // sending avatar URL string
      });

      toast({
        title: "Account updated successfully",
        status: "success",
        duration: 3000,
      });
      handleClose();
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error?.response?.data || "Error",
        status: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      avatarUrl: "",
    });
    setErrors({});
    setImagePreview(null);
    onClose();
  };

  return (
    <ModelBoxPopup isOpen={isOpen} onClose={handleClose}>
      <Box maxH="80vh" overflowY="auto" p={8} bg="#fafafa">
        <VStack spacing={6} align="stretch">
          <ProfileImageSection
            imagePreview={formData.avatarUrl || imagePreview}
            onUrlChange={(url) => {
              setFormData((prev) => ({ ...prev, avatarUrl: url }));
              setImagePreview(url);
            }}
          />
          <PersonalInfoSection
            fullName={formData.fullName}
            error={errors.fullName}
            onFullNameChange={(value) => handleInputChange("fullName", value)}
          />
          <SecuritySection
            currentPassword={formData.currentPassword}
            newPassword={formData.newPassword}
            confirmPassword={formData.confirmPassword}
            errors={errors}
            showCurrentPassword={showCurrentPassword}
            showNewPassword={showNewPassword}
            showConfirmPassword={showConfirmPassword}
            toggleShowCurrentPassword={() =>
              setShowCurrentPassword((prev) => !prev)
            }
            toggleShowNewPassword={() => setShowNewPassword((prev) => !prev)}
            toggleShowConfirmPassword={() =>
              setShowConfirmPassword((prev) => !prev)
            }
            onInputChange={handleInputChange}
          />
          <ActionButtons
            onCancel={handleClose}
            onSave={handleSubmit}
            isSaving={loading}
          />
        </VStack>
      </Box>
    </ModelBoxPopup>
  );
};

export default AccountSetting;
