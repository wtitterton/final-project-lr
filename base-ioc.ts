import { Container } from 'inversify'
import { MessagesRepository } from './src/core'
import { RouterRepository } from './src/routing'
import { NavigationRepository } from './src/navigation/navigation-repository'
import { UserModel } from './src/authentication'

export class BaseIOC {
  container;

  constructor() {
    this.container = new Container({
      autoBindInjectable: true,
      defaultScope: 'Transient'
    })
  }

  buildBaseTemplate = () => {
    this.container.bind(MessagesRepository).to(MessagesRepository).inSingletonScope()
    this.container.bind(RouterRepository).to(RouterRepository).inSingletonScope()
    this.container.bind(NavigationRepository).to(NavigationRepository).inSingletonScope()
    this.container.bind(UserModel).to(UserModel).inSingletonScope()
    
    return this.container
  }
}