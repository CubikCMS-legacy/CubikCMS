import { Service } from "./Service";

export class ServiceRegisty {
    private services: { [name: string]: Service } = {};

    public add(name: string, service: Service) {
        if (typeof this.services[name] !== "undefined") {
            throw new Error("Service already exists.");
        }

        this.services[name] = service;
    }

    public remove(name: string) {
        delete this.services[name];
    }

    public get<T extends Service>(name: string) {
        const service = this.services[name];

        if (typeof service === "undefined") {
            return null;
        }

        return service as T;
    }
}
