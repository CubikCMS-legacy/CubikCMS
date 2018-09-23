import * as hapi from "hapi";
import { CubikCMS } from "../../core/CubikCMS";
import { Service } from "../../core/service_management/Service";
import { loadControllers } from "./controllers";
import { loadPlugins } from "./plugins";

export class WebServer extends Service {
    public server?: hapi.Server;

    constructor() {
        super();
    }

    public async start() {
        const { address, port } = CubikCMS.configuration;
        this.server = new hapi.Server({
            address,
            port,
        });

        const serverStorage: any = this.server.app;
        serverStorage.app     = this.app;
        serverStorage.service = this;

        await loadPlugins(this.server);
        await loadControllers(this.server);

        await this.server.start();
        CubikCMS.logger.info(`Web server opened at "http://${address}:${port}/".`);
    }

    public async stop() {
        if (typeof this.server !== "undefined") {
            await this.server.stop();
            CubikCMS.logger.info(`Web server stopped.`);
        }
    }

}
