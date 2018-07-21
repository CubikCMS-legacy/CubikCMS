import { Extension } from "../../services/extensions/lib/Extension";
import { ExtensionRegisty } from "../../services/extensions/lib/ExtensionRegistry";

export interface Message {
    type: string;
    code: string;
    values: any[];
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
        code,
        type: "event",
        values,
    });
}

export function listenFromExtensions(searchedType: string, listener: (ext: Extension, msg: Message) => boolean | void) {
    const extensions = ExtensionRegisty.all();
    for (const name in extensions) {
        if (typeof extensions[name] !== "undefined") {
            const extension = extensions[name];

            const messageListener = (message: Message) => {
                if (typeof message !== "object") { return; }

                const { type, code, values } = message;

                // If type is not a string
                if (typeof type !== "string") { return; }
                // If current type is not what wee're looking for or "any", stop looking message.
                if (type !== searchedType && searchedType !== "any") { return; }
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
