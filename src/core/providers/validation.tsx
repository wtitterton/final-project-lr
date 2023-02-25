import React from "react";

const ValidationContext = React.createContext<any>({
  clientValidationMessages: [],
  updateClientValidationMessages: (errors: string[]) => {},
});

export const ValidationProvider = (props: any) => {
  const [clientValidationMessages, updateClientValidationMessages] =
    React.useState<string[]>([]);

  return (
    <ValidationContext.Provider
      value={{ clientValidationMessages, updateClientValidationMessages }}
    >
      {props.children}
    </ValidationContext.Provider>
  );
};

export function useValidation() {
  const { clientValidationMessages, updateClientValidationMessages } =
    React.useContext(ValidationContext);
  return [clientValidationMessages, updateClientValidationMessages];
}
