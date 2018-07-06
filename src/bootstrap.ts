import { ServiceLoader } from "./core/service_management/ServiceLoader";
const serviceLoader = new ServiceLoader();

const initialServices = [
    "web",
];

// TODO: Add an error handling system
serviceLoader.load(initialServices);
