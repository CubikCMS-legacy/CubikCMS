import { Config } from "../schemes/Config";
import { Initializer } from "./Initializer";
import { ServiceLoader } from "./service_management/ServiceLoader";

export class Application {
    public errorHandler?: (err: any) => any;
    public initialized = false;
    public config!: Config;
    public serviceLoader: ServiceLoader;

    constructor() {
        this.serviceLoader = new ServiceLoader(this);
    }

    public initialize(initializer: Initializer) {
        if (typeof initializer.config === "undefined") {
            throw new Error("No configuration provided.");
        }

        this.config = initializer.config;
        this.errorHandler = initializer.errorHandler;

        this.initialized = true;
    }

    /**
     * Loads services
     * @param services Name of services to load
     * @returns {Promise<any>}
     */
    public async loadServices(services: string[]) {
        return this._handlePromiseErrors(
            this.serviceLoader.load(services)
        );
    }

    /**
     * Send promise errors of element to the error handler
     * @param {Promise<T>} element Promise to handle
     * @returns {Promise<T>} Handled promise
     */
    private _handlePromiseErrors<T>(element: Promise<T>) {
        return element
            .catch((err) => {
                if (typeof this.errorHandler === "undefined") {
                    throw err;
                }

                return this.errorHandler(err);
            });
    }

}
