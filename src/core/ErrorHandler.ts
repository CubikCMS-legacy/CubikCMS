import { CubikCMS } from "./CubikCMS";

export class ErrorHandler {

    public static catch(element: () => any, scopeName?: string) {
        try {
            return element();
        } catch (err) {
            this._handle(err, scopeName);
        }
    }

    public static async catchAsync<T>(element: Promise<T> | (() => Promise<T>), scopeName?: string) {
        try {
            if (element instanceof Function) {
                return await element();
            }
            return await element;
        } catch (err) {
            this._handle(err, scopeName);
        }
    }

    private static _handle(error: Error | string, scopeName?: string) {
        let s: string;

        if (error instanceof Error) {
            s = error.stack || error.message;
        } else {
            s = error.toString();
        }

        if (typeof scopeName === "undefined") {
            CubikCMS.logger.error(s);
        } else {
            CubikCMS.logger.error("Error in " + scopeName + ": ", s);
        }
    }
}
