export function getObjectEntries<T>(o: { [key: string]: T }) {
    const pairs: Array<Array<string|T>> = [];

    for (const key in o) {
        if (typeof o[key] !== "undefined") {
            const value = o[key];

            pairs.push([key, value]);
        }
    }

    return pairs;
}

export function getObjectValues<T>(o: { [key: string]: T }) {
    const pairs: T[] = [];

    for (const key in o) {
        if (typeof o[key] !== "undefined") {
            const value = o[key];

            pairs.push(value);
        }
    }

    return pairs;
}

export function hasEntriesInObject(entriesObject: any, object: any) {
    const property = Object.getOwnPropertyNames(entriesObject);

    for (const propertyName of property) {
        if (object[propertyName] !== entriesObject[propertyName]) {
            return false;
        }
    }

    return true;
}
