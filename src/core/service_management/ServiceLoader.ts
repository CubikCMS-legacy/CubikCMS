import { getServiceIndex } from "../../helpers/serviceHelpers";
import { ServiceRegisty } from "./ServiceRegistry";

export class ServiceLoader {

    public async load(name: string) {
        const serviceIndex = getServiceIndex(name);

        if (serviceIndex == null) {
            throw new Error(`no service found with name '${name}'.`);
        }

        const service = serviceIndex.service;

        ServiceRegisty.add(name, service);
        await service.start();
    }

    public async unload(name: string) {
        const service = ServiceRegisty.get(name);
        console.log(service);
        if (service !== null) {
            await service.stop();
            ServiceRegisty.remove(name);
        }

    }

    public async reload(name: string) {
        return this.unload(name).then(
            () => this.load(name)
        );
    }

}
