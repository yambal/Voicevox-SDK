import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react'
import { getSpeakers } from '..'
import { Speaker } from '../models/Speakers'
import { AudioQuery } from '../models/AudioQuery'
import { getAudioQuery } from '..'
import { useTanstackQueryWrapper, waitForLoadingToFinish } from './uril/react'
import { getWavBlob, useGetWavBlob } from '../'

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
    const wrapper = useTanstackQueryWrapper()
    const renderHookResult = renderHook(() => useGetWavBlob({
      speaker,
      audioQuery: audioQuery
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