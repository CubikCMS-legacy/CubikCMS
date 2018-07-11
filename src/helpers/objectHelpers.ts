function getObjectEntries<T>(o: { [key: string]: T }) {
    const pairs: Array<Array<string|T>> = [];

    for (const key in o) {
        if (typeof o[key] !== "undefined") {
            const value = o[key];

            pairs.push([key, value]);
        }
    }

    return pairs;
}
