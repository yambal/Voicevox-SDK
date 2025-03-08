import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react'
import { getSpeakers, getWavBlobs, useGetWavBlobs, getAudioQuery } from '..'
import { Speaker } from '../models/Speakers'
import { AudioQuery } from '../models/AudioQuery'
import { useTanstackQueryWrapper, waitForLoadingToFinish } from './uril/react'

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
    const wrapper = useTanstackQueryWrapper()
    const renderHookResult = renderHook(() => useGetWavBlobs({
      speaker,
      audioQueries: [audioQueryA, audioQueryB]
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