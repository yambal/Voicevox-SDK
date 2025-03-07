import { renderHook, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import these correctly
import { getSpeakers, useGetSpeakers } from '../hooks/useGetSpeakers';
import { Speaker } from '../models/Speakers';

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
    const {result} = renderHook(() => useGetSpeakers(), { wrapper })
    const { current: { refetch } } = result

    await act(async () => {
      await refetch();
      console.log("refetched")
    })

    await waitFor(() => {
      const { current: { isLoading } } = result
      expect(isLoading).toBe(false)
    })

    const { current: { error, data } } = result
    if(error){
      expect(error).toBeUndefined()
    }
    if (data) {
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThan(0)
    } else {
      expect(data).toBeDefined()
    }

  });
});
