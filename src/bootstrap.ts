import { WebServer } from "./services/web/WebServer";

let failuresCount = 0;
const web = new WebServer();

web.start()
    .then(() => {
        // The server is opened! Let's log this.
        if (typeof web.server !== "undefined") {
            const { uri } = web.server.settings;

            console.log(`Sever opened at ${uri}`);
        }
    })
    .catch((err) => {
        console.error(err);

        // Until there are 10 errors, restart the server
        if (failuresCount < 10) {
            web.restart();
            failuresCount++;
        }
    });
