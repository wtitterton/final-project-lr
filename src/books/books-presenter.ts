import { injectable, inject } from "inversify";
import { makeObservable, computed } from "mobx";
import { BookDto, BooksRepository } from "./books-repository";
import { MessagesPresenter, MessagesRepository } from "../core";

export interface AddBooksPresenter {
  addBook: (book: BookDto) => Promise<void>;
}

@injectable()
export class BooksPresenter
  extends MessagesPresenter
  implements AddBooksPresenter
{
  public newBookName: string | null = null;

  constructor(
    @inject(BooksRepository) private booksRepository: BooksRepository,
    @inject(MessagesRepository) private _messagesRepository: MessagesRepository
  ) {
    super(_messagesRepository);
    makeObservable(this, {
      viewModel: computed,
    });
  }

  get viewModel() {
    this.newBookName = this.booksRepository.lastAddedBookName;
    return this.newBookName;
  }

  addBook = async (book: BookDto): Promise<void> => {
    this.init();
    const addBookPm = await this.booksRepository.addBook(book);

    this.unpackRepositoryPmToVm(addBookPm, "Book Added");
  };

  reset = () => {
    this.newBookName = "";
  };
}
