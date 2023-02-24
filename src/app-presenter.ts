import { Router } from './routing'
import { makeObservable, computed } from 'mobx'
import { MessagesRepository, Types } from './core'
import { inject, injectable } from 'inversify'


@injectable()
export class AppPresenter {
  constructor( 
    @inject(MessagesRepository) private messagesRepository: MessagesRepository,
    @inject(Types.IRouter) private router: Router
  ) {
    makeObservable(this, {
      currentRoute: computed
    })
  }

   get currentRoute() {
    return this.router.currentRoute
  }

  load = (onRouteChange: any) => {
    const onRouteChangeWrapper = () => {
      this.messagesRepository.appMessages = []
      onRouteChange()
    }
    this.router.registerRoutes(onRouteChangeWrapper)
  }
}
