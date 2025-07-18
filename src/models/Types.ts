export interface FormDataType {
  fullName: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  avatarUrl: string; 
}

export interface ErrorsType {
  fullName?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
