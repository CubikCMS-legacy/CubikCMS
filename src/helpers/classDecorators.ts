export function final(constructor: any) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

export function hidden(target: any, key: string, descriptor: any) {
    descriptor.enumerable = false;
}