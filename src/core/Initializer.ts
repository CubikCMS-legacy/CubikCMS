import autobind from "autobind-decorator";
import { EventEmitter } from "events";
import { Config } from "../schemes/Config";
import { Application } from "./Application";
import { Configuration } from "./Configuration";
import { CubikCMS } from "./CubikCMS";

@autobind
export class Initializer extends EventEmitter {
    public app: Application;
    public config?: Config;

    constructor() {
        super();

        this.app = new Application();
        CubikCMS.executeInitialization(this);

        if (CubikCMS.environment === "dev") {
            CubikCMS.logger.warning("You're running CubikCMS in developement mode.");
            CubikCMS.logger.warning("This mode may not be suitable for production purposes.");
        }
    }

    public async launch(script: (initializer: Initializer) => Promise<void>) {
        try {
            await script(this);
        } catch (err) {
            CubikCMS.logger.fatal(err);
        }
    }

    public loadConfig() {
        const env = CubikCMS.environment;
        CubikCMS.loadConfiguration(new Configuration(`config.${env}.json`));
    }

    public initializeApp() {
        if (!this.app.initialized) {
            this.app.initialize(this);
        }
    }

    public async runServices(services: string[]) {
        await this.app.loadServices(services);
    }

}
