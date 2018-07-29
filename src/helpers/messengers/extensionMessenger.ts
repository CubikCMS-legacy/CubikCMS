import { Extension } from "../../services/extensions/lib/Extension";
import { ExtensionRegisty } from "../../services/extensions/lib/ExtensionRegistry";
import { hasEntriesInObject } from "../objectHelpers";

export interface Message {
    cmd: string;
    code: string;
    values: any[];
    token?: string;
}
export interface MessageMatch {
    cmd?: string;
    code?: string;
    values?: any[];
    token?: string;
}

export function sendToExtensions(msg: Message) {
    const extensions = ExtensionRegisty.all();
    for (const name in extensions) {
        if (typeof extensions[name] !== "undefined") {
            const extension = extensions[name];

            if (typeof extension.worker !== "undefined") {
                extension.worker.send(msg);
            }
        }
    }
}

export function emitToExtensions(code: string, ...values: any[]) {
    sendToExtensions({
        cmd: "emitEvent",
        code,
        values,
    });
}

export function listenFromExtensions(match: MessageMatch, listener: (ext: Extension, msg: Message) => boolean | void) {
    const extensions = ExtensionRegisty.all();
    for (const name in extensions) {
        if (typeof extensions[name] !== "undefined") {
            const extension = extensions[name];

            const messageListener = (message: Message) => {
                if (typeof message !== "object") { return; }

                const { cmd, code, values } = message;

                // If cmd is not a string
                if (typeof cmd !== "string") { return; }
                // If matched properties are in the message
                if (hasEntriesInObject(match, message)) { return; }
                // If code is not a string, stop.
                if (typeof code !== "string") { return; }
                // If values are not in array
                if (typeof values === "undefined" || values ! instanceof Array) { return; }

                // Call the listener with the data
                const stillLoop = listener(extension, message);

                if (stillLoop === false && typeof extension.worker !== "undefined") {
                    extension.worker.removeListener("message", messageListener);
                }
            };

            if (typeof extension.worker !== "undefined") {
                extension.worker.addListener("message", messageListener);
            }
        }
    }
}
