export type PageSearchParams<T extends string = string> = {
  [key: string]: T | T[] | undefined
}
