import "colors";

export function printMessage(s: string) {
    console.log(s);
}

export function printLog(s: string) {
    console.log(s.gray);
}

export function printError(e: string | Error) {
    if (e instanceof Error) {
        e = e.message;
    }
    console.error(e.red);
}

export function printWarn(s: string) {
    console.warn(s.yellow);
}

export function printBlank() {
    console.log();
}
