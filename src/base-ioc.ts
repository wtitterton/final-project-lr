import { Container } from 'inversify'
import { MessagesRepository } from './core'
import { RouterRepository } from './routing'
import { NavigationRepository } from './navigation'
import { UserModel } from './authentication';
//import { UserModel } from './authentication'

export class BaseIOC {
  container;

  constructor() {
    this.container = new Container({
      autoBindInjectable: true,
      defaultScope: 'Transient'
    })
  }

  buildBaseTemplate = () => {
  
    this.container.bind<MessagesRepository>(MessagesRepository).to(MessagesRepository).inSingletonScope()
    this.container.bind<RouterRepository>(RouterRepository).to(RouterRepository).inSingletonScope()
    this.container.bind<NavigationRepository>(NavigationRepository).to(NavigationRepository).inSingletonScope()
    this.container.bind<UserModel>(UserModel).to(UserModel).inSingletonScope()
    return this.container
  }
}