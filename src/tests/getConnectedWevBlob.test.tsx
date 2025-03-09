import {
  getAudioQuery,
  AudioQuery,
  Speaker,
  getSpeakers,
  getWavBlob,
  getConnectetWavBlob,
  useGetConnectetWevBlob
} from '../'
import { act, renderHook } from '@testing-library/react'
import { waitisNotGetting } from './uril/useGetUtil';

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

  test('useGetConnectetWevBlob', async () => {
    const renderHookResult = renderHook(() => useGetConnectetWevBlob())
    await waitisNotGetting(renderHookResult)
    await act(async () => {
      const {result: { current: { getConnectetWavBlob }}} = renderHookResult
      getConnectetWavBlob({
        blobs: [blobA, blobB]
      })
      await waitisNotGetting(renderHookResult)
    })
    const { result: {current: { error, blob }} } = renderHookResult

    if(error){
      expect(error).toBeUndefined()
    }

    if (blob) {
      expect(blob instanceof Blob).toBe(true)
      expect(blob.constructor.name).toBe("Blob")
    } else {
      expect(blob).toBeDefined()
    }
  })
})