import { BooksRepository } from "../books";
import { Types } from "../core";
import { AppTestHarness, GetSuccessfulUserLoginStub } from "../test-tools";
import { AuthorBookService } from "./author-book-service";
import { AuthorsRepository } from "./authors-repository";

let appTestHarness: AppTestHarness;
let authorBooksService: AuthorBookService;
let authorsRepository: AuthorsRepository;
let booksRepository: BooksRepository;
let onRouteChange = () => {};

let dynamicBookNamesStack = ["book 1", "book 2", "book 3"];

describe("Loading authors and books", () => {
  beforeEach(async () => {
    appTestHarness = new AppTestHarness();
    appTestHarness.bootStrap(onRouteChange);
    authorBooksService = appTestHarness.container.get(AuthorBookService);
    await appTestHarness.setupLogin(GetSuccessfulUserLoginStub);
  });

  it("should load list author and books into ViewModel", async () => {
    const authorBooksServiceLoadSpy = jest.spyOn(authorBooksService, "load");
    const { authors } = await appTestHarness.setupLoadAuthors(
      dynamicBookNamesStack
    );
    expect(authors.length).toBe(5);
    expect(authorBooksServiceLoadSpy).toHaveBeenCalled();
    // spot check
    expect(authors[0].name).toBe("Isaac Asimov");
    expect(authors[0].books).toBe("book 1,book 2");
    expect(authors[4].name).toBe("Sam Jones");
    expect(authors[4].books).toBe("book 2,book 3");
  });

  it("should show author list (toggle) when has authors", async () => {
    const { authors, toggleShowAuthors } =
      await appTestHarness.setupLoadAuthors(dynamicBookNamesStack, 3);
    expect(authors.length).toBe(3);
    expect(toggleShowAuthors).toBe(true);
  });

  it("should hide author list (toggle) when has more than 4 authors", async () => {
    const { authors, toggleShowAuthors } =
      await appTestHarness.setupLoadAuthors(dynamicBookNamesStack);
    expect(authors.length).toBe(5);
    expect(toggleShowAuthors).toBe(false);
  });
});

describe("Saving books", () => {
  let addBooksSpy: jest.SpyInstance;
  let addAuthorSpy: jest.SpyInstance;
  beforeEach(async () => {
    jest.restoreAllMocks();
    appTestHarness = new AppTestHarness();
    appTestHarness.bootStrap(onRouteChange);
    authorBooksService = appTestHarness.container.get(AuthorBookService);
    authorsRepository = appTestHarness.container.get(Types.IAuthorsRepository);
    booksRepository = appTestHarness.container.get(Types.IBooksRepository);
    addAuthorSpy = jest.spyOn(authorsRepository, "addAuthorAndBooks");
    addBooksSpy = jest.spyOn(booksRepository, "addBook");
    await appTestHarness.setupLogin(GetSuccessfulUserLoginStub);
  });

  it("should allow single author to be added and will reload authors list", async () => {
    const { authors } = await appTestHarness.setupLoadAuthors(
      dynamicBookNamesStack
    );

    expect(authors.length).toBe(5);

    // Pivot
    const authorBooksServiceLoadSpy = jest.spyOn(authorBooksService, "load");
    const authorPresenter = await appTestHarness.setupAddAuthor("New Author");

    expect(authorPresenter.authors.length).toBe(6);
    expect(authorPresenter.authors[5].name).toBe("New Author");
    expect(authorBooksServiceLoadSpy).toHaveBeenCalled();
  });

  it("should make the correct API calls when author added with no books", async () => {
    await appTestHarness.setupAddAuthor("New Author");

    expect(addBooksSpy).not.toHaveBeenCalled();
    expect(addAuthorSpy).toHaveBeenCalledWith("New Author", []);
  });

  it("should allow books to be staged and then save authors and books to api", async () => {
    const { authors } = await appTestHarness.setupLoadAuthors(
      dynamicBookNamesStack
    );

    expect(authors.length).toBe(5);

    // Pivot
    const authorBooksServiceLoadSpy = jest.spyOn(authorBooksService, "load");
    const authorPresenter = await appTestHarness.setupAddAuthor(
      "New Author",
      [...dynamicBookNamesStack, "New Book 1", "New Book 2"],
      [4, 5]
    );

    expect(authorPresenter.authors.length).toBe(6);
    expect(authorPresenter.authors[5].books).toBe("New Book 1,New Book 2");
    expect(authorPresenter.authors[5].name).toBe("New Author");
    expect(authorBooksServiceLoadSpy).toHaveBeenCalled();
  });

  it("should make the correct API calls when author added with books", async () => {
    await appTestHarness.setupAddAuthor(
      "New Author",
      ["New Book 1", "New Book 2"],
      [4, 5]
    );

    expect(addBooksSpy).toBeCalledTimes(2);
    expect(addBooksSpy).toHaveBeenCalledWith("New Book 1");
    expect(addBooksSpy).toHaveBeenCalledWith("New Book 2");
    expect(addAuthorSpy).toHaveBeenCalledWith("New Author", [4, 5]);
  });
});
