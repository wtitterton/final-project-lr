import { BaseIOC } from "./base-ioc";
import { Router, RouterGateway } from "./routing";
export const container = new BaseIOC().buildBaseTemplate();
container.bind(RouterGateway).to(RouterGateway).inSingletonScope()