import { injectable, inject } from "inversify";
import { makeObservable, action, toJS, observable } from "mobx";
import { Config, HttpGateway, MessagePacking, Types } from "../core";
import { UserModel } from "../authentication";
@injectable()
export class BooksRepository {
  public messagePm: string = "UNSET";

  constructor(
    @inject(Types.IDataGateway) private httpGateway: HttpGateway,
    @inject(UserModel) private userModel: UserModel
  ) {
    makeObservable(this, { messagePm: observable });
  }

  load = () => {
    setTimeout(() => {
      this.messagePm = "LOADED";
    }, 2000);
  };

  reset = () => {
    this.messagePm = "RESET";
  };
}
