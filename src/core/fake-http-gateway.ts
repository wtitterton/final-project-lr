
import { injectable } from 'inversify'

@injectable()
export class FakeHttpGateway {
  get = async (path: string) => {}

  post = async (path: string, requestDto: any) => {}

  delete = async (path: string) => {}
}
