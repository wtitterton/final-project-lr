import { observer } from "mobx-react";
import { AddBooksPresenter } from "./books-presenter";
import { useState } from "react";
import { useValidation, validateInput } from "../core";
import { ValidationError } from "yup";
import { addBookSchema } from "./add-book-schema";

interface AddBooksProps {
  presenter: AddBooksPresenter;
}

export const AddBooks = observer(({ presenter }: AddBooksProps) => {
  const [bookName, setBookName] = useState<string>("");
  const [clientValidationMessages, updateClientValidationMessages] =
    useValidation();

  const handleFormSubmission = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      updateClientValidationMessages([]);
      validateInput(addBookSchema, { name: bookName });
      presenter.addBook(bookName);
      setBookName("");
    } catch (error: any) {
      if (error instanceof ValidationError) {
        updateClientValidationMessages(error.errors);
      }
    }
  };

  return (
    <div>
      <form className="login" onSubmit={handleFormSubmission}>
        <label>
          <input
            type="text"
            value={bookName}
            placeholder="Enter book name"
            onChange={(event) => {
              setBookName(event.target.value);
            }}
          />
          <input type="submit" value="Add Book" />
        </label>
      </form>
    </div>
  );
});
