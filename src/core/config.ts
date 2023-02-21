import { injectable } from 'inversify'

@injectable()
export class Config {
  constructor(public apiUrl: string) {
    this.apiUrl = 'https://api.logicroom.co/secure-api/wftitterton@gmail.com'
  }
}