import { injectable, inject } from 'inversify'
import { Config } from './'
import { UserModel } from '../authentication'

@injectable()
export class HttpGateway {

  constructor(@inject(UserModel) private userModel: UserModel) {}

  get = async<R> (path: string): Promise<R> => {
    const response = await fetch(`https://api.logicroom.co/secure-api/wftitterton@gmail.com${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.userModel.token
      }
    })
    const dto = response.json()
    return dto
  }

  post = async<D, R> (path: string, requestDto: D): Promise<R> => {
    const response = await fetch(`https://api.logicroom.co/secure-api/wftitterton@gmail.com${path}`, {
      method: 'POST',
      body: JSON.stringify(requestDto),
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.userModel.token
      }
    })
    const dto = response.json()
    return dto
  }

  delete = async<R> (path: string): Promise<R> => {
    const response = await fetch(`https://api.logicroom.co/secure-api/wftitterton@gmail.com${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.userModel.token
      }
    })
    const dto = response.json()
    return dto
  }
}
