import { EventEmitter } from "events";
import { existsSync } from "fs";
import { getNodeEnv } from "../helpers/envHelpers";
import { Config } from "../schemes/Config";
import { Application } from "./Application";

export class Initializer extends EventEmitter {
    public app: Application;
    public config?: Config;
    public errorHandler?: (err: any) => any;

    constructor() {
        super();

        if (getNodeEnv() === "dev") {
            console.warn("WARNING: You're running CubikCMS in developement mode.");
            console.warn("This mode may not be suitable for production purposes.");
            console.log();
        }
        this.app = new Application();
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
        if (!this.app.initialized) {
            this.app.initialize(this);
        }

        this.app.loadServices(services);

        return this;
    }

}
