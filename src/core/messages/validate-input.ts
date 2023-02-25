import { ObjectSchema, ValidationError } from "yup";
export const validateInput = <T>(schema: ObjectSchema<any>, value: T) => {
  schema.validateSync(value, { abortEarly: false });
};
