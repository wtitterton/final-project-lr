import { FakeHttpGateway, Types } from "../core";
import {
  AppTestHarness,
  GetSuccessfulUserLoginStub,
  SingleBooksResultStub,
} from "../test-tools";
import { BooksPresenter } from "./books-presenter";
import { BooksRepository } from "./books-repository";

let appTestHarness: AppTestHarness;
let booksPresenter: BooksPresenter;
let booksRepository: BooksRepository;
let httpGateway: FakeHttpGateway;
let onRouteChange = () => {};

describe("Loading books", () => {
  beforeEach(async () => {
    appTestHarness = new AppTestHarness();
    appTestHarness.bootStrap(onRouteChange);
    httpGateway = appTestHarness.container.get(Types.IDataGateway);
    await appTestHarness.setupLogin(GetSuccessfulUserLoginStub);
  });

  it("Should make the correct api call to get all books", async () => {
    await appTestHarness.setupGetAllBooks(SingleBooksResultStub);
    // assert the correct api call
    expect(httpGateway.get).toHaveBeenCalledWith(
      "/books",
      `?emailOwnerId=a@b.com`
    );
  });

  it("Should show books list", async () => {
    const { books } = await appTestHarness.setupGetAllBooks(
      SingleBooksResultStub
    );

    expect(books.length).toBe(4);
    // Spot check
    expect(books[1].visibleName).toBe("I, Robot");
    expect(books[3].visibleName).toBe("Wind In The Willows 2");
  });
});

describe("Adding books", () => {
  beforeEach(async () => {
    appTestHarness = new AppTestHarness();
    appTestHarness.bootStrap(onRouteChange);
    booksPresenter = appTestHarness.container.get(BooksPresenter);
    booksRepository = appTestHarness.container.get(BooksRepository);
    httpGateway = appTestHarness.container.get(Types.IDataGateway);
    await appTestHarness.setupLogin(GetSuccessfulUserLoginStub);
  });

  it("Should reload books list on save", async () => {
    const NEW_BOOK_NAME = "New Book";
    const bookRepositoryLoadSpy = jest.spyOn(booksRepository, "load");

    const booksListPresenter = await appTestHarness.setupGetAllBooks(
      SingleBooksResultStub
    );

    expect(booksListPresenter.books.length).toBe(4);

    // pivot and add a book
    await appTestHarness.setupAddBooks(NEW_BOOK_NAME, 20);

    expect(bookRepositoryLoadSpy).toBeCalled();
    expect(booksListPresenter.books.length).toBe(5);
    expect(booksListPresenter.books[4].visibleName).toBe(NEW_BOOK_NAME);
  });

  it("Should make the correct api calls when adding a book", async () => {
    const NEW_BOOK_NAME = "New Book";
    const EMAIL_OWNER_ID = "a@b.com";

    const newBook = { name: NEW_BOOK_NAME, emailOwnerId: EMAIL_OWNER_ID };
    await appTestHarness.setupAddBooks(NEW_BOOK_NAME, 20);

    expect(httpGateway.post).toHaveBeenCalledWith("/books", newBook);
  });

  it("should update books message", async () => {
    const NEW_BOOK_NAME = "New Book";

    await appTestHarness.setupAddBooks(NEW_BOOK_NAME, 20);

    expect(booksPresenter.messages).toEqual(["Book Added"]);
  });

  it("should show name of most recently added book", async () => {
    const NEW_BOOK_NAME = "New Book";

    await appTestHarness.setupAddBooks(NEW_BOOK_NAME, 20);

    expect(booksPresenter.lastAddedBookName).toBe(NEW_BOOK_NAME);
  });
});
