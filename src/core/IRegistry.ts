export interface IRegistry<T> {
    all(): { [name: string]: T };
    add(name: string, element: T): void;
    remove(name: string): void;
    get<U extends T>(name: string): U | null;
}
