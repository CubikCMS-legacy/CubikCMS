import { getServiceIndex } from "../../helpers/serviceHelpers";
import { ServiceRegisty } from "./ServiceRegistry";

export class ServiceLoader {

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

        ServiceRegisty.add(name, service);
        await service.start();
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
            await service.stop();
            ServiceRegisty.remove(name);
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
