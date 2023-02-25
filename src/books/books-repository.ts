import { injectable, inject } from "inversify";
import { makeObservable, action, toJS, observable } from "mobx";
import { Config, HttpGateway, MessagePacking, Types } from "../core";
import { UserModel } from "../authentication";
@injectable()
export class BooksRepository {
  public messagePm: string = "LOADING";
  public booksPm: any[] = [];
  
  constructor(
    @inject(Types.IDataGateway) private httpGateway: HttpGateway,
    @inject(UserModel) private userModel: UserModel
  ) {
    makeObservable(this, { messagePm: observable, booksPm: observable });
  }

  load = async () => {
    this.messagePm = "LOADING";
    this.booksPm = await this.getBooks();
    this.messagePm = "";
  };

  getBooks = async () => {
    const booksDto: any = await this.httpGateway.get('/books', `?emailOwnerId=${this.userModel.email}`);
    
    const booksPm = booksDto.result.map((book: any) => ({
      id: book.bookId,
      name: book.name,
    }))

    return booksPm;
  }

  reset = () => {
    this.booksPm = [];
  };
}
