import { makeObservable, observable } from "mobx";
import { inject, injectable } from "inversify";
import { RouterGateway } from "./router-gateway";
import { Route } from "./routes";
import { Types } from "../core";
import { BooksRepository } from "../books";
import { AuthorsRepository } from "../authors/authors-repository";
import { AuthorBookService } from "../authors/author-book-service";

@injectable()
export class RouterRepository {
  constructor(
    @inject(BooksRepository) private booksRepository: BooksRepository,
    @inject(AuthorBookService) private authorsBooksService: AuthorBookService,
    @inject(Types.IRouterGateway) private routerGateway: RouterGateway
  ) {
    makeObservable(this, {
      currentRoute: observable,
    });
  }

  currentRoute: Route = {
    routeId: null,
    routeDef: { path: null, isSecure: true },
  };
  onRouteChanged = () => {};
  private routes: any[] = [
    {
      routeId: "homeLink",
      routeDef: {
        path: "/app/home",
        isSecure: true,
      },
    },
    {
      routeId: "booksLink",
      routeDef: {
        path: "/app/books",
        isSecure: true,
      },
      onEnter: async () => {
        await this.booksRepository.load();
      },
      onLeave: () => {
        console.log("leaving");
        this.booksRepository.reset();
      },
    },
    {
      routeId: "authorsLink",
      routeDef: {
        path: "/app/authors",
        isSecure: true,
      },
      onLeave: () => {
        this.authorsBooksService.reset();
      },
    },
    {
      routeId: "loginLink",
      routeDef: {
        path: "/app/authentication/login",
        isSecure: false,
      },
    },
    {
      routeId: "default",
      routeDef: {
        path: "*",
        isSecure: false,
      },
      onEnter: () => {},
    },
  ];

  registerRoutes = (updateCurrentRoute: any, onRouteChanged: any) => {
    this.onRouteChanged = onRouteChanged;
    const routeConfig: { [key: string]: any } = {};
    this.routes.forEach((routeArg) => {
      const route: any = this.findRoute(routeArg.routeId);
      routeConfig[route.routeDef.path] = {
        as: route.routeId,
        uses: (match: any) => {
          updateCurrentRoute(
            route.routeId,
            route.routeDef,
            {},
            match.queryString
          );
        },
      };
    });
    this.routerGateway.registerRoutes(routeConfig);
  };

  findRoute(routeId: string): Route {
    const route = this.routes.find((route) => {
      return route.routeId === routeId;
    });
    return route || { routeId: "loadingSpinner", routeDef: { path: "" } };
  }

  goToId = async (routeId: string, params?: string, query?: string) => {
    this.routerGateway.goToId(routeId);
  };
}
