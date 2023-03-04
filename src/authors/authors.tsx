import { observer } from "mobx-react";
import { AuthorsList } from "./authors-list";
import { AddBooks, BookList } from "../books";
import { useInjection } from "inversify-react";
import { AuthorsPresenter } from "./authors-presenter";
import { Messages } from "../core/messages/messages";
import { AddAuthor } from "./add-author";
import { useEffect, useState } from "react";
export const Authors = observer(() => {
  const authorsPresenter = useInjection(AuthorsPresenter);
  const [toggleShowAuthors, setToggleShowAuthors] = useState(false);

  useEffect(() => {
    const load = async () => {
      await authorsPresenter.load();
    };
    load();
  }, []);

  // When author changes get value of computed property
  useEffect(() => {
    setToggleShowAuthors(authorsPresenter.toggleShowAuthors);
  }, [authorsPresenter.authors]);

  return (
    <>
      <h1>Authors</h1>
      <input
        value="show author list"
        type="button"
        onClick={() => {
          setToggleShowAuthors(!toggleShowAuthors)
        }}
      />

      {toggleShowAuthors && <AuthorsList />}
      <br />
      <AddAuthor />
      <br />
      <AddBooks presenter={authorsPresenter} />
      <br />
      <BookList />
      <Messages />
    </>
  );
});
