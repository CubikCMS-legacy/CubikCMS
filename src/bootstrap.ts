import { Initializer } from "./core/Initializer";

const initialServices = [
    "web"
];

void async function({ loadConfig, initializeApp, registerExtensions, runServices }) {

    loadConfig();
    await initializeApp();
    await registerExtensions();
    await runServices(initialServices);

}( new Initializer() );
