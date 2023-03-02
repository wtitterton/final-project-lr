import { observer } from "mobx-react";
import { AuthorsList } from "./authors-list";
import { AddBooks, BookList } from "../books";
import { useInjection } from "inversify-react";
import { AuthorVm, AuthorsPresenter } from "./authors-presenter";
import { Messages } from "../core/messages/messages";
import { AddAuthor } from "./add-author";
import { useEffect, useState } from "react";
export const Authors = observer((props: any) => {
  const authorsPresenter = useInjection(AuthorsPresenter);
  console.log("toggle", authorsPresenter.toggleShowAuthors);
  

  useEffect(() => {
    const load = async () => {
     await authorsPresenter.load();
     console.log('loading');
    }

    load();
  }, [])


  return (
    <>
      <h1>Authors</h1>
      <input value="show author list" type="button" onClick={() => {
       authorsPresenter.toggleShowAuthors = !authorsPresenter.toggleShowAuthors
      }} />

      { authorsPresenter.toggleShowAuthors && <AuthorsList  /> }
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
