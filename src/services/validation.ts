import { object, string, number, ref, boolean } from "yup";

export const schema = object({
  Name: string()
    .required("User name required")
    .test(
      "The first letter should be uppercase",
      "The first letter should be uppercase",
      (value) => /^[A-ZА-ЯЁ]/.test(value),
    ),
  Age: number()
    .required("Age name required")
    .moreThan(1, "number should be more than 1"),
  Email: string().email().required(),
  Password: string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.",
    ),
  AnotherPassword: string()
    .required("Confirm Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .oneOf([ref("Password")], "Passwords do not match"),
  Gender: string().required("Choose one of genders"),
  checkbox: boolean().oneOf([true], "need to accept T&C").required(),
});
