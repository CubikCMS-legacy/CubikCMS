import { ServiceIndex } from "../../core/service_management/Service";
import { ExtensionsServer } from "./ExtensionsServer";

export const index: ServiceIndex = {
    service: new ExtensionsServer(),
};
