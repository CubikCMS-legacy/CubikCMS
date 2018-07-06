import { Initializer } from "./core/Initializer";

const initialServices = [
    "web",
];

new Initializer()
    .loadConfig()
    .runServices(initialServices);
