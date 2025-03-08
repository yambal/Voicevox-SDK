import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react'
import { getSpeakers } from '../'
import { Speaker } from '../models/Speakers'
import { AudioQuery } from '../models/AudioQuery'
import { getAudioQuery, useGetAudioQuery } from '../'
import { useTanstackQueryWrapper, waitForLoadingToFinish } from './uril/react'

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
  });

  test('useGetAudioQuery', async () => {
    const wrapper = useTanstackQueryWrapper()

    const renderHookResult = renderHook(() => useGetAudioQuery({
      text,
      speaker
    }), { wrapper })

    await act(async () => {
      await waitForLoadingToFinish(renderHookResult)
    })

    const { result: {current: { error, data }} } = renderHookResult

    if(error){
      expect(error).toBeUndefined()
    }
    if (data) {
      expect(data).toHaveProperty('accent_phrases')
    } else {
      expect(data).toBeDefined()
    }
  });
});
