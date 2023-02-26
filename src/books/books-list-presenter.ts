import { injectable, inject } from "inversify";
import { makeObservable, computed } from "mobx";
import { BooksPm, BooksRepository } from "./books-repository";

interface BooksVm {
  id: number;
  visibleName: string;
}

@injectable()
export class BooksListPresenter {
  constructor(
    @inject(BooksRepository) private booksRepository: BooksRepository
  ) {
    makeObservable(this, {
      books: computed,
    });
  }

  get books(): BooksVm[] {
    return this.booksRepository.booksPm.map((book: BooksPm) => ({
      id: book.id,
      visibleName: book.name,
    }));
  }
}
