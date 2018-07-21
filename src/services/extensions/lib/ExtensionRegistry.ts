import { Extension } from "./Extension";

export class ExtensionRegisty {

    public static all() {
        return {...ExtensionRegisty.extensions};
    }

    public static add(name: string, extension: Extension) {
        if (typeof ExtensionRegisty.extensions[name] !== "undefined") {
            throw new Error("Extension already exists.");
        }

        ExtensionRegisty.extensions[name] = extension;
    }

    public static remove(name: string) {
        delete ExtensionRegisty.extensions[name];
    }

    public static get<T extends Extension>(name: string) {
        const extension = ExtensionRegisty.extensions[name];

        if (typeof extension === "undefined") {
            return null;
        }

        return extension as T;
    }

    private static extensions: { [name: string]: Extension } = {};
}
