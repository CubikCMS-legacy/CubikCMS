import { ServiceIndex } from "../../core/service_management/Service";
import { WebServer } from "./WebServer";

export const index: ServiceIndex = {
    service: new WebServer(),
};
