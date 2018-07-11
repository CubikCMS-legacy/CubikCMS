import { ResponseToolkit } from "hapi";
import { getObjectEntries } from "../../../helpers/objectHelpers";
import { WebServer } from "../WebServer";

export class ViewRenderer {
    protected server: WebServer;
    protected h: ResponseToolkit;

    constructor(h: ResponseToolkit) {
        const serverStorage: any = h.request.server.app;
        const server: WebServer = serverStorage.service;

        this.server = server;
        this.h = h;
    }

    public render(viewId: string) {
        const h   = this.h;
        const req = this.h.request;

        const headers = getObjectEntries(req.headers);
        const headerStrings = headers.map( (value) => value[0].toUpperCase() + ": " + value[1] );

        return h.response( headerStrings.join("\n") ).type("text/plain");
    }
}
