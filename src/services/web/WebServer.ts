import * as hapi from "hapi";
import { Service } from "../../core/service_management/Service";
import { printMessage } from "../../helpers/printHelpers";
import { loadControllers } from "./controllers";
import { loadPlugins } from "./plugins";

export class WebServer extends Service {
    public server?: hapi.Server;

    constructor() {
        super();
    }

    public async start() {
        const { address, port } = this.app.config;
        this.server = new hapi.Server({
            address,
            port,
        });

        const serverStorage: any = this.server.app;
        serverStorage.app     = this.app;
        serverStorage.service = this;

        await loadPlugins(this.server);
        await loadControllers(this.server);

        return this.server.start()
            .then(() => printMessage(`Web server opened at "http://${address}:${port}/".`));
    }

    public async stop() {
        if (typeof this.server !== "undefined") {
            return this.server.stop()
                .then(() => printMessage(`Web server stopped.`));
        }
    }

}
