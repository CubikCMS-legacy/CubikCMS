import { existsSync } from "fs";
import { join } from "path";
import { NotFoundError } from "./errors/NotFoundError";

export class Configuration {
    private _module: any;

    constructor(file: string) {
        if (existsSync(join(__dirname, "/../../", file))) {
            this._module = require(join("../../", file));
        } else {
            throw new NotFoundError(`Configuration file "${file}" was not found.`);
        }
    }

    // TODO: Add an real validation.
    public isValidConfiguration() {
        return true;
    }

    public get address(): string {
        return this._module.address;
    }

    public get port(): number {
        return this._module.port;
    }
}
