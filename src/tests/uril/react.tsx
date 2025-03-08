import { renderHook, RenderHookResult, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import { QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query'; // Import these correctly


export const useTanstackQueryWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

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

export const waitForLoadingToFinish = async (renderHookResult: RenderHookResult<UseQueryResult, unknown>) => {
  const { result: { current: { refetch, isLoading } } } = renderHookResult
  await waitIsNotLoading(renderHookResult)
  await refetch()
  await waitIsNotLoading(renderHookResult)
};