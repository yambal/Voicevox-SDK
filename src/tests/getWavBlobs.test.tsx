import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react'
import {
  getSpeakers,
  getWavBlobs,
  useGetWavBlobs,
  getAudioQuery,
  Speaker,
  AudioQuery
} from '..'

import { waitisNotGetting } from './uril/useGetUtil'

describe('getWavBlobs (Real API)', () => {
  jest.setTimeout(10000); // 10 seconds timeout
  const textA = "本日は晴天なり"
  const textB = "ただいまマイクのテスト中"
  let speaker = 0
  let audioQueryA: AudioQuery
  let audioQueryB: AudioQuery

  beforeAll(async () => {
    const result: Speaker[] = await getSpeakers()
    speaker = result[0].styles[0].id
    const _audioAueryA: AudioQuery = await getAudioQuery({
      text: textA,
      speaker
    })
    const _audioAueryB: AudioQuery = await getAudioQuery({
      text: textB,
      speaker
    })
    audioQueryA = _audioAueryA
    audioQueryB = _audioAueryB
  })

  test('getAudioQuery', async () => {
    const wavBlob: Blob = await getWavBlobs({
      speaker,
      audioQueries: [audioQueryA, audioQueryB]
    })
    expect(wavBlob instanceof Blob).toBe(true)
    expect(wavBlob.constructor.name).toBe("Blob")
  })

  test('useGetWavBlobs', async () => {
    const renderHookResult = renderHook(() => useGetWavBlobs())
    await waitisNotGetting(renderHookResult)
    await act(async () => {
      const {result: { current: { getWavBlobs }}} = renderHookResult
      getWavBlobs({
        speaker,
        audioQueries: [audioQueryA, audioQueryB]
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