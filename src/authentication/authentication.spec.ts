import { Types } from "../core";
import { Router } from "../routing";
import {
  AppTestHarness,
  GetFailedRegistrationStub,
  GetFailedUserLoginStub,
  GetSuccessfulRegistrationStub,
  GetSuccessfulUserLoginStub,
} from "../test-tools";
import { LoginRegisterPresenter } from "./login-registration-presenter";
import { UserModel } from "./user-model";

let appTestHarness: AppTestHarness;
let router: Router;
let onRouteChange = () => {};
let userModel: UserModel;

describe("Register", () => {
  beforeEach(() => {
    appTestHarness = new AppTestHarness();
    appTestHarness.bootStrap(onRouteChange);
    router = appTestHarness.container.get(Types.IRouter);
    userModel = appTestHarness.container.get(UserModel);
  });

  it("should show successful user message on successful register", async () => {
    const validUserCredentials = {
      email: "user-email@email.com",
      password: "user-password",
    };

    const loginRegisterPresenter: LoginRegisterPresenter =
      await appTestHarness.setupRegistration(
        GetSuccessfulRegistrationStub,
        validUserCredentials
      );
    expect(loginRegisterPresenter.messages).toEqual(["User registered"]);
    expect(userModel.email).toBe("user-email@email.com");
    expect(userModel.token).toBe("user-token");
  });

  it("should show failed server message on failed register", async () => {
    const inValidUserCredentials = {
      email: "invalid-email",
      password: "12",
    };
    const loginRegisterPresenter: LoginRegisterPresenter =
      await appTestHarness.setupRegistration(
        GetFailedRegistrationStub,
        inValidUserCredentials
      );
    expect(loginRegisterPresenter.messages).toEqual([
      "Failed: credentials not valid must be (email and >3 chars on password).",
    ]);
  });
});

describe("Login", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    appTestHarness = new AppTestHarness();
    appTestHarness.bootStrap(onRouteChange);
    router = appTestHarness.container.get(Types.IRouter);
    userModel = appTestHarness.container.get(UserModel);
  });

  it("should start at null", async () => {
    expect(router.currentRoute.routeId).toBe(null);
  });

  it("should go to homeLink on successful login (and populate userModel)", async () => {
    const routerSpy = jest.spyOn(router, "goToId");
    await appTestHarness.setupLogin(GetSuccessfulUserLoginStub);
    expect(routerSpy).toHaveBeenCalledWith("homeLink");
    expect(userModel.email).not.toBeNull();
    expect(userModel.token).not.toBeNull();
  });

  it("should update private route when successful login", async () => {
    await appTestHarness.setupLogin(GetSuccessfulUserLoginStub);
    expect(router.currentRoute.routeId).toBe("homeLink");
  });

  it("should show failed user message on failed login", async () => {
    const loginRegistrationPresenter = await appTestHarness.setupLogin(
      GetFailedUserLoginStub
    );
    expect(loginRegistrationPresenter.messages).toEqual([
      "Failed: no user record.",
    ]);
    expect(userModel.email).toBe(null);
    expect(userModel.token).toBe(null);
  });

  it("should not update route when failed login", async () => {
    expect(router.currentRoute.routeId).toBe(null);
    await appTestHarness.setupLogin(GetFailedUserLoginStub);
    expect(router.currentRoute.routeId).toBe(null);
  });

  it("should clear messages on option change change", async () => {
    // fail login to ensure we populate a message
    const loginRegistrationPresenter = await appTestHarness.setupLogin(
      GetFailedRegistrationStub
    );
    expect(loginRegistrationPresenter.messages).toEqual([
      "Failed: credentials not valid must be (email and >3 chars on password).",
    ]);

    // pivot and change route. this should clear messages
    router.goToId("homeLink");
    expect(loginRegistrationPresenter.messages).toEqual([]);
  });

  it("should logout", async () => {
    //login
    const loginRegistrationPresenter = await appTestHarness.setupLogin(
      GetSuccessfulUserLoginStub
    );
    expect(userModel.token).not.toBeNull();

    // log the user out
    loginRegistrationPresenter.logout();

    expect(userModel.email).toBeNull();
    expect(userModel.token).toBeNull();
    expect(router.currentRoute.routeId).toBe("loginLink");
  });
});
