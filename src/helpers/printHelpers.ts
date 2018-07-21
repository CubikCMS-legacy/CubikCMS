import "colors";
import { getNodeEnv } from "./envHelpers";

const isDev = getNodeEnv() === "dev";

export function printMessage(s: string) {
    console.log(s);
}

export function printLog(s: string) {
    console.log(s.gray);
}

export function printDevLog(s: string) {
    if (isDev) {
        console.log(s.gray);
    }
}

export function printError(e: string | Error) {
    if (e instanceof Error) {
        if (isDev && e.stack !== undefined) {
            e = e.stack;
        } else {
            e = e.message;
        }
    }
    console.error(e.red);
}

export function printWarn(s: string) {
    console.warn(s.yellow);
}

export function printDevWarn(s: string) {
    if (isDev) {
        console.warn(s.yellow);
    }
}

export function printBlank() {
    console.log();
}
