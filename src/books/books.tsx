import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { BooksPresenter } from "./books-presenter";

export const Books = observer(() => {
  const booksPresenter = useInjection(BooksPresenter);
  return (
    <>
      <h1>Books</h1>
      {booksPresenter.viewModel}
    </>
  );
});
