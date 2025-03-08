import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody: string[],
    resBody: Blob
  }
}>