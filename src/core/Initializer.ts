import { EventEmitter } from "events";
import { existsSync } from "fs";
import { getNodeEnv } from "../helpers/envHelpers";
import { printBlank, printWarn } from "../helpers/printHelpers";
import { Config } from "../schemes/Config";
import { Application } from "./Application";

export class Initializer extends EventEmitter {
    public app: Application;
    public config?: Config;
    public errorHandler?: (err: any) => any;

    constructor() {
        super();

        if (getNodeEnv() === "dev") {
            printWarn("WARNING: You're running CubikCMS in developement mode.");
            printWarn("This mode may not be suitable for production purposes.");
            printBlank();
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

    public initializeApp() {
        if (!this.app.initialized) {
            this.app.initialize(this);
        }
    }

    public async runServices(services: string[]) {
        await this.app.loadServices(services);

        return this;
    }

    public async registerExtensions() {
        await this.app.registerExtensions();

        return this;
    }

}
