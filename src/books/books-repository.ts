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
  name: string;
  emailOwnerId: string;
}

@injectable()
export class BooksRepository {
  public messagePm: string = "UNSET";
  public booksPm: any[] = [];
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

  getBooks = async () => {
    const booksDto: any = await this.httpGateway.get(
      "/books",
      `?emailOwnerId=${this.userModel.email}`
    );

    const booksPm = booksDto.result.map((book: any) => ({
      id: book.bookId,
      name: book.name,
    }));

    return booksPm;
  };

  addBook = async (bookDto: BookDto): Promise<IMessagePacking> => {
    const addBookDto = await this.httpGateway.post<BookDto, any>(
      "/books",
      bookDto
    );

    if (addBookDto.success) {
      this.lastAddedBookName = bookDto.name;
      this.load();
    }

    return MessagePacking.unpackServerDtoToPm(addBookDto);
  };

  reset = () => {
    this.booksPm = [];
    this.messagePm = "UNSET";
  };
}
