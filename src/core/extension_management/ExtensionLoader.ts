import { Application } from "./../Application";
import { Extension } from "./Extension";
import { ExtensionRegisty } from "./ExtensionRegistry";

export class ExtensionLoader {
    public app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public load(name: string) {
        const extension = new Extension(name);

        if (extension.name !== extension.pathName) {
            throw new Error(extension.pathName + ": Package name is not the same as his folder.");
        }

        ExtensionRegisty.add(name, extension);
    }

    public unload(name: string) {
        ExtensionRegisty.remove(name);
    }
}
