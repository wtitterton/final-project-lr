export interface IMessagePacking {
  success: boolean;
  serverMessage: string
}

export class MessagePacking {
  static unpackServerDtoToPm = (dto: any): IMessagePacking => {
    return { success: dto.success, serverMessage: dto.result.message }
  }
}
