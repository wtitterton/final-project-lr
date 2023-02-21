import { injectable, inject, multiInject } from 'inversify'
import { Router } from '../routing'
import { action, makeObservable, observable, runInAction } from 'mobx'
import { MessagesRepository } from '../core/messages/message-repository'
import { AuthenticationRepository } from './authentication-repository'
import { MessagesPresenter } from '../core'

export type Option = "login" | "register"

@injectable()
export class LoginRegisterPresenter extends MessagesPresenter {

  email: string | null = null
  password: string | null = null
  option: Option = "login"

  constructor(
    @inject(AuthenticationRepository) private authenticationRepository: AuthenticationRepository,
    @inject(MessagesRepository) private _messagesRepository: MessagesRepository,
    @inject(Router) private router: Router
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
     const loginPm = await this.authenticationRepository.login(email, password);
     this.unpackRepositoryPmToVm(loginPm, 'User logged in');
     this.resetValues();
     this.router.goToId('homeLink');
  }

   register = async (email: string, password: string) => {
     const registerPm = await this.authenticationRepository.register(email, password);
     console.log(registerPm);
     this.unpackRepositoryPmToVm(registerPm, 'User registered');
  }

   resetValues() {
    this.email = "";
    this.password = "";
    this.option = 'login'
  }

  setOption(option: Option) {
    runInAction(() => {
          this.option = option;
        })
  }
}
