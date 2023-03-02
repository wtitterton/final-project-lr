import { injectable, inject } from "inversify";
import { makeObservable, action, toJS, observable } from "mobx";
import {
  Config,
  HttpGateway,
  IMessagePacking,
  MessagePacking,
  Types,
} from "../core";
import { UserModel } from "../authentication";

export interface BookDto {
  bookId?: number;
  name: string;
  emailOwnerId: string;
  devOwnerId?: string;
}

export interface BooksPm {
  id: number | string;
  name: string;
}

export interface GetBooksResponse {
  success: boolean;
  result: BookDto[];
}

interface addBookResponse {
  success: boolean;
  result: {
    bookId: number;
    message: string;
  };
}

@injectable()
export class BooksRepository {
  public messagePm: string = "UNSET";
  public booksPm: BooksPm[] = [];
  public lastAddedBookName: string | null = null;

  constructor(
    @inject(Types.IDataGateway) private httpGateway: HttpGateway,
    @inject(UserModel) private userModel: UserModel
  ) {
    makeObservable(this, {
      messagePm: observable,
      booksPm: observable,
      lastAddedBookName: observable,
    });
  }

  load = async () => {
    this.messagePm = "LOADING";
    this.booksPm = await this.getBooks();
    this.messagePm = "";
  };

  getBooks = async (): Promise<BooksPm[]> => {
    const booksDto = await this.httpGateway.get<GetBooksResponse>(
      "/books",
      `?emailOwnerId=${this.userModel.email}`
    );

    return booksDto.result.map((book: BookDto): BooksPm => {
      if (book.bookId === undefined) {
        throw Error("found a book with no id");
      }
      return {
        id: book.bookId,
        name: book.name,
      };
    });
  };

  addBook = async (name: string): Promise<IMessagePacking> => {
    if (this.userModel.email === null) {
      throw new Error("user model email not set");
    }

    const bookDto: BookDto = {
      name: name,
      emailOwnerId: this.userModel.email,
    };
    const addBookDto = await this.httpGateway.post<BookDto, addBookResponse>(
      "/books",
      bookDto
    );

    return MessagePacking.unpackServerDtoToPm(addBookDto);
  };

  getBooksById = async (bookIds: number[]): Promise<BooksPm[]> => {
    const booksPromises = bookIds.map((bookId: number) => this.getBook(bookId));
    return await Promise.all(booksPromises);
  };

  getBook = async (bookId: number): Promise<BooksPm> => {
    const bookDto = await this.httpGateway.get<GetBooksResponse>(
      "/book",
      `?emailOwnerId=${this.userModel.email}&bookId=${bookId}`
    );

    const booksPm = {
      id: bookId,
      name: bookDto.result[0].name,
    };

    return booksPm;
  };

  reset = () => {
    this.booksPm = [];
    this.messagePm = "UNSET";
  };
}
