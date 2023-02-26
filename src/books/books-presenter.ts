import { injectable, inject } from "inversify";
import { makeObservable, computed, runInAction } from "mobx";
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
  constructor(
    @inject(BooksRepository) private booksRepository: BooksRepository,
    @inject(MessagesRepository) private _messagesRepository: MessagesRepository
  ) {
    super(_messagesRepository);
    makeObservable(this, {
      lastAddedBookName: computed,
    });
  }

  get lastAddedBookName() {
    // vm
    const lastAddedBookVm = this.booksRepository.lastAddedBookName;
    return lastAddedBookVm;
  }

  set lastAddedBookName(newLastAddedBookName) {
    this.lastAddedBookName = newLastAddedBookName;
  }

  addBook = async (book: BookDto): Promise<void> => {
    this.init();
    const addBookPm = await this.booksRepository.addBook(book);

    this.unpackRepositoryPmToVm(addBookPm, "Book Added");
  };

  reset = () => {
    this.lastAddedBookName = "";
  };
}
