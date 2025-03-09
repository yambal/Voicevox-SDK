import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react'
import {
  getAudioQuery,
  useGetAudioQuery,
  AudioQuery,
  Speaker,
  getSpeakers
} from '../'
import { waitisNotGetting } from './uril/useGetUtil'

describe('getAudioQuery (Real API)', () => {
  jest.setTimeout(10000); // 10 seconds timeout
  const text = "本日は晴天なり"
  let speaker = 0

  beforeAll(async () => {
    const result: Speaker[] = await getSpeakers()
    speaker = result[0].styles[0].id
  })

  test('getAudioQuery', async () => {
    const audioAuery: AudioQuery = await getAudioQuery({
      text,
      speaker
    })

    expect(audioAuery).toHaveProperty('accent_phrases')
    expect(audioAuery).toHaveProperty('speedScale')
    expect(audioAuery).toHaveProperty('pitchScale')
    expect(audioAuery).toHaveProperty('intonationScale')
    expect(audioAuery).toHaveProperty('volumeScale')
    expect(audioAuery).toHaveProperty('prePhonemeLength')
    expect(audioAuery).toHaveProperty('postPhonemeLength')
    expect(audioAuery).toHaveProperty('pauseLength')
    expect(audioAuery).toHaveProperty('pauseLengthScale')
    expect(audioAuery).toHaveProperty('outputSamplingRate')
    expect(audioAuery).toHaveProperty('outputStereo')
    expect(audioAuery).toHaveProperty('kana')
  })

  test('useGetAudioQuery', async () => {
    const renderHookResult = renderHook(() => useGetAudioQuery())
    await waitisNotGetting(renderHookResult)
    await act(async () => {
      const {result: { current: { get }}} = renderHookResult
      get({
        text,
        speaker
      })
      await waitisNotGetting(renderHookResult)
    })
    const { result: {current: { error, audioQuery }} } = renderHookResult

    if(error){
      expect(error).toBeUndefined()
    }
    if (audioQuery) {
      expect(audioQuery).toHaveProperty('accent_phrases')
    } else {
      expect(audioQuery).toBeDefined()
    }
  })
})
