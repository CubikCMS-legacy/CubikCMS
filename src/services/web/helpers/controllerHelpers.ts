import { ResponseToolkit, Server, ServerRoute } from "hapi";
import { ViewRenderer } from "../lib/ViewRenderer";

export function loadController(server: Server, controller: { [s: string]: ServerRoute; }) {
    for (const key in controller) {
        if (typeof controller[key] !== "undefined") {
            const route = controller[key];

            if (typeof route.path !== "undefined" && typeof route.method !== "undefined") {
                server.route(route);
            }
        }
    }
}

export function getControllerUtils(h: ResponseToolkit) {
    return {
        view: new ViewRenderer(h),
    };
}
