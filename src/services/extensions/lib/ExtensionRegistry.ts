import { IRegistry } from "../../../core/IRegistry";
import { Extension } from "./Extension";

export class ExtensionRegistry implements IRegistry<Extension> {

    public static readonly INSTANCE = new ExtensionRegistry();
    private extensions: { [name: string]: Extension } = {};

    public all() {
        return { ...this.extensions };
    }

    public add(name: string, extension: Extension) {
        if (typeof this.extensions[name] !== "undefined") {
            throw new Error("Extension already exists.");
        }

        this.extensions[name] = extension;
    }

    public remove(name: string) {
        delete this.extensions[name];
    }

    public get<T extends Extension>(name: string) {
        const extension = this.extensions[name];

        if (typeof extension === "undefined") {
            return null;
        }

        return extension as T;
    }

}
