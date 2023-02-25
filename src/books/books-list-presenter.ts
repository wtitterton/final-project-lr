import { injectable, inject } from "inversify";
import { makeObservable, computed } from "mobx";
import { BooksRepository } from "./books-repository";

@injectable()
export class BooksListPresenter {

  constructor(
    @inject(BooksRepository) private booksRepository: BooksRepository
  ) {
    makeObservable(this, {
      viewModel: computed,
    });
  }

  get viewModel() {
    return  this.booksRepository.booksPm.map((book: any) => ({id: book.id, visibleName: book.name}))
  }

}
