import { NavigationPresenter } from "./";
import { Router, RouterGateway } from "../routing";
import { Types } from "../core";
import { AppTestHarness, GetSuccessfulRegistrationStub } from "../test-tools";
import { BaseIOC } from "../base-ioc";
import { Container } from "inversify";

let appTestHarness: AppTestHarness;
let navigationPresenter: NavigationPresenter;
let router = null;
let routerGateway: RouterGateway;

describe("navigation", () => {
  beforeEach(async () => {
    appTestHarness = new AppTestHarness();
    appTestHarness.bootStrap(() => {});
    navigationPresenter = appTestHarness.container.get(NavigationPresenter);
    router = appTestHarness.container.get(Router);
    routerGateway = appTestHarness.container.get(Types.IRouterGateway);
  });

  describe("before login", () => {
    it("anchor default state", () => {
      expect(navigationPresenter).toBeInstanceOf(NavigationPresenter);
      expect(navigationPresenter.viewModel.currentSelectedVisibleName).toBe("");
      expect(navigationPresenter.viewModel.showBack).toBe(false);
      expect(navigationPresenter.viewModel.menuItems).toEqual([]);
    });
  });
});
