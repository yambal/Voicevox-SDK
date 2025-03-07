import aspida from "@aspida/axios"
import api from "../api/$api"
import { useQuery } from "@tanstack/react-query";
import { Speaker } from "../models/Speakers";

const client = api(aspida());

export const getSpeakers = async () => {
  return await client.speakers.$get({query: {core_version: ""}})
}


export const useGetSpeakers = () => {
 return useQuery({
    queryKey: ['speaker'],
    queryFn: async():
      Promise<Array<Speaker>> => {
        return await getSpeakers()
      }
  })
}