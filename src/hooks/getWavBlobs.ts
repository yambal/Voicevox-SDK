import aspida from "@aspida/axios"
import api from "../api/$api"
import { useQuery } from "@tanstack/react-query";
import { AudioQuery } from "../models/AudioQuery";

const client = api(aspida());

export type GetWavBlobsProps = {
  speaker: number,
  audioQueries: AudioQuery[]
  enable_interrogative_upspeak?: boolean,
  core_version?: string
}
export const getWavBlobs = async ({
  speaker,
  audioQueries,
  core_version,
  enable_interrogative_upspeak
}:GetWavBlobsProps) => {
  return await client.multi_synthesis.$post({
    query: {
      speaker,
      core_version,
      enable_interrogative_upspeak
    },
    body: audioQueries
  })
}

export const useGetWavBlobs = ({
  speaker,
  audioQueries,
  core_version,
  enable_interrogative_upspeak
}:GetWavBlobsProps) => {
 return useQuery({
    queryKey: ['getWavBlob'],
    queryFn: async():
      Promise<Blob> => {
        return await getWavBlobs({
          speaker,
          audioQueries,
          core_version,
          enable_interrogative_upspeak
        })
      }
  })
}