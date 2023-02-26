import { injectable, inject } from "inversify";
import { makeObservable, computed } from "mobx";
import { BooksRepository } from "./books-repository";

@injectable()
export class BooksListPresenter {
  constructor(
    @inject(BooksRepository) private booksRepository: BooksRepository
  ) {
    makeObservable(this, {
      books: computed,
    });
  }

  get books() {
    return this.booksRepository.booksPm.map((book: any) => ({
      id: book.id,
      visibleName: book.name,
    }));
  }
}
