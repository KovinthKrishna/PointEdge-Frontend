import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define validation schema using Yup
const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

export const useLoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return { control, handleSubmit, errors };
};
