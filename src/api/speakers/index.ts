import { Speaker } from '../../models/Speakers';
import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    query: {
      core_version?: string
    },
    resBody: Speaker[]
  }
}>