import { fork, setupMaster, Worker } from "cluster";
import { existsSync } from "fs";
import { join } from "path";

export class Extension {
    public pathName: string;
    public package: any;
    public worker: Worker;

    constructor(name: string) {
        this.pathName = name;

        const rootDir = join(__dirname, "../../../addons/extensions/", name);
        const packagePath = join(rootDir, "package.json");

        if (!existsSync(packagePath)) {
            throw new Error("Extension package not found for '" + name + "'.");
        }

        this.package = require(packagePath);

        const settings: any = {
            cwd: rootDir,
            exec: join(rootDir, this.package.main),
        };

        setupMaster(settings);
        this.worker = fork();
    }

    get name() {
        const name = this.package.name;
        if (typeof name !== "string") {
            throw new Error(this.pathName + ": Invalid extension name: " + name + ".");
        }

        return name;
    }
}
