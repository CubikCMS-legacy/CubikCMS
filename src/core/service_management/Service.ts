import { EventEmitter } from "events";
import { Application } from "../Application";

export abstract class Service extends EventEmitter {

    public app?: Application;

    constructor() {
        super();
    }

    public async restart() {
        return this.stop().then(
            () => this.start()
        );
    }

    public abstract async start(): Promise<void>;
    public abstract async stop(): Promise<void>;

}

export interface ServiceIndex {
    service: Service;
}
