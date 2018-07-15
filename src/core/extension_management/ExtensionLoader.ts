import { printLog } from "../../helpers/printHelpers";
import { Application } from "./../Application";
import { Extension } from "./Extension";
import { ExtensionRegisty } from "./ExtensionRegistry";

export class ExtensionLoader {
    public app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public async load(name: string) {
        const extension = new Extension(name);

        if (extension.name !== extension.pathName) {
            throw new Error(extension.pathName + ": Package name is not the same as his folder.");
        }

        printLog(`Starting extension '${name}'.`);
        await new Promise((resolve, reject) => {
            extension.worker.once("online", resolve);
            extension.worker.once("error", reject);
        });

        ExtensionRegisty.add(name, extension);
        printLog(`Started extension '${name}'.`);
    }

    public async unload(name: string) {
        printLog(`Starting service '${name}'.`);
        const extension = ExtensionRegisty.get(name);
        if (extension !== null) {
            printLog(`Stopping extension '${name}'.`);
            await new Promise((resolve) => {
                extension.worker.once("exit", resolve);
            });

            extension.worker.kill();

            ExtensionRegisty.remove(name);
            printLog(`Stopped extension '${name}'.`);
        }
    }
}
