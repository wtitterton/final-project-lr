import "reflect-metadata";
import { inject, injectable } from "inversify";
import { makeObservable, computed, action } from "mobx";
import { RouterRepository } from "./router-repository";
import { UserModel } from "../authentication";
import { Types } from "../core";

@injectable()
export class Router {
  constructor(
    @inject(Types.IRouterRepository) private routerRepository: RouterRepository,
    @inject(UserModel) private userModel: UserModel
  ) {
    makeObservable(this, {
      currentRoute: computed,
      updateCurrentRoute: action,
    });
  }

  get currentRoute() {
    return this.routerRepository.currentRoute;
  }

  updateCurrentRoute = async (
    newRouteId: string,
    params?: string,
    query?: string
  ) => {
    let oldRoute = this.routerRepository.findRoute(
      this.currentRoute.routeId ?? ""
    );
    let newRoute = this.routerRepository.findRoute(newRouteId);
    const hasToken = !!this.userModel.token;
    const routeChanged = oldRoute.routeId !== newRoute.routeId;
    const protectedOrUnauthenticatedRoute =
      (newRoute.routeDef.isSecure && hasToken === false) ||
      newRoute.routeDef.path === "*";
    const publicOrAuthenticatedRoute =
      (newRoute.routeDef.isSecure && hasToken === true) ||
      newRoute.routeDef.isSecure === false;

    if (routeChanged) {
      this.routerRepository.onRouteChanged();

      if (protectedOrUnauthenticatedRoute) {
        this.routerRepository.goToId("loginLink");
      } else if (publicOrAuthenticatedRoute) {
        if (oldRoute.onLeave) oldRoute.onLeave();
        if (newRoute.onEnter) newRoute.onEnter();
        this.routerRepository.currentRoute.routeId = newRoute.routeId;
        this.routerRepository.currentRoute.routeDef = newRoute.routeDef;
        this.routerRepository.currentRoute.params = params;
        this.routerRepository.currentRoute.query = query;
      }
    }
  };

  registerRoutes = (onRouteChange: () => void) => {
    this.routerRepository.registerRoutes(
      this.updateCurrentRoute,
      onRouteChange
    );
  };

  goToId = (routeId: string, params?: string, query?: string) => {
    this.routerRepository.goToId(routeId);
  };
}
