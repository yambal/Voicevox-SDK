import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_k15o0g } from './speakers';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:50021' : baseURL).replace(/\/$/, '');
  const PATH0 = '/speakers';
  const GET = 'GET';

  return {
    speakers: {
      get: (option: { query: Methods_k15o0g['get']['query'], config?: T | undefined }) =>
        fetch<Methods_k15o0g['get']['resBody']>(prefix, PATH0, GET, option).json(),
      $get: (option: { query: Methods_k15o0g['get']['query'], config?: T | undefined }) =>
        fetch<Methods_k15o0g['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_k15o0g['get']['query'] } | undefined) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
