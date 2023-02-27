import { observer } from "mobx-react";
import { AuthorsList } from "./authors-list";
export const Authors = observer(() => {
  return (
    <>
      <h1>Authors</h1>
      <AuthorsList />
    </>
  );
});
