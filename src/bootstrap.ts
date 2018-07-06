import { ServiceLoader } from "./core/service_management/ServiceLoader";

let failuresCount = 0;
const serviceLoader = new ServiceLoader();

serviceLoader.load("web")
    .catch((err) => {
        console.error(err);

        // Until there are 10 errors, restart the server
        if (failuresCount < 10) {
            serviceLoader.reload("web");
            failuresCount++;
        }
    });
