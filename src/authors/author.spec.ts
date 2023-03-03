import { BooksPresenter, BooksRepository } from "../books";
import { FakeHttpGateway, Types } from "../core";
import { AppTestHarness, GetSuccessfulUserLoginStub } from "../test-tools";
import { AuthorBookService } from "./author-book-service";
import { AuthorsPresenter } from "./authors-presenter";

let appTestHarness: AppTestHarness;
let httpGateway: FakeHttpGateway;
let authorBooksService: AuthorBookService;
let authorsPresenter: AuthorsPresenter;
let booksRepository: BooksRepository;
let onRouteChange = () => {};

let dynamicBookNamesStack = ["book 1", "book 2", "book 3"];

describe("Loading authors and books", () => {
  beforeEach(async () => {
    appTestHarness = new AppTestHarness();
    appTestHarness.bootStrap(onRouteChange);
    httpGateway = appTestHarness.container.get(Types.IDataGateway);
    await appTestHarness.setupLogin(GetSuccessfulUserLoginStub);
  });

  it("should load list author and books into ViewModel", async () => {
    const { authors } = await appTestHarness.setupLoadAuthors(
      dynamicBookNamesStack
    );
    expect(authors.length).toBe(5);

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
  beforeEach(async () => {
    appTestHarness = new AppTestHarness();
    appTestHarness.bootStrap(onRouteChange);
    httpGateway = appTestHarness.container.get(Types.IDataGateway);
    await appTestHarness.setupLogin(GetSuccessfulUserLoginStub);
  });
  it("should allow single author to be added and will reload authors list", async () => {});

  it("should allow books to be staged and then save authors and books to api", async () => {});
});
