import { existsSync } from "fs";
import { ServiceIndex } from "../core/service_management/Service";

export function getServiceIndex(name: string) {
    if (/[^A-Za-z_0-9]+/.test(name)) { // if name contains invalid chars
        throw new Error("invalid service name format: " + name);
    }

    if (!existsSync(__dirname + "/../services/" + name)) {
        return null;
    }

    const indexModule = require("../services/" + name);

    if (typeof indexModule.index === "undefined") {
        return null;
    }

    return indexModule.index as ServiceIndex;
}
