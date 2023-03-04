import { useInjection } from "inversify-react";
import { AuthorVm, AuthorsPresenter } from "./authors-presenter";
import { observer } from "mobx-react";

export const AuthorsList = observer(() => {
  const authorsPresenter = useInjection(AuthorsPresenter);
  const { authors } = authorsPresenter;

  return (
    <>
      {authors.map((author: AuthorVm, i) => {
        return (
          <div key={author.id}>
            {" "}
            {author.name} | {author.books}
          </div>
        );
      })}
      <br />
    </>
  );
});
