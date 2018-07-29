import { Application } from "./Application";
import { Configuration } from "./Configuration";
import { ConfigurationError } from "./errors/ConfigurationError";
import { NotYetInitializedError } from "./errors/NotYetInitializedError";
import { Initializer } from "./Initializer";
import { Logger } from "./Logger";
import { Service } from "./service_management/Service";
import { ServiceLoader } from "./service_management/ServiceLoader";

export class CubikCMS {

    public static executeInitialization(initializer: Initializer) {
        this._application = initializer.app;
        this._logger = new Logger();
    }

    public static get application() {
        if (this._application === undefined) {
            throw new NotYetInitializedError("Application is undefined.");
        }

        return this._application;
    }

    public static get configuration() {
        if (this._configuration === undefined) {
            throw new NotYetInitializedError("Configuration is undefined.");
        }

        return this._configuration;
    }

    public static get environment() {
        const env = process.env.NODE_ENV || "dev";
        switch (env.toLowerCase()) {

            case "prod":
            case "production":
                return "prod";

            default:
                return "dev";
        }
    }

    public static get logger() {
        if (this._logger === undefined) {
            throw new NotYetInitializedError("Logger is undefined.");
        }

        return this._logger;
    }

    public static getService<T extends Service>(name: string) {
        return ServiceLoader.registry.get<T>(name);
    }

    public static loadConfiguration(config: Configuration) {
        if (!config.isValidConfiguration()) {
            throw new ConfigurationError("Invalid configuration.");
        }
        this._configuration = config;
    }

    private static _application?: Application;
    private static _configuration?: Configuration;
    private static _logger: Logger;
}
