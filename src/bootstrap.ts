import { WebServer } from './services/web/WebServer';

async function server() {
    var failures = 0;
    var web = new WebServer();

    await web.start()
        .catch((err) => {
            console.error(err);

            if(failures < 10) {
                web.restart();
                failures++;
            }
        });
    
    if(typeof web.server !== "undefined") {
        var { address, port } = web.server.settings;
        address = address || 'localhost';

        console.log(`Sever opened at http://${address}:${port}/`);
    }
};

server();