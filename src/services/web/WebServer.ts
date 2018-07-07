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
        const { address, port } = this.app.config;
        this.server = new hapi.Server({
            address,
            port,
        });

        await loadPlugins(this.server);
        await loadRoutes(this.server);

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
