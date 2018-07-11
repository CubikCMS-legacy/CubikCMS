import { printLog } from "../../helpers/printHelpers";
import { getServiceIndex } from "../../helpers/serviceHelpers";
import { Application } from "../Application";
import { ServiceRegisty } from "./ServiceRegistry";

export class ServiceLoader {
    public app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public async load(name: string | string[]) {
        // If name is string[], load every element
        if (name instanceof Array) {
            for (const element of name) {
                await this.load(element);
            }
            return;
        }

        const serviceIndex = getServiceIndex(name);

        if (serviceIndex == null) {
            throw new Error(`no service found with name '${name}'.`);
        }

        const service = serviceIndex.service;

        service.app = this.app;
        printLog(`Starting service '${name}'.`);
        ServiceRegisty.add(name, service);
        await service.start();
        printLog(`Started service '${name}'.`);
    }

    public async unload(name: string | string[]) {
        // If name is string[], unload every element
        if (name instanceof Array) {
            for (const element of name) {
                await this.unload(element);
            }
            return;
        }

        const service = ServiceRegisty.get(name);

        if (service !== null) {
            service.app = this.app;
            printLog(`Stopping service '${name}'.`);
            await service.stop();
            ServiceRegisty.remove(name);
            printLog(`Stopped service '${name}'.`);
        }

    }

    public async reload(name: string | string[]) {
        // If name is string[], reload every element
        if (name instanceof Array) {
            for (const element of name) {
                await this.reload(element);
            }
            return;
        }

        return this.unload(name).then(
            () => this.load(name)
        );
    }

}
