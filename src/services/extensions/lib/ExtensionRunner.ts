import { ExtensionsServer } from "../ExtensionsServer";
import { Extension } from "./Extension";
import { ExtensionRegistry } from "./ExtensionRegistry";

export class ExtensionRunner {
    public server: ExtensionsServer;
    private registry = ExtensionRegistry.INSTANCE;

    constructor(server: ExtensionsServer) {
        this.server = server;
    }

    public async start() {
        const extensions = this.registry.all();
        for (const name in extensions) {
            if (typeof extensions[name] !== "undefined") {

                await this.load(name);

            }
        }
    }

    public async stop() {
        const extensions = this.registry.all();
        for (const name in extensions) {
            if (typeof extensions[name] !== "undefined") {

                await this.unload(name);

            }
        }
    }

    public async register(name: string) {
        const extension = new Extension(name);

        if (extension.name !== extension.pathName) {
            throw new Error(extension.pathName + ": Package name is not the same as his folder.");
        }

        this.registry.add(name, extension);
    }

    public async load(name: string) {
        const extension = this.registry.get(name);

        if (extension == null) {
            throw new Error("Failed to load extension.");
        }

        await extension.startWorker();
    }

    public async unload(name: string) {
        const extension = this.registry.get(name);
        if (extension !== null) {
            await extension.killWorker();
            this.registry.remove(name);
        }
    }
}
