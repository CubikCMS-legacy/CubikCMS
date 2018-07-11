import { ServerRoute } from "hapi";
import { getControllerUtils } from "../helpers/controllerHelpers";

export const index: ServerRoute = {
    method: "GET",
    path: "/",
    handler(req, h, err) {
        const { view } = getControllerUtils(h);
        return view.render("hello");
    },
};
