import * as hapi from "hapi";
import { Service } from "../../core/Service";
import { loadPlugins } from "./plugins";
import { loadRoutes } from "./routes";

export class WebServer extends Service {

    public server?: hapi.Server;

    public async start() {
        this.server = new hapi.Server({
            port: 8315,
        });
        await loadPlugins(this.server);
        await loadRoutes(this.server);

        return this.server.start();
    }

    public async stop() {
        if (typeof this.server !== "undefined") {
            return this.server.stop();
        }
    }

}
