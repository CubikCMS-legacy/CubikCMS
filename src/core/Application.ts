import { lstatSync, readdirSync } from "fs";
import { Config } from "../schemes/Config";
import { ExtensionLoader } from "./extension_management/ExtensionLoader";
import { Initializer } from "./Initializer";
import { ServiceLoader } from "./service_management/ServiceLoader";

export class Application {
    public errorHandler?: (err: any) => any;
    public initialized = false;
    public config!: Config;
    public extensionLoader: ExtensionLoader;
    public serviceLoader: ServiceLoader;

    constructor() {
        this.extensionLoader = new ExtensionLoader(this);
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

    public async registerExtensions() {
        const files = readdirSync("./../../addons/extensions");
        for (const file of files) {
            if (lstatSync(file).isDirectory()) {
                this.extensionLoader.load(file);
            }
        }
    }

    public async loadServices(services: string[]) {
        return this._handlePromiseErrors(
            this.serviceLoader.load(services)
        );
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
