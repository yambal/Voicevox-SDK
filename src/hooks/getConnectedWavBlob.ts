import aspida from "@aspida/axios"
import api from "../api/$api"
import { blobToBase64 } from "@maruware/blob-to-base64";
import { useState } from "react";
import { UseGetReturnBase } from "../tests/uril/useGetUtil";

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

export type UseGetConnectetWevBlobReturn = {
  getConnectetWavBlob: (props: GetConnectetWavBlobProps) => void
  blob: Blob | undefined
} & UseGetReturnBase

export const useGetConnectetWevBlob = () => {
  const [isGetting, setIsGetting] = useState<Boolean>(false)
  const [blob, setBlob] = useState<Blob|undefined>()
  const [error, setError] = useState<any>()

  const _getConnectetWavBlob = ({
    blobs
  }: GetConnectetWavBlobProps) => {
    setIsGetting(true)
    setError(undefined)
    setBlob(undefined)
    getConnectetWavBlob({
      blobs
    }).then((b) => {
      setBlob(b)
    }).catch((error) => {
      setError(error)
    }).finally(() => {
      setIsGetting(false)
    })
  }

 return {
  getConnectetWavBlob: _getConnectetWavBlob,
  isGetting,
  error,
  blob
 } as UseGetConnectetWevBlobReturn
}