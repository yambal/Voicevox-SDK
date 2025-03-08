import aspida from "@aspida/axios"
import api from "../api/$api"
import { useQuery } from "@tanstack/react-query";
import { AudioQuery } from "../models/AudioQuery";

const client = api(aspida());

export type GetWavBlobProps = {
  speaker: number,
  audioQuery: AudioQuery
  enable_interrogative_upspeak?: boolean,
  core_version?: string
}
export const getWavBlob = async ({
  speaker,
  audioQuery,
  core_version,
  enable_interrogative_upspeak
}:GetWavBlobProps) => {
  return await client.synthesis.$post({
    query: {
      speaker,
      enable_interrogative_upspeak,
      core_version
    },
    body: audioQuery
  })
}

export const useGetWavBlob = ({
  speaker,
  audioQuery,
  core_version,
  enable_interrogative_upspeak
}:GetWavBlobProps) => {
 return useQuery({
    queryKey: ['getWavBlob'],
    queryFn: async():
      Promise<Blob> => {
        return await getWavBlob({
          speaker,
          audioQuery,
          core_version,
          enable_interrogative_upspeak
        })
      }
  })
}