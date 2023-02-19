import { Container } from 'inversify'
import { MessagesRepository } from './core'
import { Router, RouterRepository } from './routing'
import { NavigationRepository } from './navigation'
import { UserModel } from './authentication'

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
    console.log('container');
    return this.container
  }
}