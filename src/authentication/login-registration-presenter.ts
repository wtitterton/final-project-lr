import { injectable, inject } from "inversify";
import { Router } from "../routing";
import { action, makeObservable, observable, runInAction } from "mobx";
import { MessagesRepository } from "../core/messages/message-repository";
import { AuthenticationRepository } from "./authentication-repository";
import { MessagesPresenter, Types } from "../core";

export type Option = "login" | "register";

@injectable()
export class LoginRegisterPresenter extends MessagesPresenter {
  email: string | null = null;
  password: string | null = null;
  option: Option = "login";

  constructor(
    @inject(AuthenticationRepository)
    private authenticationRepository: AuthenticationRepository,
    @inject(MessagesRepository) private _messagesRepository: MessagesRepository,
    @inject(Types.IRouter) private router: Router
  ) {
    super(_messagesRepository);

    makeObservable(this, {
      email: observable,
      password: observable,
      option: observable,
      login: action,
      register: action,
      resetValues: action,
    });

    this.init();
  }

  public login = async (email: string, password: string) => {
    this.init();
    const loginPm = await this.authenticationRepository.login(email, password);
    this.unpackRepositoryPmToVm(loginPm, "User logged in");

    if (loginPm.success) {
      this.resetValues();
      this.router.goToId("homeLink");
    }
  };

  register = async (email: string, password: string) => {
    this.init();
    const registerPm = await this.authenticationRepository.register(
      email,
      password
    );
    this.unpackRepositoryPmToVm(registerPm, "User registered");
  };

  logout = async () => {
    this.authenticationRepository.logOut();
    this.router.goToId("loginLink");
  };

  resetValues() {
    this.email = "";
    this.password = "";
    this.option = "login";
  }

  setOption(option: Option) {
    runInAction(() => {
      this.option = option;
    });
  }
}
