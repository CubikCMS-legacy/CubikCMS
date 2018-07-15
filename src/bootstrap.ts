import { Initializer } from "./core/Initializer";

const initialServices = [
    "web",
];

(async ({ loadConfig, initializeApp, registerExtensions, runServices }) => {

    loadConfig();
    initializeApp();
    await registerExtensions();
    await runServices(initialServices);

})( new Initializer() );
