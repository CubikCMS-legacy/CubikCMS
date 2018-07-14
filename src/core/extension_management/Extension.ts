import { existsSync } from 'fs';
import { fork, setupMaster, Worker } from "cluster";
import { join } from "path";

export class Extension {
    public pathName: string;
    public package: any;
    public worker: Worker;

    constructor(name: string) {
        this.pathName = name;

        var rootDir = '../../../addons/extensions/' + name;
        var packagePath = join(rootDir, 'package.json');

        if(!existsSync(packagePath)) {
            throw new Error("Extension package not found for '" + name + "'.");
        }

        this.package = require(packagePath);

        var settings: any = {
            exec: join(rootDir, this.package.main),
            cwd: rootDir
        }

        setupMaster(settings);
        this.worker = fork();
    }

    get name() {
        var name = this.package.name;
        if (typeof name !== "string") {
            throw new Error(this.pathName + ": Invalid extension name: " + name + ".");
        }
        
        return name;
    }
}