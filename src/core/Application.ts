import { Initializer } from "./Initializer";
import { ServiceLoader } from "./service_management/ServiceLoader";

export class Application {
    public initialized = false;

    constructor() {
        //
    }

    public initialize(initializer: Initializer) {
        this.initialized = true;
    }

    /**
     * Loads services
     * @param services Name of services to load
     * @returns {Promise<any>}
     */
    public async loadServices(services: string[]): Promise<any> {
        return ServiceLoader.load(services);
    }

}
