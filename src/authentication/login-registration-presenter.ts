import { injectable, inject } from 'inversify'
import { Router } from '../routing'
import { action, makeObservable, observable, runInAction } from 'mobx'
import { MessagesRepository } from '../core/messages/message-repository'

type Option = "login" | "register"

@injectable()
export class LoginRegisterPresenter {

  email: string | null = null
  password: string | null = null
  option: Option = "login"

  constructor(
    @inject(Router) private router: Router
  ) {

    makeObservable(this, {
      email: observable,
      password: observable,
      option: observable,
      login: action,
      register: action,
      resetValues: action,
    });
  }

  public login = async (loginCredentials: any) => {
   //  const loginPm = await this.authenticationRepository.login(loginCredentials);
     //this.unpackRepositoryPmToVm(loginPm, 'User logged in');
     this.resetValues();
     this.router.goToId('homeLink');
  }

   register = async (registerCredentials: any) => {
     //const registerPm = await this.authenticationRepository.register(registerCredentials);
      // this.unpackRepositoryPmToVm(registerPm, 'User registered');
  }

   resetValues() {
    this.email = "";
    this.password = "";
    this.option = 'login'
  }

  setOption(option: Option) {
    runInAction(() => {
          this.option = option
        })
  }
}
