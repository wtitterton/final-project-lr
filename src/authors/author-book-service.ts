import { injectable, inject } from "inversify";
import { makeObservable, observable } from "mobx";
import { IMessagePacking, MessagePacking } from "../core";
import { BooksPm, BooksRepository } from "../books";
import { AuthorPm, AuthorsRepository } from "./authors-repository";
import { v4 as uuidv4 } from "uuid";

export interface AuthorWithBooks {
  id: number;
  name: string;
  books: BooksPm[];
}

@injectable()
export class AuthorBookService {
  public messagePm: string = "UNSET";
  public authorWithBooks: AuthorWithBooks[] = [];

  constructor(
    @inject(AuthorsRepository) private authorsRepository: AuthorsRepository,
    @inject(BooksRepository) private booksRepository: BooksRepository
  ) {
    makeObservable(this, {
      authorWithBooks: observable,
      messagePm: observable,
    });
  }

  load = async () => {
    this.messagePm = "LOADING";
    this.authorWithBooks = await this.getAuthorsAndBooks();
    this.messagePm = "";
  };

  private constructAuthorPmWithBooksResponse = async (
    author: AuthorPm
  ): Promise<AuthorWithBooks> => {
    const books = await this.booksRepository.getBooksById(author.bookIds);
    const { id, name } = author;
    return {
      id,
      name,
      books: books,
    };
  };

  getAuthorsAndBooks = async (): Promise<AuthorWithBooks[]> => {
    const authorsPm = await this.authorsRepository.getAuthors();

    const booksPromises = authorsPm.map(
      (author: AuthorPm): Promise<AuthorWithBooks> => {
        return this.constructAuthorPmWithBooksResponse(author);
      }
    );

    return await Promise.all(booksPromises);
  };

  addAuthorAndBooks = async (authorName: string): Promise<IMessagePacking> => {
    const bookNames = this.booksRepository.booksPm.map(
      (book: BooksPm) => book.name
    );
    const addedBooksPm = await this.booksRepository.addBooks(bookNames);
    const bookIds = addedBooksPm.map(
      (bookPm: IMessagePacking) => bookPm.result.bookId
    );
    const addAuthorPm = await this.authorsRepository.addAuthorAndBooks(
      authorName,
      bookIds
    );
    
    return addAuthorPm;
  };

  addBook = async (name: string) => {
    this.booksRepository.booksPm = [
      ...this.booksRepository.booksPm,
      { name: name, id: uuidv4() },
    ];
  };

  reset() {}
}
