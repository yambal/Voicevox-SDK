import { getSpeakers, getAudioQuery, getWavBlob, getConnectetWavBlob, useGetConnectetWevBlob } from '..'
import { Speaker } from '../models/Speakers'
import { AudioQuery } from '../models/AudioQuery'
import { useTanstackQueryWrapper, waitForLoadingToFinish } from './uril/react';
import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react'

describe('getConnectetWevBlob (Real API)', () => {
  jest.setTimeout(20000); // 10 seconds timeout
  const textA = "本日は晴天なり"
  const textB = "ただいまマイクのテスト中"
  let speaker = 0
  let blobA: Blob
  let blobB: Blob

  beforeAll(async () => {
    const result: Speaker[] = await getSpeakers()
    speaker = result[0].styles[0].id
    const audioQueryA: AudioQuery = await getAudioQuery({
      text: textA,
      speaker
    })
    const audioQueryB: AudioQuery = await getAudioQuery({
      text: textB,
      speaker
    })

    blobA = await getWavBlob({
      speaker,
      audioQuery: audioQueryA
    })
    blobB = await getWavBlob({
      speaker,
      audioQuery: audioQueryB
    })
  })

  test('getConnectetWevBlob', async () => {
    const wavBlob: Blob = await getConnectetWavBlob({
      blobs: [blobA, blobB]
    })
    expect(wavBlob instanceof Blob).toBe(true)
    expect(wavBlob.constructor.name).toBe("Blob")
    console.log(wavBlob.size)
    console.log(wavBlob.type)
  })


  test('useGetConnectetWevBlobs', async () => {
    const wrapper = useTanstackQueryWrapper()
    const renderHookResult = renderHook(() => useGetConnectetWevBlob({
      blobs: [blobA, blobB]
    }), { wrapper })
    await act(async () => {
      await waitForLoadingToFinish(renderHookResult)
    })
    const { result: {current: { error, data }} } = renderHookResult
    if(error){
      expect(error).toBeUndefined()
    }
    if (data) {
      expect(data instanceof Blob).toBe(true)
      expect(data.constructor.name).toBe("Blob")
    } else {
      expect(data).toBeDefined()
    }
  })
})