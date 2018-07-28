export class ConfigurationError extends Error {

    constructor(message: string) {
        super(message);

        this.name = "ConfigurationError";
        Object.setPrototypeOf(this, ConfigurationError.prototype);
    }

}
