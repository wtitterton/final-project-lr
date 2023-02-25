import { injectable, inject } from "inversify";
import { makeObservable, computed } from "mobx";
import { BooksRepository } from "./books-repository";

@injectable()
export class BooksPresenter {
  public newBookName: string | null = null;

  constructor(
    @inject(BooksRepository) private booksRepository: BooksRepository
  ) {
    makeObservable(this, {
      viewModel: computed,
    });
  }

  get viewModel() {
    return this.booksRepository.messagePm;
  }

  reset = () => {
    this.newBookName = "";
  };
}
