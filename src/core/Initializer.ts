import { EventEmitter } from "events";
import { existsSync } from "fs";
import { getNodeEnv } from "../helpers/envHelpers";
import { ServiceLoader } from "./service_management/ServiceLoader";

export class Initializer extends EventEmitter {

    public serviceLoader = new ServiceLoader();
    public errorHandler?: (err: any) => any;
    public config: any;

    constructor() {
        super();
        if (getNodeEnv() === "dev") {
            console.warn("WARNING: You're running CubikCMS in developement mode.");
            console.warn("This mode may not be suitable for production purposes.");
            console.log();
        }
    }

    public loadConfig() {
        const nodeEnv = getNodeEnv();

        if (existsSync(`${__dirname}/../../config.${nodeEnv}.json`)) {
            this.config = require(`../../config.${nodeEnv}.json`);
        } else {
            throw new Error(`Config file "config.${nodeEnv}.json" was not found.`);
        }

        return this;
    }

    public runServices(services: string[]) {
        this._handlePromiseErrors(
            this.serviceLoader.load(services)
        );

        return this;
    }

    public handleErrors() {
        // TODO: Do an error handler
    }

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
