import aspida from "@aspida/axios"
import api from "../api/$api"
import { AudioQuery } from "../models/AudioQuery";
import { useState } from "react";
import { UseGetReturnBase } from "../tests/uril/useGetUtil";

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

export type UseGetWebBlobsReturn = {
  getWavBlobs: (props: GetWavBlobsProps) => void
  blob: Blob|undefined
} & UseGetReturnBase

export const useGetWavBlobs = () => {
  const [isGetting, setIsGetting] = useState<Boolean>(false)
  const [blob, setBlob] = useState<Blob|undefined>()
  const [error, setError] = useState<any>()

  const _getWavBlobs = ({
    speaker,
    audioQueries,
    core_version,
    enable_interrogative_upspeak
  }: GetWavBlobsProps) => {
    setIsGetting(true)
    setError(undefined)
    setBlob(undefined)
    getWavBlobs({
      speaker,
      audioQueries,
      core_version,
      enable_interrogative_upspeak
    }).then((b) => {
      setBlob(b)
    }).catch((error) => {
      setError(error)
    }).finally(() => {
      setIsGetting(false)
    })
  }

 return {
  getWavBlobs: _getWavBlobs,
  isGetting,
  error,
  blob
 } as UseGetWebBlobsReturn
}
