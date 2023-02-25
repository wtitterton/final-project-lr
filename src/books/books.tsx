import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { BooksPresenter } from "./books-presenter";
import { Messages } from "../core/messages/messages";
import { BooksListPresenter } from "./books-list-presenter";
import { BookList } from "./books-list";

export const Books = observer(() => {
  const booksPresenter = useInjection(BooksPresenter);
  return (
    <>
      <h1>Books</h1>
      {booksPresenter.viewModel}
      <br />
      <BookList />
      <Messages />
    </>
  );
});
