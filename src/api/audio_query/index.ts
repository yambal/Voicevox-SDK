import { AudioQuery} from '../../models/AudioQuery'

export type Methods = {
  post: {
    query: {
      text: string
      speaker: number
      core_version?: string
    }
    resBody: AudioQuery
  }
}