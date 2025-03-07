import { renderHook, RenderHookResult, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import { QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query'; // Import these correctly
import { getSpeakers, useGetSpeakers } from '../hooks/useGetSpeakers';
import { Speaker } from '../models/Speakers';


const waitIsNotLoading = async (renderHookResult: RenderHookResult<UseQueryResult, unknown>) => {
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      const { result: { current: { isLoading } } } = renderHookResult;
      if (isLoading === false) {
        clearInterval(interval);
        resolve();
      }
    }, 500);
  });
}

const waitForLoadingToFinish = async (renderHookResult: RenderHookResult<UseQueryResult, unknown>) => {
  const { result: { current: { refetch, isLoading } } } = renderHookResult
  await waitIsNotLoading(renderHookResult)
  await refetch()
  await waitIsNotLoading(renderHookResult)
};

describe('getSpeakers (Real API)', () => {
  //Increase timeout for test
  console.log("getSpeakers")

  jest.setTimeout(10000); // 10 seconds timeout

  // Create a QueryClient and wrapper for useQuery
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  test('getSpeakers', async () => {
    // Act
    const result: Speaker[] = await getSpeakers();

    console.log(`speakers: ${result.length}`)

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('speaker_uuid');
      expect(result[0]).toHaveProperty('styles');
      expect(result[0]).toHaveProperty('version');
      expect(result[0]).toHaveProperty('supported_features');
    }
  });

  test('useGetSpeakers', async () => {
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

  });
});
