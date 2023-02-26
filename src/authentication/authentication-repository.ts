import { injectable, inject } from "inversify";
import { makeObservable, action } from "mobx";
import { IMessagePacking, MessagePacking, Types } from "../core";
import { UserModel } from "./";
import { HttpGateway } from "../core/http-gateway";

export interface LoginRegisterDto {
  email: string;
  password: string;
}

interface LoginRegisterResponse {
  success: boolean;
  result: {
    email: string;
    token: string;
    message: string;
  };
}

@injectable()
export class AuthenticationRepository {
  constructor(
    @inject(Types.IDataGateway) private dataGateway: HttpGateway,
    @inject(UserModel) private userModel: UserModel
  ) {
    makeObservable(this, {
      login: action,
    });
  }

  login = async (
    loginRegisterDto: LoginRegisterDto
  ): Promise<IMessagePacking> => {
    const { email } = loginRegisterDto;
    const loginDto = await this.dataGateway.post<
      LoginRegisterDto,
      LoginRegisterResponse
    >("/login", loginRegisterDto);

    if (loginDto.success) {
      this.userModel.email = email;
      this.userModel.token = loginDto.result.token;
    }

    return MessagePacking.unpackServerDtoToPm(loginDto);
  };

  register = async (
    loginRegisterDto: LoginRegisterDto
  ): Promise<IMessagePacking> => {
    const registerDto = await this.dataGateway.post<
      LoginRegisterDto,
      LoginRegisterResponse
    >("/register", loginRegisterDto);

    if (registerDto.success) {
      const { email, token } = registerDto.result;
      this.userModel.email = email;
      this.userModel.token = token;
    }

    return MessagePacking.unpackServerDtoToPm(registerDto);
  };

  logOut = () => {
    this.userModel.email = null;
    this.userModel.token = null;
  };
}
