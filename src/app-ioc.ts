import { BaseIOC } from "./base-ioc";
import { RouterGateway } from "./routing";
export const container = new BaseIOC().buildBaseTemplate();
container.bind<RouterGateway>(RouterGateway).to(RouterGateway).inSingletonScope()
