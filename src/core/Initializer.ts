import { EventEmitter } from "events";
import { ServiceLoader } from "./service_management/ServiceLoader";

export class Initializer extends EventEmitter {

    public serviceLoader = new ServiceLoader();
    public errorHandler?: (err: any) => any;

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
