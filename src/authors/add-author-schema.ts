import { object, string } from "yup";

export const addAuthorSchema = object({
  name: string().required().min(3),
});
