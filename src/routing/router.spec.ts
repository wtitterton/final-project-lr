import { Types } from "../core";
import { AppTestHarness, GetSuccessfulUserLoginStub } from "../test-tools";
import { FakeRouterGateway, Router, RouterRepository } from "../routing";
import { UserModel } from "../authentication";

let appTestHarness: AppTestHarness;
let router: Router;
let routerRepository: RouterRepository;
let routerGateway: FakeRouterGateway;
let onRouteChange = () => {};
let userModel: UserModel;

describe("routing", () => {
  beforeEach(() => {
    appTestHarness = new AppTestHarness();
    appTestHarness.bootStrap(onRouteChange);
    router = appTestHarness.container.get(Types.IRouter);
    routerRepository = appTestHarness.container.get(RouterRepository);
    routerGateway = appTestHarness.container.get(Types.IRouterGateway);
    userModel = appTestHarness.container.get(UserModel);
  });

  it("should be an null route", () => {
    expect(routerRepository.currentRoute.routeId).toBe(null);
  });

  it("should block wildcard *(default) routes when not logged in", () => {
    router.goToId("default");
    expect(routerGateway.goToId).toHaveBeenLastCalledWith("loginLink");
  });

  it("should block secure routes when not logged in", () => {
    router.goToId("homeLink");
    expect(routerGateway.goToId).toHaveBeenLastCalledWith("loginLink");
  });

  it("should allow access to secure routes when logged in", async () => {
    expect(userModel.email).toBe(null);
    expect(userModel.token).toBe(null);

    router.goToId("homeLink");
    expect(routerGateway.goToId).toHaveBeenLastCalledWith("loginLink");

    // pivot ensure user is logged in
    const loginPresenter = await appTestHarness.setupLogin(
      GetSuccessfulUserLoginStub,
      ""
    );

    router.goToId("homeLink");
    expect(routerGateway.goToId).toHaveBeenLastCalledWith("homeLink");
  });

  it("should allow public route when not logged in", () => {
    router.goToId("authorPolicyLink");
    expect(routerGateway.goToId).toHaveBeenLastCalledWith("authorPolicyLink");
  });
});
