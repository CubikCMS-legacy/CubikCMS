import { Initializer } from "./core/Initializer";

const initialServices = [
    "web",
];

initialServices.push("extensions"); // We do extensions loading at last

(async ({ loadConfig, initializeApp, runServices }) => {

    loadConfig();
    initializeApp();
    await runServices(initialServices);

})( new Initializer() );
