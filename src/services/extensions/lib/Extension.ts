import { fork, setupMaster, Worker } from "cluster";
import { existsSync } from "fs";
import { join } from "path";
import { CubikCMS } from "../../../core/CubikCMS";

export class Extension {
    public package: any;
    public pathName: string;
    public worker?: Worker;

    constructor(name: string) {
        this.pathName = name;

        const root = join(__dirname, "../../../../addons/extensions/", name);
        const packagePath = join(root, "package.json");

        if (!existsSync(packagePath)) {
            throw new Error("Extension package not found for '" + name + "'.");
        }

        const extensionPackage = require(packagePath);

        this.package = {
            root,
            ...extensionPackage,
        };
    }

    get name() {
        const name = this.package.name;
        if (typeof name !== "string") {
            throw new Error(this.pathName + ": Invalid extension name: " + name + ".");
        }

        return name;
    }

    get root() {
        const root = this.package.root;
        if (typeof root !== "string") {
            throw new Error(this.pathName + ": Invalid extension root directory: " + root + ".");
        }

        return root;
    }

    public async startWorker() {
        CubikCMS.logger.debug(`Starting extension '${this.name}'.`);

        const root = this.root;

        const settings: any = {
            cwd: root,
            exec: join(root, this.package.main),
        };

        setupMaster(settings);
        this.worker = fork();

        CubikCMS.logger.debug(`Started extension '${this.name}'.`);
    }

    public async killWorker() {
        if (typeof this.worker === "undefined") {
            CubikCMS.logger.step(`Extension '${this.name}' not stopped: All workers are already stopped.`);
            return;
        }
        CubikCMS.logger.debug(`Stopping extension '${this.name}'.`);

        this.worker.kill();
        await new Promise((resolve) => {
            this.worker!.once("exit", () => {
                if (this.worker!.exitedAfterDisconnect === true) {
                    resolve();
                }
            });
        });

        CubikCMS.logger.debug(`Stopped extension '${this.name}'.`);
    }
}
