import * as React from "react";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { BooksPresenter } from "./books-presenter";

export const LastAddedBook = observer(() => {
  const booksPresenter = useInjection(BooksPresenter);
  return (
    <>
      <p>Last Added Book : {booksPresenter.viewModel}</p>
    </>
  );
});
