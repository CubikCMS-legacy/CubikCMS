import { EventEmitter } from "events";

export abstract class Service extends EventEmitter {

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
