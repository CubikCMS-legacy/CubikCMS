import { lstatSync, readdirSync } from "fs";
import { Service } from "../../core/service_management/Service";
import { ExtensionRunner } from "./lib/ExtensionRunner";

export class ExtensionsServer extends Service {
    public extensionRunner: ExtensionRunner;

    constructor() {
        super();
        this.extensionRunner = new ExtensionRunner(this);
    }

    public async start() {
        const dir = __dirname + "/../../../addons/extensions/";

        const files = readdirSync(dir);
        for (const file of files) {
            if (lstatSync(dir + file).isDirectory()) {
                await this.extensionRunner.register(file);
            }
        }

        await this.extensionRunner.start();
    }

    public async stop() {
        this.extensionRunner.stop();
    }

}
