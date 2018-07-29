import { Initializer } from "./core/Initializer";

const initialServices = [
    "web",
    "extensions",  // We do extensions loading at last
];

new Initializer()
    .launch(async ({ loadConfig, initializeApp, runServices }) => {
        loadConfig();
        initializeApp();
        await runServices(initialServices);
    });
