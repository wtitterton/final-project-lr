import { Container } from "inversify";
import { MessagesRepository, Types } from "./core";
import { Router, RouterRepository } from "./routing";
import { NavigationRepository } from "./navigation";
import { UserModel } from "./authentication";
import { BooksRepository } from "./books";
import { AuthorsRepository } from "./authors/authors-repository";
import { AuthorsPresenter } from "./authors";
import { AuthorBookService } from "./authors/author-book-service";

export class BaseIOC {
  container;

  constructor() {
    this.container = new Container({
      autoBindInjectable: true,
      defaultScope: "Transient",
    });
  }

  buildBaseTemplate = () => {
    this.container.bind<Router>(Types.IRouter).to(Router).inSingletonScope();
    this.container
      .bind<MessagesRepository>(MessagesRepository)
      .to(MessagesRepository)
      .inSingletonScope();
    this.container
      .bind<RouterRepository>(Types.IRouterRepository)
      .to(RouterRepository)
      .inSingletonScope();
    this.container
      .bind<NavigationRepository>(NavigationRepository)
      .to(NavigationRepository)
      .inSingletonScope();
    this.container.bind<UserModel>(UserModel).to(UserModel).inSingletonScope();
    this.container
      .bind<BooksRepository>(Types.IBooksRepository)
      .to(BooksRepository)
      .inSingletonScope();
    this.container
      .bind(AuthorBookService)
      .to(AuthorBookService)
      .inSingletonScope();
    this.container
      .bind(AuthorsPresenter)
      .to(AuthorsPresenter)
      .inSingletonScope();
    this.container
      .bind<AuthorsRepository>(Types.IAuthorsRepository)
      .to(AuthorsRepository)
      .inSingletonScope();
    return this.container;
  };
}
