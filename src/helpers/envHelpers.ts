export function getNodeEnv() {
    const env = process.env.NODE_ENV || "dev";
    switch (env.toLowerCase()) {

        case "prod":
        case "production":
            return "prod";

        default:
            return "dev";
    }
}
