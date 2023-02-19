import { Container } from 'inversify'


export class BaseIOC {
  private container: Container

  constructor() {
    this.container = new Container({
      autoBindInjectable: true,
      defaultScope: 'Transient'
    })
  }

  buildBaseTemplate = () => {
    return this.container
  }
}