import * as React from "react";
import { observer } from "mobx-react";

import { BooksListPresenter } from "./books-list-presenter";
import { useInjection } from "inversify-react";

export const BookList = observer(() => {
  const bookListPresenter = useInjection(BooksListPresenter);
  const { books } = bookListPresenter;
  return (
    <>
      {books.map((book, i) => {
        return <div key={book.id}>{book.visibleName}</div>;
      })}
      <br />
    </>
  );
});
