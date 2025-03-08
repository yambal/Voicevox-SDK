import aspida from "@aspida/axios"
import api from "../api/$api"
import { useQuery } from "@tanstack/react-query";
import { blobToBase64 } from "@maruware/blob-to-base64";

const client = api(aspida());

export type GetConnectetWavBlobProps = {
  blobs: Blob[]
}
export const getConnectetWavBlob = async ({
  blobs
}:GetConnectetWavBlobProps) => {
  const base64Strings = await Promise.all(blobs.map(async (blob) => {
    return await blobToBase64(blob);
  }));
  return await client.connect_waves.$post({
    body: base64Strings
  })
}

export const useGetConnectetWevBlob = ({
  blobs
}:GetConnectetWavBlobProps) => {
 return useQuery({
    queryKey: ['getWavBlob'],
    queryFn: async():
      Promise<Blob> => {
        return await getConnectetWavBlob({
          blobs
        })
      }
  })
}