import { Server } from "hapi";
import { loadController } from "./helpers/controllerHelpers";

export function loadControllers(server: Server) {

    loadController(server, require("./controllers/mainController"));

}
