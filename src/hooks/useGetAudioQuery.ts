import aspida from "@aspida/axios"
import api from "../api/$api"
import { AudioQuery } from "../models/AudioQuery";
import { useState } from "react";
import { UseGetReturnBase } from "../tests/uril/useGetUtil";

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

export type UseGetAudioQueryReturn = {
  getAudioQuery: ({
    text,
    speaker,
    core_version
  }: GetAudioQueryProps) => void
  audioQuery?: AudioQuery
} & UseGetReturnBase

export const useGetAudioQuery = () => {
  const [isGetting, setIsGetting] = useState<Boolean>(false)
  const [audioQuery, setAudioQuery] = useState<AudioQuery|undefined>()
  const [error, setError] = useState<any>()

  const _getAudioQuery = ({
    text,
    speaker,
    core_version
  }: GetAudioQueryProps) => {
    setIsGetting(true)
    setError(undefined)
    setAudioQuery(undefined)
    getAudioQuery({
      text,
      speaker,
      core_version
    }).then((aq) => {
      setAudioQuery(aq)
    }).catch((error) => {
      setError(error)
    }).finally(() => {
      setIsGetting(false)
    })
  }

 return {
  getAudioQuery: _getAudioQuery,
  isGetting,
  error,
  audioQuery
 } as UseGetAudioQueryReturn
}