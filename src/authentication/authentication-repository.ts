import { injectable, inject } from 'inversify'
import { makeObservable, action } from 'mobx'
import { IMessagePacking, MessagePacking, Types } from '../core'

import { Router } from '../routing'
import { UserModel } from './';
import { HttpGateway } from '../core/http-gateway'

interface LoginRegisterDto {
    email: string;
    password: string;
}

interface LoginRegisterResponse {
  success: boolean;
  result: {
   email: string;
   token: string;
   message: string;
  }
}

@injectable()
export class AuthenticationRepository {
  constructor(
    @inject(Types.IDataGateway) private dataGateway: HttpGateway,
    @inject(UserModel) private userModel: UserModel
  ) {
    makeObservable(this, {
      login: action
    })
  }

  login = async (email: string, password: string): Promise<IMessagePacking> => {
    const loginDto = await this.dataGateway.post<LoginRegisterDto, LoginRegisterResponse>('/login', {
      email: email,
      password: password
    })

    if (loginDto.success) {
      this.userModel.email = email
      this.userModel.token = loginDto.result.token
    }

    return MessagePacking.unpackServerDtoToPm(loginDto)
  }

  register = async (email: string, password: string): Promise<IMessagePacking> => {
    const registerDto = await this.dataGateway.post<LoginRegisterDto, LoginRegisterResponse>('/register', {
      email: email,
      password: password
    })

    if(registerDto.success) {
      const {email, token} = registerDto.result
      this.userModel.email = email;
      this.userModel.token = token;
    }

    return MessagePacking.unpackServerDtoToPm(registerDto)
  }

  logOut = async () => {
    this.userModel.email = ''
    this.userModel.token = ''
  }
}
