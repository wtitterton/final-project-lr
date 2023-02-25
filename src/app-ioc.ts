import { BaseIOC } from "./base-ioc";
import { RouterGateway } from "./routing";
import { Types } from "./core";
import { HttpGateway } from "./core/http-gateway";
export const container = new BaseIOC().buildBaseTemplate();

container
  .bind<HttpGateway>(Types.IDataGateway)
  .to(HttpGateway)
  .inSingletonScope();
container
  .bind<RouterGateway>(Types.IRouterGateway)
  .to(RouterGateway)
  .inSingletonScope();
