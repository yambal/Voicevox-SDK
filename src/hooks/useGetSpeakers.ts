import aspida from "@aspida/axios"
import api from "../api/$api"
import { Speaker } from "../models/Speakers";
import { useState } from "react";
import { UseGetReturnBase } from "../tests/uril/useGetUtil";

const client = api(aspida());

export const getSpeakers = async () => {
  return await client.speakers.$get({query: {core_version: ""}})
}

export type useGetSpeakersReturn = {
  get:() => void
  speakers?: Speaker[]
} & UseGetReturnBase

export const useGetSpeakers = () => {
  const [isGetting, setIsGetting] = useState<Boolean>(false)
  const [speakers, setSpakers] = useState<Speaker[]|undefined>()
  const [error, setError] = useState<any>()

  const get = () => {
    setIsGetting(true)
    setError(undefined)
    setSpakers(undefined)
    getSpeakers()
      .then((s) => {
        setSpakers(s)
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
  speakers
 } as useGetSpeakersReturn
}