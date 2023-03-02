import { injectable, inject } from "inversify";
import { makeObservable, computed, observable } from "mobx";
import { BooksPm } from "../books";
import { MessagesPresenter, MessagesRepository } from "../core";
import { AddBooksPresenter } from "../books/books-presenter";
import { AuthorBookService, AuthorWithBooks } from "./author-book-service";

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
  public authors: AuthorVm[] = [];
  public toggleShowAuthors: boolean = true;

  constructor(
    @inject(AuthorBookService) private authorsBooksService: AuthorBookService,
    @inject(MessagesRepository) private _messagesRepository: MessagesRepository
  ) {
    super(_messagesRepository);
    makeObservable(this, {
      authors: observable,
      toggleShowAuthors: observable,
    });
  }

  private formatBooksString = (books: BooksPm[]): string => {
    return books.map((book: BooksPm) => book.name).join(",");
  };

  // get toggleShowAuthors(): boolean {
  //   return this.authorsBooksService.authorWithBooks.length <= 4;
  // }

  load = async () => {
    const authorsBooksPm = await this.authorsBooksService.load();
    const authorsVm = authorsBooksPm.map(
      (author: AuthorWithBooks): AuthorVm => ({
        id: author.id,
        name: author.name,
        books: this.formatBooksString(author.books),
      })
    );
    this.authors = authorsVm;
    this.toggleShowAuthors = authorsVm.length <= 4;
  };

  // get authors(): AuthorVm[] {
  //   return this.authorsBooksService.authorWithBooks.map(
  //     (author: AuthorWithBooks): AuthorVm => ({
  //       id: author.id,
  //       name: author.name,
  //       books: this.formatBooksString(author.books),
  //     })
  //   );
  // }

  addBook = async (name: string) => {
    this.authorsBooksService.addBook(name);
  };

  addAuthor = async (authorName: string) => {
    const addAuthorPm = await this.authorsBooksService.addAuthorAndBooks(
      authorName
    );

    if (addAuthorPm.success) {
      await this.load();
      this.authorsBooksService.reset();
    }

    this.unpackRepositoryPmToVm(addAuthorPm, "Aurthor Added");
  };
}
