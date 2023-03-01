import { injectable, inject } from "inversify";
import { makeObservable, computed } from "mobx";
import { BookDto, BooksRepository } from "./books-repository";
import { MessagesPresenter, MessagesRepository } from "../core";

export interface AddBooksPresenter {
  addBook: (name: string) => Promise<void>;
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

  addBook = async (name: string): Promise<void> => {
    this.init();
    const addBookPm = await this.booksRepository.addBook(name);

    if (addBookPm.success) {
      await this.booksRepository.load();
      this.booksRepository.lastAddedBookName = name;
    }

    this.unpackRepositoryPmToVm(addBookPm, "Book Added");
  };

  reset = () => {
    this.lastAddedBookName = "";
  };
}
