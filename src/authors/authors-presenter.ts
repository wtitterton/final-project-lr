import { injectable, inject } from "inversify";
import { makeObservable, computed } from "mobx";
import { BookDto, BooksPm, BooksRepository } from "../books";
import { MessagesPresenter, MessagesRepository } from "../core";
import { AddBooksPresenter } from "../books/books-presenter";
import { BooksVm } from "../books/books-list-presenter";
import { AuthorsPm, AuthorsRepository } from "./authors-repository";

export interface AuthorVm {
  id: number;
  name: string;
  books: string;
}

@injectable()
export class AuthorsPresenter
  extends MessagesPresenter
  implements AddBooksPresenter
{
  constructor(
    @inject(AuthorsRepository) private authorsRepository: AuthorsRepository,
    @inject(MessagesRepository) private _messagesRepository: MessagesRepository
  ) {
    super(_messagesRepository);
    makeObservable(this, {
      authors: computed,
      books: computed,
    });
  }

  private formatBooksString = (books: BooksPm[]): string => {
    return books.map((book: BooksPm) => book.name).join(",");
  };

  get authors(): AuthorVm[] {
    return this.authorsRepository.authors.map(
      (author: AuthorsPm): AuthorVm => ({
        id: author.id,
        name: author.name,
        books: this.formatBooksString(author.books),
      })
    );
  }

  get books(): any[] {
    return this.authorsRepository.books;
  }

  addBook = async (name: string) => {
    this.authorsRepository.addBook(name);
  };
}
