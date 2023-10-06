export type Params<T> = {
    [key in keyof T]?: T[key]
}
