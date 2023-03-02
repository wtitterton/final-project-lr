import { observer } from "mobx-react";
import { useState } from "react";
import { useValidation, validateInput } from "../core";
import { ValidationError } from "yup";
import { addAuthorSchema } from "./add-author-schema";
import { useInjection } from "inversify-react";
import { AuthorsPresenter } from "./authors-presenter";
import { AuthorBookService } from "./author-book-service";

export const AddAuthor = observer(() => {
  const [clientValidationMessages, updateClientValidationMessages] =
    useValidation();
  const [authorName, setAuthorName] = useState<string>("");
  const authorPresenter = useInjection(AuthorsPresenter);

  const handleFormSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      updateClientValidationMessages([]);
      const addBookDto = {
        name: authorName,
      };
      validateInput(addAuthorSchema, addBookDto);
      await authorPresenter.addAuthor(authorName);
      setAuthorName("");
    } catch (error: any) {
      if (error instanceof ValidationError) {
        updateClientValidationMessages(error.errors);
      }
    }
  };

  return (
    <>
      <div>
        <form className="login" onSubmit={handleFormSubmission}>
          <label>
            <input
              type="text"
              value={authorName}
              placeholder="Enter author name"
              onChange={(event) => {
                setAuthorName(event.target.value);
              }}
            />
            <input type="submit" value="Submit author and books" />
          </label>
        </form>
      </div>
    </>
  );
});
