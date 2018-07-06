import { ServiceIndex } from "../core/service_management/Service";

export function getServiceIndex(name: string) {
    let serviceIndex: ServiceIndex;

    if (/[^A-Za-z_0-9]+/.test(name)) { // if name contains invalid chars
        throw new Error("invalid service name format: " + name);
    }

    try {
        const indexModule = require("../services/" + name);
        if (typeof indexModule.index === "undefined") {
            return null;
        }

        serviceIndex = indexModule.index;
    } catch (err) {
        if (err instanceof Error && err.message.startsWith("Cannot find module")) { // if service is not found
            return null;
        }

        throw err;
    }

    return serviceIndex;
}
