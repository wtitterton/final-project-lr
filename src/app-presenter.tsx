import 'reflect-metadata'
import { Router } from './routing'

import { makeObservable, computed } from 'mobx'
import { MessagesRepository } from './core'
import { inject, injectable } from 'inversify'


@injectable()
export class AppPresenter {
  get currentRoute() {
    return this.router.currentRoute
  }

  constructor( 
    @inject(MessagesRepository) private messagesRepository: MessagesRepository,
    @inject(Router) private router: Router
  ) {
    makeObservable(this, {
      currentRoute: computed
    })
  }

  load = (onRouteChange: any) => {
    const onRouteChangeWrapper = () => {
      this.messagesRepository.appMessages = []
      onRouteChange()
    }
    this.router.registerRoutes(onRouteChangeWrapper)
  }
}
