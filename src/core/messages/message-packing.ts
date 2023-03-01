export interface IMessagePacking {
  success: boolean;
  serverMessage: string;
  result: any;
}

export class MessagePacking {
  static unpackServerDtoToPm = (dto: any): IMessagePacking => {
    return {
      success: dto.success,
      serverMessage: dto.result.message,
      result: dto.result,
    };
  };
}
