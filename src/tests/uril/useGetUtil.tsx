import { RenderHookResult } from "@testing-library/react";

export type UseGetReturnBase = {
  isGetting: Boolean,
  error?: any,
}

const waitIsNotLoading = async (renderHookResult: RenderHookResult<UseGetReturnBase, unknown>) => {
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      const { result: { current: { isGetting } } } = renderHookResult;
      if (isGetting === false) {
        clearInterval(interval);
        resolve();
      }
    }, 500);
  });
}

export const waitisNotGetting = async (renderHookResult: RenderHookResult<UseGetReturnBase, unknown>) => {
  await waitIsNotLoading(renderHookResult)
}

