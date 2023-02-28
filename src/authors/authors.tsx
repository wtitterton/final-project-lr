import { observer } from "mobx-react";
import { AuthorsList } from "./authors-list";
import { AddBooks, BookList } from "../books";
import { useInjection } from "inversify-react";
import { AuthorsPresenter } from "./authors-presenter";
export const Authors = observer(() => {
  const authorsPresenter = useInjection(AuthorsPresenter);
  return (
    <>
      <h1>Authors</h1>
      <AuthorsList />
      <AddBooks presenter={authorsPresenter} />
      <br />
      <BookList />
    </>
  );
});
