import { object, string } from "yup";

export const addBookSchema = object({
  name: string().required().min(3),
});
