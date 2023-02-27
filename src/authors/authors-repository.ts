import { injectable, inject } from "inversify";
import { makeObservable, observable } from "mobx";
import { HttpGateway, IMessagePacking, MessagePacking, Types } from "../core";
import { UserModel } from "../authentication";
import { BooksPm, BooksRepository } from "../books";

export interface AuthorDto {
  authorId: number;
  name: string;
  latLon: string;
  bookIds: number[];
}

export interface AuthorsPm {
  id: number;
  name: string;
  books: BooksPm[];
}

export interface GetAuthorsResponse {
  success: boolean;
  result: AuthorDto[];
}

@injectable()
export class AuthorsRepository {
  public messagePm: string = "UNSET";
  public authors: AuthorsPm[] = [];
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
    this.authors = await this.getAuthorsAndBooks();
  };

  private constructAuthorPmWithBooksResponse = async (
    author: AuthorDto
  ): Promise<AuthorsPm> => {
    const books = await this.booksRepository.getBooksById(author.bookIds);
    const { authorId, name } = author;
    return {
      id: authorId,
      name,
      books: books,
    };
  };

  getAuthorsAndBooks = async (): Promise<AuthorsPm[]> => {
    const authorDto = await this.httpGateway.get<GetAuthorsResponse>(
      "/authors",
      `?emailOwnerId=${this.userModel.email}`
    );

    const booksPromises = authorDto.result.map(
      (author: AuthorDto): Promise<AuthorsPm> => {
        return this.constructAuthorPmWithBooksResponse(author);
      }
    );

    return await Promise.all(booksPromises);
  };

  reset = () => {
    this.messagePm = "UNSET";
  };
}
