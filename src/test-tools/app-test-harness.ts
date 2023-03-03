import { FakeHttpGateway, Types } from "../core";
import { BaseIOC } from "../base-ioc";
import { FakeRouterGateway, Router, RouterRepository } from "../routing";
import { LoginRegisterPresenter } from "../authentication";
import { AppPresenter } from "../app-presenter";
import { Container } from "inversify";
import { BookDto, BooksRepository, GetBooksResponse } from "../books";
import { BooksListPresenter } from "../books/books-list-presenter";
import { SingleBooksResultStub } from "./single-books-result-stub";
import { GetSuccessfulBookAddedStub } from "./get-successful-book-added-stub";
import { BooksPresenter } from "../books/books-presenter";
import {
  SingleAuthorsResultStub,
  bookNames,
} from "./single-authors-result-stub";
import { AuthorsPresenter } from "../authors";
import { SingleBookResultStub } from "./single-book-result-stub";

interface RegistratonCredentials {
  email: string;
  password: string;
}

export class AppTestHarness {
  public container: Container;
  private httpGateway: FakeHttpGateway;
  private appPresenter: AppPresenter;
  public router: Router;
  private routerRepository: RouterRepository;
  private routerGateway: FakeRouterGateway;
  private loginRegisterPresenter: LoginRegisterPresenter;
  private booksListPresenter: BooksListPresenter;
  private authorPresenter: AuthorsPresenter;

  constructor() {
    this.container = new BaseIOC().buildBaseTemplate();
    this.container
      .bind(Types.IDataGateway)
      .to(FakeHttpGateway)
      .inSingletonScope();
    this.container
      .bind(Types.IRouterGateway)
      .to(FakeRouterGateway)
      .inSingletonScope();
    this.httpGateway = this.container.get(FakeHttpGateway);
    this.appPresenter = this.container.get(AppPresenter);
    this.router = this.container.get(Types.IRouter);
    this.routerRepository = this.container.get(RouterRepository);
    this.routerGateway = this.container.get(Types.IRouterGateway);
    this.loginRegisterPresenter = this.container.get(LoginRegisterPresenter);
    this.booksListPresenter = this.container.get(BooksListPresenter);
    this.authorPresenter = this.container.get(AuthorsPresenter);

    let self = this;

    this.routerGateway.goToId = jest.fn().mockImplementation((routeId) => {
      self.router.updateCurrentRoute(routeId);
    });
  }

  // 2. bootstrap the app
  bootStrap(onRouteChange: () => void) {
    this.appPresenter.load(onRouteChange);
  }

  // 3. login or register to the app
  setupLogin = async (loginStub: () => any) => {
    this.httpGateway = this.container.get(Types.IDataGateway);
    this.httpGateway.post = jest.fn().mockResolvedValue(loginStub());

    this.loginRegisterPresenter = this.container.get(LoginRegisterPresenter);
    this.loginRegisterPresenter.email = "a@b.com";
    this.loginRegisterPresenter.password = "123";

    await this.loginRegisterPresenter.login({
      email: this.loginRegisterPresenter.email,
      password: this.loginRegisterPresenter.password,
    });

    return this.loginRegisterPresenter;
  };

  setupRegistration = async (
    registrationStub: () => any,
    registratonCredentials: RegistratonCredentials
  ) => {
    const { email, password } = registratonCredentials;

    this.httpGateway = this.container.get(Types.IDataGateway);
    this.httpGateway.post = jest.fn().mockImplementation((path) => {
      return Promise.resolve(registrationStub());
    });

    await this.loginRegisterPresenter.register({ email, password });

    return this.loginRegisterPresenter;
  };

  setupGetAllBooks = async (
    getBooksStub: () => GetBooksResponse
  ): Promise<BooksListPresenter> => {
    this.httpGateway = this.container.get(Types.IDataGateway);
    this.httpGateway.get = jest.fn().mockResolvedValue(getBooksStub());
    const booksRepository = this.container.get(BooksRepository);
    await booksRepository.load();

    return this.booksListPresenter;
  };

  setupAddBooks = async (name: string, dynnamicBookId: number) => {
    this.httpGateway = this.container.get(Types.IDataGateway);

    const bookAddedResponse = GetSuccessfulBookAddedStub(dynnamicBookId);
    this.httpGateway.post = jest.fn().mockResolvedValue(bookAddedResponse);

    const getBooksReponse = SingleBooksResultStub();
    const addedBook = {
      bookId: bookAddedResponse.result.bookId,
      name: name,
      emailOwnerId: "wftitterton@gmail.com",
      devOwnerId: "pete@logicroom.co",
    };

    this.httpGateway.get = jest.fn().mockResolvedValue({
      success: getBooksReponse.success,
      result: [...getBooksReponse.result, addedBook],
    });

    const booksPresenter = this.container.get(BooksPresenter);
    await booksPresenter.addBook(name);

    return this.booksListPresenter;
  };

  setupLoadAuthors = async (
    numberOfResults?: number
  ): Promise<AuthorsPresenter> => {
    this.httpGateway = this.container.get(Types.IDataGateway);
    const { success, result } = SingleAuthorsResultStub();

    const authorsResponse = {
      success,
      result,
    };

    if (numberOfResults !== undefined && numberOfResults < result.length) {
      authorsResponse.result = result.slice(0, numberOfResults);
    }

    const mockResponses = jest.fn().mockResolvedValueOnce(authorsResponse);

    authorsResponse.result.forEach((author) => {
      author.bookIds.forEach((bookId: number) => {
        mockResponses.mockResolvedValueOnce(
          SingleBookResultStub(bookId, bookNames[bookId - 1])
        );
      });
    });

    this.httpGateway.get = mockResponses;

    await this.authorPresenter.load();
    return this.authorPresenter;
  };
}
