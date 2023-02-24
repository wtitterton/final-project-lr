import { FakeHttpGateway, Types} from '../core'
import { BaseIOC } from '../base-ioc'
import { FakeRouterGateway, Router, RouterRepository } from '../routing'
import { LoginRegisterPresenter } from '../authentication'
import { AppPresenter } from '../app-presenter'
import { Container } from 'inversify'
import { SingleBooksResultStub } from './single-books-result-stub'



export class AppTestHarness {
  public container: Container;
  private httpGateway: FakeHttpGateway;
  private appPresenter: AppPresenter;
  private router: Router;
  private routerRepository: RouterRepository;
  private routerGateway: FakeRouterGateway;
  private loginRegisterPresenter: LoginRegisterPresenter;
 
  constructor() {
    this.container =  new BaseIOC().buildBaseTemplate();
    this.container.bind(Types.IDataGateway).to(FakeHttpGateway).inSingletonScope();
    this.container.bind(Types.IRouterGateway).to(FakeRouterGateway).inSingletonScope();
    this.httpGateway = this.container.get(FakeHttpGateway);
    this.appPresenter = this.container.get(AppPresenter);
    this.router = this.container.get(Router);
    this.routerRepository = this.container.get(RouterRepository);
    this.routerGateway = this.container.get(Types.IRouterGateway);
    this.loginRegisterPresenter = this.container.get(LoginRegisterPresenter);
    //let self = this

    this.routerGateway.goToId = jest.fn().mockImplementation((routeId) => {
      // pivot
      this.router.updateCurrentRoute(routeId)
    })
  }

  // 2. bootstrap the app
  bootStrap(onRouteChange: () => void) {
    this.appPresenter.load(onRouteChange)
  }

  // 3. login or register to the app
  setupLogin = async (loginStub: () => any, type: any) => {
    this.httpGateway = this.container.get(Types.IDataGateway)
    this.httpGateway.get = jest.fn().mockImplementation((path) => {
      return Promise.resolve(SingleBooksResultStub)
    })
    this.httpGateway.post = jest.fn().mockImplementation((path) => {
      return Promise.resolve(loginStub())
    })

    this.loginRegisterPresenter = this.container.get(LoginRegisterPresenter)
    this.loginRegisterPresenter.email = 'a@b.com'
    this.loginRegisterPresenter.password = '123'
    await this.loginRegisterPresenter.login(this.loginRegisterPresenter.email,  this.loginRegisterPresenter.password)
    return this.loginRegisterPresenter
  }
}