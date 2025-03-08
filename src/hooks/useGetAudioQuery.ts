import aspida from "@aspida/axios"
import api from "../api/$api"
import { useQuery } from "@tanstack/react-query";
import { AudioQuery } from "../models/AudioQuery";

const client = api(aspida());

export type GetAudioQueryProps = {
  text: string,
  speaker: number,
  core_version?: string
}
export const getAudioQuery = async ({
  text,
  speaker,
  core_version
}:GetAudioQueryProps) => {
  return await client.audio_query.$post({query: {
    text,
    speaker,
    core_version
  }})
}


export const useGetAudioQuery = ({
  text,
  speaker,
  core_version
}:GetAudioQueryProps) => {
 return useQuery({
    queryKey: ['audioQuery'],
    queryFn: async():
      Promise<AudioQuery> => {
        return await getAudioQuery({
          text,
          speaker,
          core_version
        })
      }
  })
}