import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react'
import { getSpeakers, useGetSpeakers, Speaker } from '..'
import { waitisNotGetting } from './uril/useGetUtil'

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

    const renderHookResult = renderHook(() => useGetSpeakers())
    await waitisNotGetting(renderHookResult)
    await act(async () => {
      const {result: { current: { get }}} = renderHookResult
      get()
      await waitisNotGetting(renderHookResult)
    })
    const { result: {current: { error,  speakers}} } = renderHookResult

    if(error){
      expect(error).toBeUndefined()
    }
    if (speakers) {
      expect(Array.isArray(speakers)).toBe(true)
      console.log(`speakers: ${speakers.length}`)
      expect(speakers.length).toBeGreaterThan(0)
    } else {
      expect(speakers).toBeDefined()
    }
  })
})
