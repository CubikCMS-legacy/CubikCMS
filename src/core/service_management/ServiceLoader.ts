import { getServiceIndex } from "../../helpers/serviceHelpers";
import { CubikCMS } from "../CubikCMS";
import { ErrorHandler } from "../ErrorHandler";
import { NotFoundError } from "../errors/NotFoundError";
import { ServiceRegisty } from "./ServiceRegistry";

export class ServiceLoader {
    public static get registry() {
        return this._registry;
    }

    public static async load(name: string | string[]) {
        // If name is string[], load every element
        if (name instanceof Array) {
            for (const element of name) {
                await this.load(element);
            }
            return;
        }

        const serviceIndex = getServiceIndex(name);

        if (serviceIndex == null) {
            throw new NotFoundError(`No service found with name '${name}'.`);
        }

        const service = serviceIndex.service;
        service.app = CubikCMS.application;

        await ErrorHandler.catchAsync(async () => {

            CubikCMS.logger.debug(`Starting service '${name}'.`);
            await service.start();
            this.registry.add(name, service);
            CubikCMS.logger.debug(`Started service '${name}'.`);

        }, `${name} service`);
    }

    public static async unload(name: string | string[]) {
        // If name is string[], unload every element
        if (name instanceof Array) {
            for (const element of name) {
                await this.unload(element);
            }
            return;
        }

        const service = this.registry.get(name);

        if (service !== null) {
            service.app = CubikCMS.application;

            await ErrorHandler.catchAsync(async () => {

                CubikCMS.logger.debug(`Stopping service '${name}'.`);
                await service.stop();
                this.registry.remove(name);
                CubikCMS.logger.debug(`Stopped service '${name}'.`);

            }, `${name} service`);
        }

    }

    public static async reload(name: string | string[]) {
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

    private static _registry: ServiceRegisty = new ServiceRegisty();
}
