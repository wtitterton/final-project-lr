import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { Messages } from "../core/messages/messages";
import { BookList } from "./books-list";
import { LastAddedBook } from "./last-added-book";
import { AddBooks } from "./add-books";
import { BooksPresenter } from "./books-presenter";

export const Books = observer(() => {
  const booksPresenter = useInjection(BooksPresenter);
  return (
    <>
      <h1>Books</h1>
      <LastAddedBook />
      <br />
      <AddBooks presenter={booksPresenter} />
      <br />
      <BookList />
      <br />
      <Messages />
    </>
  );
});
