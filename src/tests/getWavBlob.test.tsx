import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react'
import {
  getAudioQuery,
  getWavBlob,
  useGetWavBlob,
  Speaker,
  AudioQuery,
  getSpeakers
} from '..'
import { waitisNotGetting } from './uril/useGetUtil'

describe('getWavBlob (Real API)', () => {
  jest.setTimeout(10000); // 10 seconds timeout
  const text = "本日は晴天なり"
  let speaker = 0
  let audioQuery: AudioQuery

  beforeAll(async () => {
    const result: Speaker[] = await getSpeakers()
    speaker = result[0].styles[0].id
    const _audioAuery: AudioQuery = await getAudioQuery({
      text,
      speaker
    })
    audioQuery = _audioAuery
  })

  test('getAudioQuery', async () => {
    const wavBlob: Blob = await getWavBlob({
      speaker,
      audioQuery: audioQuery
    })
    expect(wavBlob instanceof Blob).toBe(true)
    expect(wavBlob.constructor.name).toBe("Blob")
  })

  test('useGetWavBlob', async () => {
    const renderHookResult = renderHook(() => useGetWavBlob())
    await waitisNotGetting(renderHookResult)
    await act(async () => {
      const {result: { current: { getWavBlob }}} = renderHookResult
      getWavBlob({
        speaker,
        audioQuery
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