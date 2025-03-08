import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react'
import { getSpeakers, useGetSpeakers } from '../'
import { Speaker } from '../models/Speakers'
import { useTanstackQueryWrapper, waitForLoadingToFinish } from './uril/react'

describe('getSpeakers (Real API)', () => {
  //Increase timeout for test
  console.log("getSpeakers")

  jest.setTimeout(10000); // 10 seconds timeout

  test('getSpeakers', async () => {
    // Act
    const result: Speaker[] = await getSpeakers()

    console.log(`speakers: ${result.length}`)

    expect(Array.isArray(result)).toBe(true)
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('speaker_uuid')
      expect(result[0]).toHaveProperty('styles')
      expect(result[0]).toHaveProperty('version')
      expect(result[0]).toHaveProperty('supported_features')
    }
  });

  test('useGetSpeakers', async () => {
    const wrapper = useTanstackQueryWrapper()

    // Act
    const renderHookResult = renderHook(() => useGetSpeakers(), { wrapper })
    await act(async () => {
      await waitForLoadingToFinish(renderHookResult)
    })


    
    const { result: {current: { error, data }} } = renderHookResult

    if(error){
      expect(error).toBeUndefined()
    }
    if (data) {
      expect(Array.isArray(data)).toBe(true)
      console.log(`speakers: ${data.length}`)
      expect(data.length).toBeGreaterThan(0)
    } else {
      expect(data).toBeDefined()
    }
  })
})
