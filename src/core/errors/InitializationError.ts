export class InitializationError extends Error {

    constructor(message: string) {
        super(message);

        this.name = "InitializationError";
        Object.setPrototypeOf(this, InitializationError.prototype);
    }

}
