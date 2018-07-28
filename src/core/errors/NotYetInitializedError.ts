export class NotYetInitializedError extends Error {

    constructor(message: string) {
        super(message);

        this.name = "NotYetInitializedError";
        Object.setPrototypeOf(this, NotYetInitializedError.prototype);
    }

}
