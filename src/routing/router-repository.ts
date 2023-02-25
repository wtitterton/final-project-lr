import { makeObservable, observable } from "mobx";
import { inject, injectable } from "inversify";
import { RouterGateway } from "./router-gateway";
import { Route, routes } from "./routes";
import { Types } from "../core";

@injectable()
export class RouterRepository {
  currentRoute: Route = {
    routeId: null,
    routeDef: { path: null, isSecure: true },
  };
  onRouteChanged = () => {};
  private routes: any[] = routes;

  constructor(
    @inject(Types.IRouterGateway) private routerGateway: RouterGateway
  ) {
    makeObservable(this, {
      currentRoute: observable,
    });
  }

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
