import { Service } from "../../core/Service";
import * as hapi from "hapi";
import { loadPlugins } from "./plugins";
import { loadRoutes } from "./routes";

export class WebServer extends Service {

    public server?: hapi.Server

    async start() {
        this.server = new hapi.Server({
            port: 8315
        });
        await loadPlugins(this.server);
        await loadRoutes(this.server);
    
        return this.server.start();
    }

    async stop() {
        if(typeof this.server != "undefined") {
            return this.server.stop()
        }
    }

}