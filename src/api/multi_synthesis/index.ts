import { AudioQuery } from '../../models/AudioQuery'
import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    query: {
      speaker: number,
      enable_interrogative_upspeak?: boolean
      core_version?: string
    },
    reqBody: AudioQuery[],
    resBody: Blob
  }
}>