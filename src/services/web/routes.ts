import { Server } from "hapi";

export function loadRoutes(server: Server) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
    
            return "Hello world.";

        }
    });

}