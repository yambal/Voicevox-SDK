import aspida from "@aspida/axios"
import api from "../api/$api"
import { AudioQuery } from "../models/AudioQuery";
import { useState } from "react";
import { UseGetReturnBase } from "../tests/uril/useGetUtil";

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

export type UseGetWebBlobReturn = {
  get: ({
    speaker,
    audioQuery,
    core_version,
    enable_interrogative_upspeak
  }: GetWavBlobProps) => void
  blob: Blob|undefined
} & UseGetReturnBase

export const useGetWavBlob = () => {
  const [isGetting, setIsGetting] = useState<Boolean>(false)
  const [blob, setBlob] = useState<Blob|undefined>()
  const [error, setError] = useState<any>()

  const get = ({
    speaker,
    audioQuery,
    core_version,
    enable_interrogative_upspeak
  }: GetWavBlobProps) => {
    setIsGetting(true)
    setError(undefined)
    setBlob(undefined)
    getWavBlob({
      speaker,
      audioQuery,
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
  get,
  isGetting,
  error,
  blob
 } as UseGetWebBlobReturn
}