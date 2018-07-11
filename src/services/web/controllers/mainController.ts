import { ServerRoute } from "hapi";

export const index: ServerRoute = {
    method: "GET",
    path: "/",
    handler(req, h, err) {
        const headers = getObjectEntries(req.headers);
        const headerStrings = headers.map( (value) => value[0].toUpperCase() + ": " + value[1] );

        return h.response( headerStrings.join("\n") ).type("text/plain");
    },
};
