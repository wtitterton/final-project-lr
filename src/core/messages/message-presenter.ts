import { injectable, inject } from "inversify";
import { makeObservable, observable, action, computed } from "mobx";
import { MessagesRepository } from "./message-repository";
import { IMessagePacking } from "./message-packing";

@injectable()
export class MessagesPresenter {
  public showValidationWarning = false;

  get messages() {
    return this.messagesRepository.appMessages;
  }

  constructor(
    @inject(MessagesRepository) private messagesRepository: MessagesRepository
  ) {
    makeObservable(this, {
      showValidationWarning: observable,
      messages: computed,
      unpackRepositoryPmToVm: action,
    });
  }

  init = () => {
    this.showValidationWarning = false;
    this.messagesRepository.reset();
  };

  unpackRepositoryPmToVm = (pm: IMessagePacking, userMessage: string) => {
    this.showValidationWarning = !pm.success;
    this.messagesRepository.appMessages = pm.success
      ? [userMessage]
      : [pm.serverMessage];
  };
}
