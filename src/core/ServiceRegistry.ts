import { Service } from "./Service";

export class ServiceRegisty {
    public static add(name: string, service: Service) {
        if (typeof ServiceRegisty.services[name] !== "undefined") {
            throw new Error("Service already exists.");
        }

        ServiceRegisty.services[name] = service;
    }

    public static remove(name: string) {
        delete ServiceRegisty.services[name];
    }

    public static get<T extends Service>(name: string) {
        const service = ServiceRegisty.services[name];

        if (typeof service !== "undefined") {
            return service as T;
        }
        return null;
    }

    private static services: { [name: string]: Service };
}
