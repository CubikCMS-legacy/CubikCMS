import * as hapi from "hapi";
import { Service } from "../../core/service_management/Service";
import { loadPlugins } from "./plugins";
import { loadRoutes } from "./routes";

export class WebServer extends Service {
    public server?: hapi.Server;

    constructor() {
        super();
    }

    public async start() {
        this.server = new hapi.Server({
            port: 8315,
        });
        await loadPlugins(this.server);
        await loadRoutes(this.server);

        let { address, port } = this.server.settings;
        address = address || "localhost";
        port    = port    || 80;

        return this.server.start()
            .then(() => console.log(`Web server opened at "http://${address}:${port}/".`));
    }

    public async stop() {
        if (typeof this.server !== "undefined") {
            return this.server.stop()
                .then(() => console.log(`Web server stopped.`));
        }
    }

}
