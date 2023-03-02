import { injectable, inject } from "inversify";
import { makeObservable, observable } from "mobx";
import { HttpGateway, IMessagePacking, MessagePacking, Types } from "../core";
import { UserModel } from "../authentication";
import { BooksRepository } from "../books";

export interface AuthorDto {
  authorId: number;
  name: string;
  latLon: string;
  bookIds: number[];
}

export interface AuthorPm {
  id: number;
  name: string;
  bookIds: number[];
}

export interface GetAuthorsResponse {
  success: boolean;
  result: AuthorDto[];
}

@injectable()
export class AuthorsRepository {
  public messagePm: string = "UNSET";
  public authors: AuthorPm[] = [];

  constructor(
    @inject(Types.IDataGateway) private httpGateway: HttpGateway,
    @inject(UserModel) private userModel: UserModel,
    @inject(BooksRepository) private booksRepository: BooksRepository
  ) {
    makeObservable(this, {
      authors: observable,
      messagePm: observable,
    });
  }

  load = async () => {
    this.messagePm = "LOADING";
    this.authors = await this.getAuthors();
    this.messagePm = "";
  };

  getAuthors = async (): Promise<AuthorPm[]> => {
    const authorDto = await this.httpGateway.get<GetAuthorsResponse>(
      "/authors",
      `?emailOwnerId=${this.userModel.email}`
    );

    const authorPm = authorDto.result.map((author: AuthorDto) => {
      return {
        id: author.authorId,
        name: author.name,
        bookIds: author.bookIds,
      };
    });

    return authorPm;
  };

  addAuthorAndBooks = async (
    authorName: string,
    bookIds: number[]
  ): Promise<IMessagePacking> => {
    const authorDto: any = {
      name: authorName,
      bookIds: bookIds,
      latLon: [],
      emailOwnerId: this.userModel.email,
    };
    const addAuthorDto = await this.httpGateway.post<AuthorDto, any>(
      "/authors",
      authorDto
    );

    return MessagePacking.unpackServerDtoToPm(addAuthorDto);
  };

  reset = () => {
    this.messagePm = "UNSET";
    this.authors = [];
  };
}
