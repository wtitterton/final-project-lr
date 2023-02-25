import { object, string } from "yup";

export const registrationSchema = object({
  email: string().required().email(),
  password: string().required().min(3),
});
